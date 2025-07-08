<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->foreignId('user_id')->primary()->constrained()->onDelete('cascade');
            $table->string('theme', 20)->default('light');
            $table->string('language', 10)->default('en');
            $table->boolean('notifications_enabled')->default(true);
            $table->string('timezone', 50)->default('UTC');
            $table->integer('articles_per_page')->default(10);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
