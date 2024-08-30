<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('login');;

Route::get('/dashboard', function () {
    if (\Illuminate\Support\Facades\Auth::user()->hasRole("Super-Admin")) {
        return to_route('admin.dashboard');
    } elseif (\Illuminate\Support\Facades\Auth::user()->hasRole("Admin")) {
        return Inertia::render('Admin/Admin', ["departments" => \App\Models\Departments::all()]);
    } elseif (\Illuminate\Support\Facades\Auth::user()->hasRole("User")) {
        return Inertia::render('Admin/UserPage', ["departments" => \App\Models\Departments::all()]);
    } else {
        return Inertia::render('Admin/GuestPage');
    }
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('role_or_permission:Super-Admin|Admin')->group(function () {
        Route::get('/admin/dashboard', [\App\Http\Controllers\AdminController::class, 'index'])->name('admin.dashboard');
        Route::get('/admin/departments', [\App\Http\Controllers\DepartmentsController::class, 'index'])->name('admin.departments.get');
        Route::post('/admin/departments/create', [\App\Http\Controllers\DepartmentsController::class, 'create'])->name('admin.create.department');
        Route::post('/admin/departments/update', [\App\Http\Controllers\DepartmentsController::class, 'update'])->name('admin.update.department');
        Route::post('/admin/departments/delete', [\App\Http\Controllers\DepartmentsController::class, 'destroy'])->name('admin.delete.department');

        Route::get('/admin/positions', [\App\Http\Controllers\PositionsController::class, 'index'])->name('admin.positions');
        Route::post('/admin/positions/create', [\App\Http\Controllers\PositionsController::class, 'create'])->name('admin.create.positions');
        Route::post('/admin/positions/edit', [\App\Http\Controllers\PositionsController::class, 'update'])->name('admin.edit.positions');
        Route::post('/admin/positions/delete', [\App\Http\Controllers\PositionsController::class, 'destroy'])->name('admin.delete.positions');
        Route::post('/admin/PositionsEmployee/delete', [\App\Http\Controllers\PositionsController::class, 'positionsEmployee'])->name('admin.PositionsEmployee.delete');

        Route::get('/admin/employees/search', [\App\Http\Controllers\EmployeesController::class, 'search'])->name('admin.employees.search');
        Route::get('/admin/employees', [\App\Http\Controllers\EmployeesController::class, 'index'])->name('admin.employees');
        Route::post('/admin/create/employees', [\App\Http\Controllers\EmployeesController::class, 'create'])->name('admin.employees.create');
        Route::post('/admin/update/employees', [\App\Http\Controllers\EmployeesController::class, 'update'])->name('admin.employees.update');
        Route::post('/admin/delete/employees', [\App\Http\Controllers\EmployeesController::class, 'delete'])->name('admin.employees.delete');
        Route::get('/admin/all/employees', [\App\Http\Controllers\EmployeesController::class, 'all'])->name('admin.employees.all');
    });

    Route::middleware('role_or_permission:Super-Admin|Admin|User')->group(function () {
        Route::get('/admin/chart', [\App\Http\Controllers\AdminController::class, 'chart'])->name('admin.chart');
    });

    Route::middleware('role_or_permission:Super-Admin')->group(function () {

        Route::get('/admin/users', [\App\Http\Controllers\AdminController::class, 'users'])->name('admin.users');
        Route::get('/admin/roles', [\App\Http\Controllers\AdminController::class, 'roles'])->name('admin.roles');
        Route::post('/admin/add/role', [\App\Http\Controllers\AdminController::class, 'addRole'])->name('admin.add.role');
        Route::post('/admin/remove/user', [\App\Http\Controllers\AdminController::class, 'removeUser'])->name('admin.remove.user');


        Route::get('/admin/token', [\App\Http\Controllers\AdminController::class, 'generateUniqueToken'])->name('admin.generate.token');
        Route::get('/admin/api', [\App\Http\Controllers\ApiController::class, 'index'])->name('admin.api');
        Route::post('/admin/api/create', [\App\Http\Controllers\ApiController::class, 'create'])->name('admin.api.create');
        Route::post('/admin/api/update', [\App\Http\Controllers\ApiController::class, 'update'])->name('admin.api.update');
        Route::post('/admin/api/delete', [\App\Http\Controllers\ApiController::class, 'destroy'])->name('admin.api.delete');

        Route::post('/admin/chart/edit', [\App\Http\Controllers\AdminController::class, 'editChart'])->name('admin.chart.edit');
    });


});

require __DIR__ . '/auth.php';
