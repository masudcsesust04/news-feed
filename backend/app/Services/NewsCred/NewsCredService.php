<?php

namespace App\Services\NewsCred;

use App\Contracts\NewsSourceInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * @comment Strategy Pattern: This class is a concrete strategy for fetching news from NewsCred.
 * It implements the NewsSourceInterface.
 */
class NewsCredService implements NewsSourceInterface
{
    protected $apiKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.newscred.key');
        $this->baseUrl = config('services.newscred.base_url');
    }

    /**
     * Fetches articles from NewsCred API.
     * @param array $criteria Optional criteria for fetching articles.
     * @return array An array of standardized article data.
     */
    public function fetchArticles(array $criteria = []): array
    {
        if (empty($this->apiKey)) {
            Log::error('NewsCred API key is not configured.');
            return [];
        }

        try {
            // Placeholder for actual NewsCred API endpoint and parameters
            $response = Http::withToken($this->apiKey)
                            ->get($this->baseUrl . 'articles', [
                                'q' => $criteria['q'] ?? 'trending',
                                'limit' => $criteria['pageSize'] ?? 100,
                            ]);

            $response->throw();

            $articles = $response->json('articles'); // Assuming 'articles' key holds articles

            return array_map([$this, 'adaptArticle'], $articles);
        } catch (\Exception $e) {
            Log::error('Error fetching articles from NewsCred: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * @comment Adapter Pattern: Adapts a NewsCred article structure to a standardized format.
     * @param array $article The raw article data from NewsCred.
     * @return array The standardized article data.
     */
    protected function adaptArticle(array $article): array
    {
        // Placeholder for actual NewsCred article field mapping
        return [
            'title' => $article['title'] ?? null,
            'content' => $article['body'] ?? null,
            'url' => $article['link'] ?? null,
            'image_url' => $article['image_url'] ?? null,
            'published_at' => $article['published_date'] ?? null,
            'source' => $article['source']['name'] ?? null,
            'author' => $article['author']['display_name'] ?? null,
            'category' => $article['topics'][0]['name'] ?? null, // Assuming first topic is category
        ];
    }
}