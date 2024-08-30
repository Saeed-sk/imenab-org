<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('positions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('job_title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('min_salary')->nullable();
            $table->decimal('max_salary')->nullable();
            $table->nestedSet();
            $table->unsignedBigInteger('departments_id')->nullable();
            $table->foreign('departments_id')->references('department_id')->on('departments')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('positions');
    }
};
