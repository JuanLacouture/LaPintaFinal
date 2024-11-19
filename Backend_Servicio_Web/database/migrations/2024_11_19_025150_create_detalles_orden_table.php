<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetallesOrdenTable extends Migration
{
    public function up()
    {
        Schema::create('detalles_orden', function (Blueprint $table) {
            $table->id(); // Clave primaria
            $table->foreignId('orden_id')->constrained('ordenes')->onDelete('cascade'); // Relación con ordenes
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // Relación con products
            $table->integer('cantidad'); // Cantidad de productos
            $table->decimal('precio_unitario', 10, 2); // Precio unitario del producto
            $table->timestamps(); // Timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('detalles_orden');
    }
}
