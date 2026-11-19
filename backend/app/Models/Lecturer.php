<?php
//model dosen, berelasi ke prodi dan level pendidikan
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lecturer extends Model
{
    protected $primaryKey = 'lecturer_id';

    protected $fillable = [
        'nim',
        'nidn',
        'name',
        'email',
        'phone',
        'address',
        'prodi_id',
        'education_level_id',
        'photo',
    ];

    public function prodi()
    {
        return $this->belongsTo(Prodi::class, 'prodi_id');
    }

    public function educationLevel()
    {
        return $this->belongsTo(EducationLevel::class, 'education_level_id');
    }
}