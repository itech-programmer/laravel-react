<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DocumentConfiguration extends Model
{
    use HasFactory;

    protected $fillable = [
        'field_seq', 'is_mandatory', 'field_type', 'field_name', 'document_id', 'select_values'
    ];

    protected $casts = [
        'select_values' => 'array',
    ];

    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }
}
