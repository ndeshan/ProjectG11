<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'canteen_id', 'order_number', 'items', 'total_amount',
        'status', 'payment_status', 'payment_method', 'pickup_time', 'ready_at'
    ];

    protected $casts = [
        'items' => 'array',
        'total_amount' => 'decimal:2',
        'pickup_time' => 'datetime',
        'ready_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function canteen(): BelongsTo
    {
        return $this->belongsTo(Canteen::class);
    }
}