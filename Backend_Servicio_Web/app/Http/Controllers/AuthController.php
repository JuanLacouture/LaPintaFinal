<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use App\Models\User;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('username', $request->username)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            Session::put('isLoggedIn', true);
            Session::put('role', $user->role);

            if ($user->role === 'admin') {
                return redirect()->route('admin');
            }

            return redirect()->route('home');
        }

        return back()->withErrors(['message' => 'Usuario o contraseña incorrectos.']);
    }

    public function logout()
    {
        Session::flush();
        return redirect()->route('login');
    }
}

