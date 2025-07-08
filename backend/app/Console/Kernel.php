<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Console\Commands\FetchNewsCommand;
use Illuminate\Support\Facades\Log;

class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule): void
    {
        Log::info('Laravel scheduler is running.');

        // Schedule the news fetching commands
        $schedule->command(FetchNewsCommand::class, ['newsapi'])
                 ->everyMinute()
                 ->withoutOverlapping()
                 ->runInBackground()
                 ->onSuccess(function () {
                     Log::info('NewsAPI fetch completed successfully');
                 })
                 ->onFailure(function () {
                     Log::error('NewsAPI fetch failed');
                 });

        $schedule->command(FetchNewsCommand::class, ['opennws'])
                 ->everyMinute()
                 ->withoutOverlapping()
                 ->runInBackground()
                 ->onSuccess(function () {
                     Log::info('OpenNWS fetch completed successfully');
                 })
                 ->onFailure(function () {
                     Log::error('OpenNWS fetch failed');
                 });

        $schedule->command(FetchNewsCommand::class, ['newscred'])
                 ->everyMinute()
                 ->withoutOverlapping()
                 ->runInBackground()
                 ->onSuccess(function () {
                     Log::info('NewsCred fetch completed successfully');
                 })
                 ->onFailure(function () {
                     Log::error('NewsCred fetch failed');
                 });
    }

    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');
        require base_path('routes/console.php');
    }
}