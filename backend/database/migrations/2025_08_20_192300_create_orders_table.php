<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('canteen_id')->constrained()->onDelete('cascade');
            $table->string('order_number')->unique();
            $table->json('items'); // menu items with quantities
            $table->decimal('total_amount', 10, 2);
            $table->enum('status', ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']);
            $table->enum('payment_status', ['pending', 'paid', 'failed']);
            $table->string('payment_method')->nullable();
            $table->datetime('pickup_time');
            $table->datetime('ready_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};