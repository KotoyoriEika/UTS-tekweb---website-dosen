<?php
//mengatur bentuk JSON data dosen
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LecturerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->lecturer_id,
            'nim' => $this->nim,
            'nidn' => $this->nidn,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'photo_url' => $this->photo ? url('storage/' . $this->photo) : null,
            'prodi' => [
                'id' => $this->prodi_id,
                'name' => $this->prodi?->name,
            ],
            'education_level' => [
                'id' => $this->education_level_id,
                'name' => $this->educationLevel?->name,
            ],
            'created_at' => $this->created_at,
        ];
    }
}