<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login()
    {
        return view('auth.login');
    }

    public function postLogin(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            return redirect(route('stores.index'));
        }
        return redirect(route('auth.login'))->with('danger', 'Login information is incorrect');
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('auth.login');
    }

}
