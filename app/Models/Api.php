<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Api extends Model
{
    protected $fillable = ['user_name', 'token', 'status', 'access', 'permission'];
    protected $guarded = ['id'];

    protected $casts = [
        'access' => 'array',
    ];
}
