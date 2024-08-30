<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Morilog\Jalali\Jalalian;

class Employees extends Model
{
    use HasFactory;

    protected $primaryKey = 'employee_id';
    protected $fillable = ['employee_id','first_name', 'password', 'last_name', 'national_id', 'gender', 'phone_number', 'image', 'email', 'date_of_brith', 'address', 'hire_date', 'marital_status', 'status', 'children_count', 'departments_id', 'position_id'];

    public function position(): BelongsTo
    {
        return $this->belongsTo(Positions::class, 'positions_id', 'id');
    }
    public function department(): BelongsTo
    {
        return $this->belongsTo(Departments::class, 'departments_id', 'department_id');
    }

//    public function setDateOfBirthAttribute($value)
//    {
//        $this->attributes['date_of_birth'] = Jalalian::fromFormat('Y/m/d', $value)->toCarbon();
//    }
//
//    public function getDateOfBirthAttribute($value)
//    {
//        return Jalalian::fromCarbon(new \Carbon\Carbon($value))->format('Y/m/d');
//    }
//
//    public function setHireDateAttribute($value)
//    {
//        $this->attributes['hire_date'] = Jalalian::fromFormat('Y/m/d', $value)->toCarbon();
//    }
//
//    public function getHireDateAttribute($value)
//    {
//        return Jalalian::fromCarbon(new \Carbon\Carbon($value))->format('Y/m/d');
//    }
}
