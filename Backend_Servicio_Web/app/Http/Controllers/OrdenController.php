<?php

namespace App\Http\Controllers;

use App\Models\Orden;
use App\Models\Product;
use Illuminate\Http\Request;

class OrdenController extends Controller
{
    public function guardarOrden(Request $request)
    {
        try {
            $validated = $request->validate([
                'nombre' => 'required|string|max:255',
                'telefono' => 'required|string|max:20',
                'email' => 'required|email|max:255',
                'direccion' => 'required|string|max:255',
                'productos' => 'required|array',
                'productos.*.id' => 'required|exists:products,id',
                'productos.*.cantidad' => 'required|integer|min:1',
                'productos.*.precio_unitario' => 'required|numeric|min:0',
                'total' => $total, 
            ]);

            $orden = Orden::create($validated);

            foreach ($validated['productos'] as $producto) {
                $orden->productos()->attach($producto['id'], [
                    'cantidad' => $producto['cantidad'],
                    'precio_unitario' => $producto['precio_unitario'],
                ]);
            }

            return response()->json(['message' => 'Orden guardada correctamente.'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
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
