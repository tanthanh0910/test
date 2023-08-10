<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    const ROLE_SUPER_ADMIN = 99;
    const ROLE_ADMIN = 1;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function hasPermission($actionName): bool
    {
        $permissions = config("roles.permissions")[$this->role_id];
        if (is_null($permissions)) {
            return true;
        }

        $permissions = array_merge(config("roles.none_authorize_actions"), $permissions);
        if (in_array($actionName, $permissions)) {
            return true;
        }

        // If action name is a.b, we should check if user has permission a.*
        $actionArray = explode('.', $actionName);
        $key = $actionArray[0];
        $actionAllItem = count($actionArray) > 1 ? $key . ".*" : null;
        return in_array($actionAllItem, $permissions);
    }
}
