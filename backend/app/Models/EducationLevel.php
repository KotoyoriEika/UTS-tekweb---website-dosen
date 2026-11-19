<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EducationLevel extends Model
{
    protected $primaryKey = 'education_level_id';

    protected $fillable = ['name'];

    public function lecturers()
    {
        return $this->hasMany(Lecturer::class, 'education_level_id');
    }
}