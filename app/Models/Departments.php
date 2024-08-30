<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Kalnoy\Nestedset\NodeTrait;

class Departments extends Model
{
    use HasFactory;
    protected $primaryKey = 'department_id';
    protected $fillable =['department_id','department_head','name'];

    public function children():HasMany
    {
        return $this->hasMany(Positions::class,'departments_id','department_id');
    }
}
