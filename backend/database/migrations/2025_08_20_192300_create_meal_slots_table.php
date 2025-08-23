<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('meal_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('canteen_id')->constrained()->onDelete('cascade');
            $table->enum('meal_type', ['breakfast', 'lunch', 'dinner']);
            $table->time('start_time');
            $table->time('end_time');
            $table->integer('max_capacity');
            $table->integer('current_bookings')->default(0);
            $table->date('slot_date');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('meal_slots');
    }
};