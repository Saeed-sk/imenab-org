<?php

namespace App\Http\Controllers;

use App\Models\Employees;
use App\Models\Positions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Employees::query()->where('departments_id', $request['id'])->with('position')->paginate(10);
        $positions = Positions::query()->where('departments_id', $request['id'])->get();
        return response()->json([
            "success" => 'success',
            "massage" => "عملیات با موفقیت انجام شد",
            "data" => $data,
            "positions" => $positions
        ], 200);
    }

    public function create(Request $request)
    {

        $validated = $request->validate([
            'employee_id' => 'numeric|required|unique:employees,employee_id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'nullable|string|email|max:255',
            'phone_number' => 'required|string|max:255',
            'departments_id' => 'required',
            'national_id' => 'required|string|max:255',
            'gender' => 'required|string|max:255',
            'date_of_brith' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'hire_date' => 'required|string|max:255',
            'marital_status' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'children_count' => 'nullable',
            'positions_id' => 'nullable|unique:employees,positions_id',
            'password' => 'required|string',
        ]);


        $file = $request->file('image');
        $filename = null;

        if ($file) {

            $filename = time() . '.' . $file->getClientOriginalExtension();

            $path = $file->storeAs('public/images', $filename);

            $publicPath = public_path('images');
            if (!file_exists($publicPath)) {
                mkdir($publicPath, 0777, true);
            };
            $file->move($publicPath, $filename);

            // Optionally, use Intervention Image to resize or manipulate the image before saving
            // $image = Image::make($file)->resize(300, 300)->save($publicPath . '/' . $filename);
        }
        function convertPersianToEnglishNumerals($persianDate)
        {
            $persianNums = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            $englishNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

            return str_replace($persianNums, $englishNums, $persianDate);
        }

        Employees::query()->create(
            [
                'employee_id' => $validated['employee_id'],
                'password' => $validated['password'],
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'national_id' => $validated['national_id'],
                'gender' => $validated['gender'],
                'phone_number' => $validated['phone_number'],
                'email' => $validated['email'] ?? null,
                'date_of_brith' => convertPersianToEnglishNumerals($validated['date_of_brith']),
                'address' => $validated['address'],
                'hire_date' => convertPersianToEnglishNumerals($validated['hire_date']),
                'marital_status' => $validated['marital_status'],
                'status' => $validated['status'],
                'positions_id' => $validated['positions_id'],
                'children_count' => $validated['children_count'],
                'departments_id' => $validated['departments_id'],
                'image' => $filename ? 'images/' . $filename : null,
            ]
        );

        // Return a response
        return redirect()->back();
    }


    public function update(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'numeric|required',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'nullable|string|email|max:255',
            'phone_number' => 'required|string|max:255',
            'departments_id' => 'required',
            'national_id' => 'required|string|max:255',
            'gender' => 'required|string|max:255',
            'date_of_brith' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'hire_date' => 'required|string|max:255',
            'marital_status' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'children_count' => 'nullable|integer',
            'positions_id' => 'nullable|integer|unique:employees,positions_id',
            'password' => 'required|string',
        ]);

        $employee = Employees::query()->findOrFail($request->employee_id);

        if ($request->hasFile('image')) {
            $file = $request->file('image');

            $filename = time() . '.' . $file->getClientOriginalExtension();

            $publicPath = public_path('images');
            if (!file_exists($publicPath)) {
                mkdir($publicPath, 0777, true);
            }
            $file->move($publicPath, $filename);

            $publicImagePath = $publicPath . '/' . $filename;

            if ($employee->image) {
                $oldImagePath = public_path($employee->image);
                if (File::exists($oldImagePath)) {
                    File::delete($oldImagePath);
                }
            }
            $employee->image = 'images/' . $filename;
        }

        function convertPersianToEnglishNumerals($persianDate)
        {
            $persianNums = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            $englishNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

            return str_replace($persianNums, $englishNums, $persianDate);
        }

        if ($employee['departments_id'] != $validated['departments_id']) {
            $employee['positions_id'] = null;
        } else {
            $employee->positions_id = $validated['positions_id'];
        }
        $employee->first_name = $validated['first_name'];
        $employee->last_name = $validated['last_name'];
        $employee->password = $validated['password'];
        $employee->email = $validated['email'] ?? null;
        $employee->phone_number = $validated['phone_number'];
        $employee->departments_id = $validated['departments_id'];
        $employee->national_id = $validated['national_id'];
        $employee->gender = $validated['gender'];
        $employee->date_of_brith = convertPersianToEnglishNumerals($validated['date_of_brith']);
        $employee->address = $validated['address'];
        $employee->hire_date = convertPersianToEnglishNumerals($validated['hire_date']);
        $employee->marital_status = $validated['marital_status'];
        $employee->status = $validated['status'];
        $employee->children_count = $validated['children_count'];

        $employee->save();

        return redirect()->back()->with('success', 'اطلاعات کاربر با موفقیت ویرایش شد');
    }

    function delete(Request $request)
    {
        $employees = Employees::query()->where('employee_id', $request['employee_id'])->first();
        if ($employees->image) {
            $oldImagePath = public_path($employees->image);
            if (File::exists($oldImagePath)) {
                File::delete($oldImagePath);
            }
        }
        $employees->delete();

        return redirect()->back()->with('success', 'کارمند با موفقیت حذف شد');
    }

    public function all(Request $request)
    {

        $employees = Employees::query()->select('employee_id', 'first_name', 'last_name')->get();;

        return response()->json($employees);
    }

    public function search(Request $request)
    {

        $query = $request->input('query');

        $results = Employees::query()->where('employee_id', 'like', "%$query%")
            ->orWhere('first_name', 'like', "%$query%")
            ->orWhere('last_name', 'like', "%$query%")->with('position')->with('department')
            ->get();

        return response()->json([
            'results' => $results,
            'query' => $query,
        ]);
    }

}


