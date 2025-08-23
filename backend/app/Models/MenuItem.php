<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MenuItem extends Model
{
    protected $fillable = [
        'canteen_id', 'name', 'name_tamil', 'description', 'price', 
        'category', 'image_url', 'is_available', 'preparation_time', 'rating'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'rating' => 'decimal:2',
        'is_available' => 'boolean',
    ];

    public function canteen(): BelongsTo
    {
        return $this->belongsTo(Canteen::class);
    }
}