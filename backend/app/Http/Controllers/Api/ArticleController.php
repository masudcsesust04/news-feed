<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Support\Facades\Log;

class ArticleController extends Controller
{
    public function index(Request $request)
    {

        Log::info('GET Params:', $request->query());

        $query = Article::query();

        if ($request->has('source')) {
            $query->where('source', $request->input('source'));
        }

        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->has('author')) {
            $query->where('author', $request->input('author'));
        }

        if ($request->has('published_at')) {
            $query->whereDate('published_at', $request->input('published_at'));
        }

        // Add search article by title
        if ($request->has('title')) {
            $query->where('title', 'LIKE', '%' . $request->input('title') . '%');
        }

        // TODO: Update the user's articles page to reflect their preference settings as expected.

        $articles = $query->paginate(15);

        return ArticleResource::collection($articles);
    }

    public function show(Article $article)
    {
        return new ArticleResource($article);
    }
}
