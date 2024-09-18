<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Document extends Model
{
    use HasFactory;

    protected $fillable = ['document_name'];

    public function configurations(): HasMany
    {
        return $this->hasMany(DocumentConfiguration::class);
    }
}
