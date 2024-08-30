<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Api;
use App\Models\Departments;
use App\Models\Employees;
use App\Models\Positions;
use Illuminate\Http\Request;
use function Laravel\Prompts\error;

class ApiRequest extends Controller
{
    public function getPositions()
    {
        return Positions::all();
    }

    public function getEmployees()
    {
        return Employees::all();
    }

    public function getDepartments()
    {
        return Departments::all();
    }

    public function getUserAccess(Request $request)
    {
        $user = Api::query()->where('user_name', $request->user_name)->where('token', $request->apiToken)->first();
        if ($user) {
            if ($user['status'] === 'Active') {
                return $user;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function getData(Request $request)
    {
        $data = [];
        $user = $this->getUserAccess($request);
        if (!$user) {
            return response()->json([
                "error" => "access denied"
            ], '404');
        } else {
            foreach ($user['access'] as $key => $value) {
                if ($value['value'] === "Departments") {
                    $deps = $this->getDepartments();
                    $data = ['departments' => $deps];
                } elseif ($value['value'] === "Employees") {
                    $emp = $this->getEmployees();
                    $data = [...$data, 'employees' => $emp];
                } else if ($value['value'] === "Positions") {
                    $pos = $this->getPositions();
                    $data = [...$data, 'positions' => $pos];
                }
            }
            return response()->json($data, '200');
        }
    }

    public function updateData(Request $request)
    {
        $validate = $request->validate([
            'apiToken' => 'string|required',
            'user_name' => 'string|required',
            'changeItem' => 'string|required'
        ]);
        $user = $this->getUserAccess($request);
        $found = false;
        if (!$user) {
            return response()->json([
                "error" => "access denied"
            ], '403');
        } else {
            foreach ($user['access'] as $item) {
                if (isset($item['value']) && $item['value'] === $request['changeItem']) {
                    $found = true;
                    break;
                }
            }
            if ($found) {
                if ($request['changeItem'] === 'Departments') {
                    $data = Departments::query()->where('department_id', $request['data']['department_id'])->update([
                        'name' => $request['data']['name'],
                        "department_head" => $request['data']['department_head'] ? $request['data']['department_head'] : null
                    ]);
                    return response()->json([
                        'success' => 'update success',
                        'data' => $data
                    ]);
                } elseif ($request['changeItem'] === 'Positions') {
                    $data = Positions::query()->find($request['data']['id'])->update([
                        "title" => $request['data']['title'],
                        "job_title" => $request['data']['job_title'],
                        "description" => $request['data']['description'],
                        "parent_id" => $request['data']['title'] ? $request['data']['parent_id'] : null
                    ]);
                    return response()->json([
                        'success' => 'update success',
                        'data' => $data
                    ], 200);
                } elseif ($request['changeItem'] === 'Employees') {
                    $data = Employees::query()->where("employee_id", $request['data']['employee_id'])->update([
                        'first_name' => $request['data']['first_name'],
                        'last_name' => $request['data']['last_name'],
                        'national_id' => $request['data']['national_id'],
                        'gender' => $request['data']['gender'],
                        'phone_number' => $request['data']['phone_number'],
                        'password' => $request['data']['password'],
                        'email' => $request['data']['email'],
                        'date_of_brith' => $request['data']['date_of_brith'],
                        'address' => $request['data']['address'],
                        'hire_date' => $request['data']['hire_date'],
                        'marital_status' => $request['data']['marital_status'],
                        'status' => $request['data']['status'],
                        'positions_id' => $request['data']['positions_id'],
                        'children_count' => $request['data']['children_count']
                    ]);
                    return response()->json([
                        'success' => 'update success',
                        'data' => $data
                    ], 200);
                }
            } else {
                return response()->json([
                    'error' => 'access denied'
                ], 403);
            }
        }
    }
}
