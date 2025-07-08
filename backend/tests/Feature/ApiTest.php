<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Article;

class ApiTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $user;
    protected $token;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a user for authentication tests
        $this->user = User::factory()->create([
            'password' => bcrypt('password'),
        ]);

        // Log in the user and get a Sanctum token
        $response = $this->postJson('/api/login', [
            'email' => $this->user->email,
            'password' => 'password',
        ]);

        $this->token = $response->json('token');
    }

    /** @test */
    public function a_user_can_register()
    {
        $response = $this->postJson('/api/signup', [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'message',
                     'user' => ['id', 'name', 'email'],
                     'token',
                 ]);
    }

    /** @test */
    public function a_user_can_login()
    {
        $response = $this->postJson('/api/login', [
            'email' => $this->user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'message',
                     'user' => ['id', 'name', 'email'],
                     'token',
                 ]);
    }

    /** @test */
    public function an_authenticated_user_can_logout()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/logout');

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Logged out successfully']);
    }

    /** @test */
    public function an_authenticated_user_can_get_their_profile()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->getJson('/api/users/profile');

        $response->assertStatus(200)
                 ->assertJson(['data' => ['email' => $this->user->email]]);
    }

    /** @test */
    public function an_authenticated_user_can_update_their_profile()
    {
        $newName = $this->faker->name;
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->patchJson('/api/users/profile', [
            'name' => $newName,
        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Profile updated successfully']);

        $this->assertDatabaseHas('users', [
            'id' => $this->user->id,
            'name' => $newName,
        ]);
    }

    /** @test */
    public function an_authenticated_user_can_update_their_settings()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->patchJson('/api/users/settings', [
            'theme' => 'dark',
            'language' => 'es',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Settings updated successfully']);

        $this->assertDatabaseHas('settings', [
            'user_id' => $this->user->id,
            'theme' => 'dark',
            'language' => 'es',
        ]);
    }

    /** @test */
    public function a_user_can_get_a_list_of_articles()
    {
        Article::factory()->count(5)->create();

        $response = $this->getJson('/api/articles');

        $response->assertStatus(200)
                 ->assertJsonCount(5, 'data')
                 ->assertJsonStructure([
                     'data' => [
                         '*' => ['id', 'title', 'content', 'url', 'source', 'category', 'author', 'published_at']
                     ]
                 ]);
    }

    /** @test */
    public function a_user_can_filter_articles_by_source()
    {
        Article::factory()->create(['source' => 'TestSource1']);
        Article::factory()->create(['source' => 'TestSource2']);

        $response = $this->getJson('/api/articles?source=TestSource1');

        $response->assertStatus(200)
                 ->assertJsonCount(1, 'data')
                 ->assertJsonFragment(['source' => 'TestSource1']);
    }

    /** @test */
    public function a_user_can_filter_articles_by_category()
    {
        Article::factory()->create(['category' => 'TestCategory1']);
        Article::factory()->create(['category' => 'TestCategory2']);

        $response = $this->getJson('/api/articles?category=TestCategory1');

        $response->assertStatus(200)
                 ->assertJsonCount(1, 'data')
                 ->assertJsonFragment(['category' => 'TestCategory1']);
    }

    /** @test */
    public function a_user_can_filter_articles_by_author()
    {
        Article::factory()->create(['author' => 'TestAuthor1']);
        Article::factory()->create(['author' => 'TestAuthor2']);

        $response = $this->getJson('/api/articles?author=TestAuthor1');

        $response->assertStatus(200)
                 ->assertJsonCount(1, 'data')
                 ->assertJsonFragment(['author' => 'TestAuthor1']);
    }

    /** @test */
    public function a_user_can_get_a_single_article_by_id()
    {
        $article = Article::factory()->create();

        $response = $this->getJson('/api/articles/' . $article->id);

        $response->assertStatus(200)
                 ->assertJson(['data' => ['id' => $article->id]]);
    }

    /** @test */
    public function a_404_is_returned_for_a_non_existent_article()
    {
        $response = $this->getJson('/api/articles/99999'); // Assuming 99999 does not exist

        $response->assertStatus(404);
    }
}
