<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $table = 'stores';

    protected $fillable = [
        'name',
        'address',
        'phone',
        'store_code',
        'user_id',
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function scopeFilterIndexData($query, $request)
    {
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'LIKE','%'.$request->search.'%');
            });
        }
        return $query;
    }

}
