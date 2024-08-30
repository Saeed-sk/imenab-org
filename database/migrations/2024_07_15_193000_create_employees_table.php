<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->unsignedBigInteger('employee_id')->unique()->primary();
            $table->string('image')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('national_id');
            $table->enum('gender', ['Male', 'Female', 'Other']);
            $table->string('phone_number');
            $table->string('password');
            $table->string('email')->nullable()->default(null);
            $table->date('date_of_brith');
            $table->text('address');
            $table->date('hire_date');
            $table->enum('marital_status', ['Single', 'Married']);
            $table->enum('status', ['Active', 'Inactive']);
            $table->unsignedBigInteger('positions_id')->nullable();
            $table->foreign('positions_id')->on('positions')->references('id')->onDelete('set null');
            $table->unsignedBigInteger('departments_id')->nullable();
            $table->foreign('departments_id')->on('departments')->references('department_id')->onDelete('cascade');
            $table->integer('children_count');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
