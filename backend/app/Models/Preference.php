<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preference extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'category',
        'source',
        'author',
    ];

    /**
     * Get the user that owns the preference.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
