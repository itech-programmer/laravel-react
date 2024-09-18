<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('document_configurations', function (Blueprint $table) {
            $table->id();
            $table->integer('field_seq')->nullable(false);
            $table->boolean('is_mandatory')->nullable(false);
            $table->integer('field_type')->nullable(false);
            $table->string('field_name')->nullable(false);
            $table->integer('document_id')->nullable(false);
            $table->string('select_values')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_configurations');
    }
};
