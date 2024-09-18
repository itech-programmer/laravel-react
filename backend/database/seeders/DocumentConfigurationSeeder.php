<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DocumentConfigurationSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        DB::table('document_configurations')->insert([
            [
                'field_seq' => 1,
                'is_mandatory' => 1,
                'field_type' => 1,
                'field_name' => 'Field 1',
                'document_id' => 1,
                'select_values' => null,
            ],
            [
                'field_seq' => 2,
                'is_mandatory' => 0,
                'field_type' => 2,
                'field_name' => 'Field 2',
                'document_id' => 1,
                'select_values' => json_encode([
                    ['value' => true, 'label' => 'Agree'],
                    ['value' => false, 'label' => 'Disagree'],
                ]),
            ],
            [
                'field_seq' => 3,
                'is_mandatory' => 1,
                'field_type' => 3,
                'field_name' => 'Field 3',
                'document_id' => 2,
                'select_values' => null,
            ],
        ]);
    }
}
