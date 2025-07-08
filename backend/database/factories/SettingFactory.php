<?php

namespace Database\Factories;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SettingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Setting::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'theme' => $this->faker->randomElement(['light', 'dark']),
            'language' => $this->faker->randomElement(['en', 'bn', 'fr']),
            'notifications_enabled' => $this->faker->boolean(),
            'timezone' => $this->faker->timezone(),
            'articles_per_page' => $this->faker->numberBetween(5, 20),
        ];
    }
}
