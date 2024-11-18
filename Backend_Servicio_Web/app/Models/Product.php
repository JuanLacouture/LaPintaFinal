<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    // Columnas que se pueden llenar
    protected $fillable = [
        'category',
        'name',
        'description',
        'price',
        'image',
    ];
}
