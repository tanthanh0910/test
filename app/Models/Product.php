<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'name',
        'product_code',
        'store_id',
        'price',
        'remark',
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];


    public function scopeFilterIndexDataProduct($query, $request)
    {
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'LIKE','%'.$request->search.'%');
            });
        }
        return $query;
    }

    public function store(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Store::class, 'store_id', 'id');
    }

}
