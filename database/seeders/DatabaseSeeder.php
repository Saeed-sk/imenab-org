<?php

namespace Database\Seeders;
use App\Models\Departments;
use App\Models\Employees;
use App\Models\Positions;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::factory(10)->create();

        app()[PermissionRegistrar::class]->forgetCachedPermissions();
        $permission = Permission::create(['name' => 'edit users']);
        $role1 = Role::create(['name' => 'Super-Admin']);
        Role::create(['name' => 'Admin']);
        Role::create(['name' => 'User']);
        $role1->givePermissionTo($permission);
        $permission->assignRole($role1);

        User::factory(20)->create();
        $user = User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@example.com',
        ]);

        $user->assignRole('Super-Admin');

        Departments::factory()->count(3)->create();
        Positions::factory(50)->create();
        Employees::factory(100)->create();
    }
}
