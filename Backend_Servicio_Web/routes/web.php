<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Ruta principal
Route::get('/', function () {
    return view('index');
})->name('home');

// Rutas de autenticación
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
// Ruta para admin con middleware de autenticación
Route::get('/admin', function () {
    return view('admin');
})->name('admin')->middleware('auth');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

// Rutas para vistas específicas con nombres
Route::get('/carrito', function () {
    return view('Carrito');
})->name('carrito');

Route::get('/carta', function () {
    return view('Carta');
})->name('carta');

Route::get('/confirmacion', function () {
    return view('Confirmacion');
})->name('confirmacion');

Route::get('/conocenos', function () {
    return view('Conocenos2');
})->name('conocenos');

Route::get('/desplegable', function () {
    return view('Desplegable');
})->name('desplegable');

Route::get('/pago', function () {
    return view('Pago');
})->name('pago');

Route::get('/welcome', function () {
    return view('welcome');
})->name('welcome');

// Rutas para archivos JS
Route::get('/js/{filename}', function ($filename) {
    return response()->file(public_path("menu_restaurante/js/{$filename}"));
})->where('filename', '.*\.js$');

// Rutas para archivos CSS
Route::get('/css/{filename}', function ($filename) {
    return response()->file(public_path("menu_restaurante/CSS/{$filename}"));
})->where('filename', '.*\.css$');

// Ruta para el archivo principal de estilos
Route::get('/styles', function () {
    return response()->file(public_path("menu_restaurante/styles.css"));
})->name('styles');
