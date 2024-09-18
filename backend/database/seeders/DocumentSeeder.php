<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DocumentSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        DB::table('documents')->insert([
            [
                'document_name' => 'Sample Document 1',
                'created_at' => now(),
            ],
            [
                'document_name' => 'Sample Document 2',
                'created_at' => now(),
            ],
            [
                'document_name' => 'Sample Document 3',
                'created_at' => now(),
            ],
        ]);
    }
}
