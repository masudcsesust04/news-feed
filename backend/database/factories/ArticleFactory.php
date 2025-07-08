<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Article::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'content' => $this->faker->paragraphs(3, true),
            'url' => $this->faker->unique()->url(),
            'source' => $this->faker->company(),
            'category' => $this->faker->word(),
            'author' => $this->faker->name(),
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
