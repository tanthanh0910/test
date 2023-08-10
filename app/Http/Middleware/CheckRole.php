<?php

namespace App\Http\Middleware;

use App\Http\Responses\APIResponse;
use Closure;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $user = Auth::user();
        if (empty($user)) {
            return redirect()->route('login');
        }
        $actionName = \Route::getCurrentRoute()->getName();

        if ($user->hasPermission($actionName)) {
            return $next($request);
        }
        if($request->expectsJson())
            return APIResponse::error401('You do not have permission to access this feature');

        if ($user) {
            Auth::logout();
        }

        abort(401);
    }
}
