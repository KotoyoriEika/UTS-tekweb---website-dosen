<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProdiSeeder extends Seeder
{
    public function run(): void
    {
        $names = ['Teknik Informatika', 'Sistem Informasi', 'Manajemen', 'Akuntansi', 'Pendidikan Bahasa Inggris'];

        foreach ($names as $name) {
            DB::table('prodis')->insert([
                'name' => $name,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}