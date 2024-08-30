<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use App\Models\Employees;
use App\Models\Positions;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PositionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $positions = Positions::query()->where('departments_id', $request['id'])->with('parent')->with('employee')->get();
        return response()->json(
            $positions
            , 200);
    }

    public function update(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            "id" => "required|numeric",
            "title" => "required|string",
            "description" => "nullable|string",
            "min_salary" => "numeric|nullable",
            "max_salary" => "numeric|nullable",
            "parent_id" => "numeric|nullable",
            "department_id" => "numeric|nullable",
            "job_title" => "required|string"
        ]);

        $position = Positions::query()->findOrFail($validate['id']);
        $position->title = $validate['title'];
        $position->description = $validate['description'];
        $position->min_salary = $validate['min_salary'];
        $position->max_salary = $validate['max_salary'];
        $position->job_title = $validate['job_title'];
        if ($validate['parent_id']) {
            $parent = Positions::query()->find($validate['parent_id']);
            $position->appendToNode($parent)->save();
        } else {
            $position->save();
        }
        return redirect()->back()->with('massage', 'عملیات با موفقیت انجام شد');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): RedirectResponse
    {

        $validate = $request->validate([
            "title" => "required|string",
            "description" => "nullable|string",
            "min_salary" => "numeric|nullable",
            "max_salary" => "numeric|nullable",
            "parent_id" => "numeric|nullable",
            "department_id" => "numeric|nullable",
            "job_title" => "required|string",
            "forall" => "required|boolean"
        ]);

        if ($validate['forall']) {
            $ids = Departments::all()->pluck('department_id');
            foreach ($ids as $id) {
                Positions::query()->create([
                    "title" => $validate['title'],
                    "description" => $validate['description'],
                    "min_salary" => $validate['min_salary'],
                    "max_salary" => $validate['max_salary'],
                    "job_title" => $validate['job_title'],
                    "parent_id" => null,
                    "departments_id" => $id,
                ]);
            }
        } else {
            $position = new Positions;
            $position->title = $validate['title'];
            $position->description = $validate['description'];
            $position->min_salary = $validate['min_salary'];
            $position->max_salary = $validate['max_salary'];
            $position->job_title = $validate['job_title'];
            $position->parent_id = $validate['parent_id'] ?? null;
            $position->departments_id = $validate['department_id'];

            if ($validate['parent_id']) {
                $parent = Positions::query()->find($validate['parent_id']);
                $position->appendToNode($parent)->save();
            } else {
                $position->saveAsRoot();
            }
        }
        return redirect()->back()->with('massage', 'عملیات با موفقیت انجام شد');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $validate = $request->validate([
            "id" => "required|numeric",
        ]);

        Positions::query()->findOrFail($validate['id'])->delete();

        return redirect()->back()->with('massage', 'عملیات با موفقیت انجام شد');
    }

    public function positionsEmployee(Request $request)
    {

        $employee = Employees::query()->where('employee_id', $request['id'])->first();
        $employee->positions_id = null;
        $employee->save();
        return redirect()->back()->with('massage', 'عملیات با موفقیت انجام شد');
    }
}
