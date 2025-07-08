<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Contracts\NewsSourceInterface;
use App\Models\Article;
use Illuminate\Support\Facades\Log;

class FetchNewsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:news {source}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetches news articles from a specified source.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $sourceName = $this->argument('source');
        Log::info(sprintf('Starting fetch:news command for source: %s.', $sourceName));

        $sourceService = $this->resolveSourceService($sourceName);

        if (!$sourceService) {
            $this->error(sprintf('Unknown news source: %s', $sourceName));
            Log::error(sprintf('Unknown news source: %s', $sourceName));
            return;
        }

        try {
            $articlesData = $sourceService->fetchArticles();

            foreach ($articlesData as $articleData) {
                if (empty($articleData['title']) || empty($articleData['url'])) {
                    Log::warning('Skipping article due to missing title or URL.', $articleData);
                    continue;
                }

                Article::updateOrCreate(
                    ['url' => $articleData['url']],
                    [
                        'title' => $articleData['title'],
                        'content' => $articleData['content'] ?? null,
                        'source' => $articleData['source'] ?? null,
                        'author' => $articleData['author'] ?? null,
                        'category' => $articleData['category'] ?? null,
                        'published_at' => $articleData['published_at'] ?? null,
                    ]
                );
            }
            Log::info(sprintf('Successfully fetched and saved %d articles from %s.', count($articlesData), $sourceName));

        } catch (\Exception $e) {
            Log::error(sprintf('Error processing news source %s: %s', $sourceName, $e->getMessage()));
            $this->error(sprintf('Error processing news source %s: %s', $sourceName, $e->getMessage()));
        }

        Log::info(sprintf('Finished fetch:news command for source: %s.', $sourceName));
    }

    /**
     * Resolve the NewsSourceInterface implementation based on source name.
     *
     * @param string $sourceName
     * @return NewsSourceInterface|null
     */
    protected function resolveSourceService(string $sourceName): ?NewsSourceInterface
    {
        // @comment Factory Pattern: Resolving the correct NewsSourceInterface implementation
        switch ($sourceName) {
            case 'newsapi':
                return new \App\Services\NewsApi\NewsApiService();
            case 'opennws':
                return new \App\Services\OpenNews\OpenNewsService();
            case 'newscred':
                return new \App\Services\NewsCred\NewsCredService();
            default:
                return null;
        }
    }
}