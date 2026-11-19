<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LecturerSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 15; $i++) {
            $no = str_pad($i, 4, '0', STR_PAD_LEFT);

            DB::table('lecturers')->insert([
                'nim' => '2201' . $no,
                'nidn' => '0412' . str_pad($i, 6, '0', STR_PAD_LEFT),
                'name' => "Dosen Contoh $i",
                'email' => "dosen$i@example.com",
                'phone' => '0812345678' . str_pad($i, 2, '0', STR_PAD_LEFT),
                'address' => "Jl. Pendidikan No. $i, Singaraja",
                'prodi_id' => ($i % 5) + 1,
                'education_level_id' => ($i % 3) + 1,
                'photo' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}