<?php

namespace App\Contracts;

interface DocumentServiceInterface
{
    public function getAllDocuments();
    public function getDocumentById($id);
    public function createDocument(array $data);
}
