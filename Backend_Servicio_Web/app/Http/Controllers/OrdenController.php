<?php

namespace App\Http\Controllers;

use App\Models\Orden;
use App\Models\Product;
use Illuminate\Http\Request;

class OrdenController extends Controller
{
    public function guardarOrden(Request $request)
    {
        $orden = Orden::create($request->only(['nombre', 'telefono', 'email', 'direccion']));

        foreach ($request->productos as $producto) {
            $orden->productos()->attach($producto['id'], [
                'cantidad' => $producto['cantidad'],
                'precio_unitario' => $producto['precio_unitario'],
            ]);
        }

        return redirect()->route('confirmacion');
    }

    public function admin()
    {
        $ordenes = Orden::with('productos')->get();
        return view('admin', compact('ordenes'));
    }

    public function cambiarEstado(Request $request, $id)
{
    $orden = Orden::findOrFail($id);
    $orden->estado = $request->input('estado');
    $orden->save();

    return response()->json(['success' => true]);
}

public function eliminarOrden($id)
{
    $orden = Orden::findOrFail($id);
    $orden->delete();

    return response()->json(['success' => true]);
}
}
