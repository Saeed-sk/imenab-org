<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Kalnoy\Nestedset\NodeTrait;

class Positions extends Model
{
    use NodeTrait;
    use HasFactory;

    protected $table = 'positions';
    protected $fillable = ['title', 'job_title', 'description', 'min_salary', 'max_salary', 'departments_id', 'parent_id'];

    public function departments(): BelongsTo
    {
        return $this->belongsTo(Departments::class, 'departments_id', 'department_id');
    }

    public function employee(): HasOne
    {
        return $this->hasOne(Employees::class, 'positions_id', 'id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Positions::class, 'parent_id', 'id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Positions::class, 'parent_id', '');
    }

    public static function withRecursive($relation)
    {
        return (new static)->withRecursiveRelation($relation);
    }

    public function withRecursiveRelation($relation, $depth = 10)
    {
        $with = [];
        $this->buildRecursiveWith($relation, $with, $depth);
        return $this->newQuery()->with($with);
    }

    protected function buildRecursiveWith($relation, &$with, $depth)
    {
        if ($depth > 0) {
            $with[] = $relation;
            $this->buildRecursiveWith("$relation.children", $with, $depth - 1);
        }
    }
}
