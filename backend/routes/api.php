<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DocumentController;

Route::get('documents', [DocumentController::class, 'index'])->name('documents.index');
Route::get('document/{id}', [DocumentController::class, 'show'])->name('document.show');
Route::post('document/store', [DocumentController::class, 'store'])->name('document.store');
