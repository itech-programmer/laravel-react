<?php

namespace App\Services;

use App\Contracts\DocumentServiceInterface;
use App\Models\Document;
use App\Models\DocumentConfiguration;

class DocumentService implements DocumentServiceInterface
{
    public function getAllDocuments()
    {
        return Document::withCount('configurations')->get();
    }

    public function getDocumentById($id)
    {
        return Document::with('configurations')->findOrFail($id);
    }

    public function createDocument(array $data)
    {
        $document = Document::create([
            'document_name' => $data['document_name'],
        ]);

        foreach ($data['form_values'] as $field) {
            DocumentConfiguration::create([
                'field_seq' => $field['field_seq'],
                'is_mandatory' => $field['is_mandatory'],
                'field_type' => $field['field_type'],
                'field_name' => $field['field_name'],
                'document_id' => $document->id,
                'select_values' => $field['select_values'] ?? null,
            ]);
        }

        return $document;
    }
}
