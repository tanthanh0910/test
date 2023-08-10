<?php

namespace App\Http\Controllers;

use App\Enums\SessionKey;
use App\Enums\User\RoleOrg;
use App\Enums\User\RoleSystem;
use App\Http\Controllers\Controller;
use App\Models\Organization;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class HomeController extends Controller
{
    public function index()
    {
        return redirect(route('stores.index'));
    }
}
