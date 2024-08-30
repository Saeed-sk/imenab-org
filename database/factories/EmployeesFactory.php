<?php

namespace Database\Factories;

use App\Models\Departments;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employees>
 */
class EmployeesFactory extends Factory
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
            'employee_id' => fake()->unique()->numberBetween(),
            'first_name' => $faker->firstName,
            'last_name' => $faker->lastName,
            'image' => $this->faker->imageUrl,
            'national_id' => $faker->uuid,
            'gender' => 'male',
            'password'=>fake()->password,
            'phone_number' => fake()->phoneNumber,
            'email' => fake()->email,
            'date_of_brith' => fake()->date,
            'address' => $faker->address,
            'hire_date' => $faker->date,
            'marital_status' => 'Single',
            'status' => 'active',
            'children_count' => fake()->numberBetween(0, 15),
            'positions_id' => null,
            'departments_id'=>$this->faker->randomElement($ids),
        ];
    }
}
