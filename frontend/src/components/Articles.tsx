import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

interface Article {
  id: number;
  title: string;
  content: string;
  source: string;
  author: string;
  url: string;
  published_at: string; // Added published_at field
  category: string;    // Added category field
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [paginationLinks, setPaginationLinks] = useState<PaginationLink[]>([]);

  // Filter states
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSource, setFilterSource] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [filterTitle, setFilterTitle] = useState('');
  const [filterPublishedAt, setFilterPublishedAt] = useState('');

  // Dropdown options states
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableSources, setAvailableSources] = useState<string[]>([]);

  const fetchArticles = async (page: number, filters?: { category?: string, source?: string, author?: string, title?: string, published_at?: string }) => {
    setLoading(true);
    setError(null);
    try {
      let url = `/articles?page=${page}`;
      if (filters?.category) url += `&category=${filters.category}`;
      if (filters?.source) url += `&source=${filters.source}`;
      if (filters?.author) url += `&author=${filters.author}`;
      if (filters?.title) url += `&title=${filters.title}`;
      if (filters?.published_at) url += `&published_at=${filters.published_at}`;

      const response = await axiosInstance.get(url);
      setArticles(response.data.data);
      setCurrentPage(response.data.meta.current_page);
      setLastPage(response.data.meta.last_page);
      setPaginationLinks(response.data.meta.links);

      // Extract unique categories and sources for dropdowns from all articles (not just current page)
      const allArticles = response.data.data; // Assuming this is the full list for the current page
      const uniqueCategories = new Set<string>();
      const uniqueSources = new Set<string>();
      allArticles.forEach((article: Article) => {
        uniqueCategories.add(article.category);
        uniqueSources.add(article.source);
      });
      setAvailableCategories(Array.from(uniqueCategories));
      setAvailableSources(Array.from(uniqueSources));

    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch articles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(1, { category: filterCategory, source: filterSource, author: filterAuthor, title: filterTitle, published_at: filterPublishedAt });
  }, [filterCategory, filterSource]);

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    fetchArticles(1, { category: filterCategory, source: filterSource, author: filterAuthor, title: filterTitle, published_at: filterPublishedAt });
  };

  const handleResetFilters = () => {
    setFilterCategory('');
    setFilterSource('');
    setFilterAuthor('');
    setFilterTitle('');
    setFilterPublishedAt('');
    // useEffect will trigger fetchArticles(1) with empty filters
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading articles...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;
  }

  if (articles.length === 0 && !loading) {
    return <div className="flex items-center justify-center h-screen">No articles found.</div>;
  }

  return (
    <div className="w-full p-8 bg-gray-100 min-h-screen">
      <div className="mx-auto bg-white p-8 rounded-lg shadow-md mb-8">
        {/* Filter Form */}
        <form onSubmit={handleApplyFilters} className="mb-8 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <select
                id="filterCategory"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Category</option>
                {availableCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                id="filterSource"
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Source</option>
                {availableSources.map((source) => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                id="filterAuthor"
                value={filterAuthor}
                onChange={(e) => setFilterAuthor(e.target.value)}
                placeholder="Author"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              />
            </div>
            <div>
              <input
                type="text"
                id="filterTitle"
                value={filterTitle}
                onChange={(e) => setFilterTitle(e.target.value)}
                placeholder="Title"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              />
            </div>
            <div>
              <input
                type="date"
                id="filterPublishedAt"
                value={filterPublishedAt}
                onChange={(e) => setFilterPublishedAt(e.target.value)}
                placeholder="Published Date (YYYY-MM-DD)"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              />
            </div>
          </div>
          <div className="flex justify-start space-x-2">
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset Filters
            </button>
          </div>
        </form>
      </div>

      <div className="mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* Filters Section */}

        <h2 className="text-3xl font-bold mb-8 text-left">Articles</h2>
        <div className="space-y-6">
          {articles.map((article, index) => (
            <React.Fragment key={article.id}>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-2">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {article.title}
                  </a>
                </h3>
                <p className="text-gray-700 mb-2">{article.content}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Source: {article.source}</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Author: {article.author}</span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Category: {article.category}</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Published: {new Date(article.published_at).toLocaleDateString()}</span>
                </div>
              </div>
              {index < articles.length - 1 && <hr className="border-dotted border-gray-400 my-6" />}
            </React.Fragment>
          ))}
        </div>

        {/* Pagination Controls */}
        {paginationLinks.length > 0 && (
          <div className="flex justify-center mt-8 space-x-2">
            {paginationLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => {
                  if (link.url) {
                    const url = new URL(link.url);
                    const page = parseInt(url.searchParams.get('page') || '1');
                    fetchArticles(page, { category: filterCategory, source: filterSource, author: filterAuthor, title: filterTitle, published_at: filterPublishedAt });
                  }
                }}
                disabled={!link.url}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  link.active
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
