<?php

namespace Database\Seeders;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure users exist before creating settings
        if (User::count() === 0) {
            User::factory()->count(10)->create();
        }

        // Create a setting for each existing user
        User::all()->each(function ($user) {
            // Check if a setting already exists for this user to maintain one-to-one
            if (!$user->settings) {
                Setting::factory()->create(['user_id' => $user->id]);
            }
        });
    }
}
