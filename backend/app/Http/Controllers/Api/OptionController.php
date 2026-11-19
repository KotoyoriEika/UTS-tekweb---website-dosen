<?php
//untuk data dropdown
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EducationLevel;
use App\Models\Prodi;

class OptionController extends Controller
{
    public function prodis()
    {
        return response()->json(Prodi::orderBy('name')->get());
    }

    public function educationLevels()
    {
        return response()->json(EducationLevel::orderBy('education_level_id')->get());
    }
}