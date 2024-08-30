<?php

namespace App\Http\Controllers;

use App\Models\Api;
use App\Models\Departments;
use App\Models\Positions;
use Illuminate\Http\Request;


class ApiController extends Controller
{
    public function index(Request $request)
    {
        $data = Api::query()->paginate(8);
        return response()->json([
            "success" => 'success',
            "massage" => "عملیات با موفقیت انجام شد",
            "data" => $data
        ], 200);
    }


    public function create(Request $request)
    {
        $validated = $request->validate([
            'user_name' => 'required|string|unique:apis',
            'token' => 'required|string|unique:apis',
            'status' => 'required|string|in:Active,Inactive',
            'access' => 'required|array',
            'permission' => 'required|string|in:Read,Write-Read',
        ]);


        Api::query()->create([
            'user_name' => $validated['user_name'],
            'token' => $validated['token'],
            'status' => $validated['status'],
            'access' => $validated['access'],
            'permission' => $validated['permission'],
        ]);
        return redirect()->back()->with('massage', 'عملیات با موفقیت انجام شد');
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|numeric',
            'status' => 'required|string|in:Active,Inactive',
            'access' => 'required|array',
            'permission' => 'required|string|in:Read,Write-Read',
        ]);


        Api::query()->findOrFail($validated['id'])->update([
            'status' => $validated['status'],
            'access' => $validated['access'],
            'permission' => $validated['permission'],
        ]);
        return redirect()->back()->with('massage', 'عملیات با موفقیت انجام شد');
    }

    public function destroy(Request $request)
    {
        Api::query()->findOrFail($request->id)->delete();
        return redirect()->back();
    }

    public function getPositions()
    {
        $data = Positions::all();
    }


}
