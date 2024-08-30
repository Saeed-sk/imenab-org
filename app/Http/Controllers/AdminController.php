<?php

namespace App\Http\Controllers;

use App\Models\Api;
use App\Models\Departments;
use App\Models\Employees;
use App\Models\Positions;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/SuperAdmin', ["departments" => Departments::all()]);
    }

    public function removeUser(Request $request)
    {
        $validate = $request->validate([
            'id' => "required|numeric"
        ]);

        User::query()->findOrFail($validate['id'])->delete();
        return redirect()->back()->with('massage', 'عملیات با موفقیت انجام شد');
    }

    public function roles(): JsonResponse
    {
        $data = Role::all();
        return response()->json([
            "success" => 'success',
            "massage" => "عملیات با موفقیت انجام شد",
            "data" => $data
        ], 200);
    }

    public function addRole(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            "id" => "required|numeric",
            "role_id" => "nullable|numeric"
        ]);


        if ($validate['role_id'] === -1) {
            User::query()->findOrFail($request['id'])->syncRoles([]);
        } else {
            $role = Role::query()->findOrFail($validate['role_id']);

            User::query()->findOrFail($request['id'])->syncRoles($role);
        }


        return redirect()->back()->with('massage', 'عملیات با موفقیت انجام شد');
    }

    public function users(Request $request): JsonResponse
    {
        $data = User::query()->with('roles')->paginate(8);
        return response()->json([
            "success" => 'success',
            "massage" => "عملیات با موفقیت انجام شد",
            "data" => $data
        ], 200);
    }

    public function generateUniqueToken(): string
    {
        $token = Str::random(40);
        $check = Api::query()->where('token', $token)->first();
        if ($check) {
            $this->generateUniqueToken();
        }
        return $token;
    }

    public function chart(): JsonResponse
    {
        $data = Departments::all();
        $positions = Positions::withRecursive('children')->whereNull('parent_id')->get();
        $employees = Employees::all();
        return response()->json([
            "success" => 'success',
            "massage" => "عملیات با موفقیت انجام شد",
            "departments" => $data,
            'employees' => $employees,
            'positions' => $positions
        ], 200);
    }

    public function editChart(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            "positions_id" => "required|numeric",
            "employees_id" => "required|numeric",
            "parent_id" => "required|numeric",
        ]);
        if ($validate['parent_id'] === 0) {

            Employees::query()->findOrFail($validate['employees_id'])->update([
                "positions_id" => $validate['positions_id'],
            ]);

            Positions::query()->findOrFail($validate['positions_id'])->update([
                'parent' => "Yes",
                'parent_id' => null
            ]);

        } else {
            Employees::query()->where('positions_id', $validate['positions_id'])->update([
                "positions_id" => null
            ]);

            Employees::query()->findOrFail($validate['employees_id'])->update([
                "positions_id" => $validate['position_id'],
            ]);

            Positions::query()->findOrFail($validate['position_id'])->update([
                'parent_id' => $validate['parent_id'],
            ]);
        }
        return redirect()->back()->with('massage', 'عملیات با موفقیت انجام شد');
    }
}
