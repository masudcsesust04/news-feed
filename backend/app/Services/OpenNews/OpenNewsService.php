<?php

namespace App\Services\OpenNews;

use App\Contracts\NewsSourceInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * @comment Strategy Pattern: This class is a concrete strategy for fetching news from OpenNews.
 * It implements the NewsSourceInterface.
 */
class OpenNewsService implements NewsSourceInterface
{
    protected $apiKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.opennws.key');
        $this->baseUrl = config('services.opennws.base_url');
    }

    /**
     * Fetches articles from OpenNews API.
     * @param array $criteria Optional criteria for fetching articles.
     * @return array An array of standardized article data.
     */
    public function fetchArticles(array $criteria = []): array
    {
        if (empty($this->apiKey)) {
            Log::error('OpenNews API key is not configured.');
            return [];
        }

        try {
            // Placeholder for actual OpenNews API endpoint and parameters
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
            ])->get($this->baseUrl . 'articles', [
                'query' => $criteria['q'] ?? 'general',
                'limit' => $criteria['pageSize'] ?? 100,
            ]);

            $response->throw();

            $articles = $response->json('data'); // Assuming 'data' key holds articles

            return array_map([$this, 'adaptArticle'], $articles);
        } catch (\Exception $e) {
            Log::error('Error fetching articles from OpenNews: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * @comment Adapter Pattern: Adapts an OpenNews article structure to a standardized format.
     * @param array $article The raw article data from OpenNews.
     * @return array The standardized article data.
     */
    protected function adaptArticle(array $article): array
    {
        // Placeholder for actual OpenNews article field mapping
        return [
            'title' => $article['headline'] ?? null,
            'content' => $article['summary'] ?? null,
            'url' => $article['url'] ?? null,
            'image_url' => $article['image']['url'] ?? null,
            'published_at' => $article['published_date'] ?? null,
            'source' => $article['source']['name'] ?? null,
            'author' => $article['author']['name'] ?? null,
            'category' => $article['category'] ?? null,
        ];
    }
}