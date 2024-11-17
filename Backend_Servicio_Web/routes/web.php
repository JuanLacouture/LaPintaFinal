<?php

use Illuminate\Support\Facades\Route;

// Ruta principal
Route::get('/', function () {
    return view('index');
})->name('home');

// Rutas para vistas específicas con nombres
Route::get('/admin', function () {
    return view('admin');
})->name('admin');

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

Route::get('/login', function () {
    return view('Login');
})->name('login');

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
