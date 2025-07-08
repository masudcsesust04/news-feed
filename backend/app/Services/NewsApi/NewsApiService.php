<?php

namespace App\Services\NewsApi;

use App\Contracts\NewsSourceInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * @comment Strategy Pattern: This class is a concrete strategy for fetching news from NewsAPI.
 * It implements the NewsSourceInterface.
 */
class NewsApiService implements NewsSourceInterface
{
    protected $apiKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.newsapi.key');
        $this->baseUrl = config('services.newsapi.base_url');
    }

    /**
     * Fetches articles from NewsAPI.
     * @param array $criteria Optional criteria for fetching articles.
     * @return array An array of standardized article data.
     */
    public function fetchArticles(array $criteria = []): array
    {
        if (empty($this->apiKey)) {
            Log::error('NewsAPI key is not configured.');
            return [];
        }

        try {
            $response = Http::get($this->baseUrl . 'everything', [
                'q' => $criteria['q'] ?? 'latest news',
                'from' => $criteria['date'] ?? '2025-06-07',
                'sortBy' => 'publishedAt',
                'apiKey' => $this->apiKey,
                'language' => $criteria['language'] ?? 'en',
                'pageSize' => $criteria['pageSize'] ?? 100,
            ]);

            $response->throw(); // Throw an exception if a client or server error occurred.

            $articles = $response->json('articles');

            return array_map([$this, 'adaptArticle'], $articles);
        } catch (\Exception $e) {
            Log::error('Error fetching articles from NewsAPI: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * @comment Adapter Pattern: Adapts a NewsAPI article structure to a standardized format.
     * @param array $article The raw article data from NewsAPI.
     * @return array The standardized article data.
     */
    protected function adaptArticle(array $article): array
    {
        return [
            'title' => $article['title'] ?? null,
            'content' => $article['description'] ?? null, // NewsAPI uses description for a summary
            'url' => $article['url'] ?? null,
            'image_url' => $article['urlToImage'] ?? null,
            'published_at' => $article['publishedAt'] ?? null,
            'source' => $article['source']['name'] ?? null,
            'author' => $article['author'] ?? null,
            'category' => null, // NewsAPI doesn't provide direct categories in 'everything' endpoint
        ];
    }
}