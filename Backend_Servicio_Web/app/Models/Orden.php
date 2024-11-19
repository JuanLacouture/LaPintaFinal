<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orden extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'telefono', 'email', 'direccion', 'estado'];

    public function productos()
    {
        return $this->belongsToMany(Product::class, 'detalles_orden')
            ->withPivot('cantidad', 'precio_unitario')
            ->withTimestamps();
    }
}
