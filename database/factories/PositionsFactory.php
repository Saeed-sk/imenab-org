<?php

namespace Database\Factories;

use App\Models\Departments;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Positions>
 */
class PositionsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        $ids = Departments::query()->pluck('department_id')->toArray();
        $faker = \Faker\Factory::create('fa_IR');
        return [
            'title'=>$faker->jobTitle(),
            'job_title'=>$faker->word,
            'description'=>$faker->text,
            'min_salary'=>$this->faker->numberBetween(1,600000),
            'max_salary'=>$this->faker->numberBetween(1,600000),
            'departments_id'=>$this->faker->randomElement($ids),
            'parent_id'=>null,
        ];
    }
}
