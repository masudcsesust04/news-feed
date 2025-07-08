<?php

namespace App\Contracts;

interface NewsSourceInterface
{
    /**
     * Fetches articles from a specific news source.
     * @param array $criteria Optional criteria for fetching articles (e.g., keywords, categories).
     * @return array An array of standardized article data.
     */
    public function fetchArticles(array $criteria = []): array;
}