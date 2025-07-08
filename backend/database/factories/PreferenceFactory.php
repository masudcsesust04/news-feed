<?php

namespace Database\Factories;

use App\Models\Preference;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PreferenceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Preference::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category' => $this->faker->word(),
            'source' => $this->faker->company(),
            'author' => $this->faker->name(),
        ];
    }
}
