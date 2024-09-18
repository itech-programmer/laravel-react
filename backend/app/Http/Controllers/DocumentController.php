<?php

namespace App\Http\Controllers;

use App\Contracts\DocumentServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    protected DocumentServiceInterface $documentService;

    public function __construct(DocumentServiceInterface $documentService)
    {
        $this->documentService = $documentService;
    }

    public function index(): JsonResponse
    {
        $documents = $this->documentService->getAllDocuments();
        return response()->json($documents);
    }

    public function show($id): JsonResponse
    {
        $document = $this->documentService->getDocumentById($id);
        return response()->json([
            'documentName' => $document->document_name,
            'fields' => $document->configurations,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'document_name' => 'required|string',
            'form_values' => 'required|array',
        ]);

        $document = $this->documentService->createDocument($validatedData);
        return response()->json($document, 201);
    }
}
