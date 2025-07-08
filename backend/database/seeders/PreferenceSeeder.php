<?php

namespace Database\Seeders;

use App\Models\Preference;
use App\Models\User;
use Illuminate\Database\Seeder;

class PreferenceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure users exist before creating preferences
        if (User::count() === 0) {
            User::factory()->count(10)->create();
        }

        // Create preferences for existing users
        User::all()->each(function ($user) {
            Preference::factory()->count(5)->create(['user_id' => $user->id]);
        });
    }
}
