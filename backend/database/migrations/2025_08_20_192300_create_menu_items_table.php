<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('canteen_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('name_tamil')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 8, 2);
            $table->string('category'); // breakfast, lunch, dinner, stationery
            $table->string('image_url')->nullable();
            $table->boolean('is_available')->default(true);
            $table->integer('preparation_time')->default(5); // minutes
            $table->decimal('rating', 3, 2)->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu_items');
    }
};