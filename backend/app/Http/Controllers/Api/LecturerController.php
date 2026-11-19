<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LecturerResource;
use App\Models\Lecturer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class LecturerController extends Controller
{
    private function rules($id = null): array
    {
        return [
            'nim' => ['required', 'string', 'max:20', Rule::unique('lecturers', 'nim')->ignore($id, 'lecturer_id')],
            'nidn' => ['required', 'string', 'max:20', Rule::unique('lecturers', 'nidn')->ignore($id, 'lecturer_id')],
            'name' => 'required|string|max:150',
            'email' => ['required', 'email', Rule::unique('lecturers', 'email')->ignore($id, 'lecturer_id')],
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string',
            'prodi_id' => 'required|exists:prodis,prodi_id',
            'education_level_id' => 'required|exists:education_levels,education_level_id',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ];
    }

    // GET /api/lecturers?page=1&limit=10&keyword=budi
    public function index(Request $request)
    {
        $query = Lecturer::with(['prodi', 'educationLevel'])->latest('lecturer_id');

        // Pencarian berdasarkan nama, NIM, atau NIDN
        if ($request->filled('keyword')) {
            $keyword = $request->keyword;
            $query->where(function ($q) use ($keyword) {
                $q->where('name', 'like', "%{$keyword}%")
                    ->orWhere('nim', 'like', "%{$keyword}%")
                    ->orWhere('nidn', 'like', "%{$keyword}%");
            });
        }

        return LecturerResource::collection($query->paginate((int) $request->input('limit', 10)));
    }

    public function store(Request $request)
    {
        $data = $request->validate($this->rules());

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('lecturers', 'public');
        }

        $lecturer = Lecturer::create($data);

        return new LecturerResource($lecturer->load(['prodi', 'educationLevel']));
    }

    public function show(string $id)
    {
        return new LecturerResource(Lecturer::with(['prodi', 'educationLevel'])->findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $lecturer = Lecturer::findOrFail($id);
        $data = $request->validate($this->rules($id));

        if ($request->hasFile('photo')) {
            if ($lecturer->photo) {
                Storage::disk('public')->delete($lecturer->photo);
            }
            $data['photo'] = $request->file('photo')->store('lecturers', 'public');
        }

        $lecturer->update($data);

        return new LecturerResource($lecturer->load(['prodi', 'educationLevel']));
    }

    public function destroy(string $id)
    {
        $lecturer = Lecturer::find($id);

        if ($lecturer == null) {
            return response()->json(['message' => 'Lecturer not found'], 404);
        }

        if ($lecturer->photo) {
            Storage::disk('public')->delete($lecturer->photo);
        }
        $lecturer->delete();

        return response()->json(['message' => 'Lecturer deleted successfully']);
    }
}