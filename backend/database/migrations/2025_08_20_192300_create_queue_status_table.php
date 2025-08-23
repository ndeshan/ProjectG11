<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('queue_status', function (Blueprint $table) {
            $table->id();
            $table->foreignId('canteen_id')->constrained()->onDelete('cascade');
            $table->integer('current_queue_length');
            $table->integer('estimated_wait_time'); // minutes
            $table->enum('peak_status', ['low', 'medium', 'high']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('queue_status');
    }
};