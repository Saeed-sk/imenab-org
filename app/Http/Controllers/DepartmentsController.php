<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentsController extends Controller
{

    public function index()
    {
        return Inertia::render('Admin/Dashboard', ["departments" => Departments::all()]);
    }

    /**
     * Update or create the specified resource in storage.
     */
    public function create(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            "department_id" => 'required|numeric|unique:departments',
            "name" => "required|string",
            "department_head" => "nullable|numeric",
        ]);

        Departments::query()->create([
            "name" => $validate['name'],
            "department_id" => $validate['department_id'],
            "department_head" => $validate['department_head'],
        ]);

        return redirect()->back()->with('massage', 'عملیات با موفقیت انجام شد');
    }

    public function update(Request $request)
    {
        $validate = $request->validate([
            "department_id" => 'required|numeric',
            "name" => "required|string",
            "department_head" => "nullable|numeric",
        ]);
        Departments::query()->where('department_id',$validate['department_id'])->first()->update([
            "name" => $validate['name'],
            "department_id" => $validate['department_id'],
            "department_head" => $validate['department_head'],
        ]);
        return redirect()->back()->with('massage', 'عملیات با موفقیت انجام شد');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $validate = $request->validate([
            "department_id" => "required|numeric",
        ]);

        Departments::query()->findOrFail($validate['department_id'])->delete();

        return redirect()->back()->with('massage', 'عملیات با موفقیت انجام شد');
    }

}
