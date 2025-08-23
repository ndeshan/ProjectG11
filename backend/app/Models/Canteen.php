<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Canteen extends Model
{
    protected $fillable = [
        'name', 'location', 'is_active', 'current_queue_count', 'estimated_wait_time'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function menuItems(): HasMany
    {
        return $this->hasMany(MenuItem::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function mealSlots(): HasMany
    {
        return $this->hasMany(MealSlot::class);
    }

    public function queueStatus(): HasMany
    {
        return $this->hasMany(QueueStatus::class);
    }
}