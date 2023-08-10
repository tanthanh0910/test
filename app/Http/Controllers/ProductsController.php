<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\CreateRequest;
use App\Http\Requests\Product\UpdateRequest;
use App\Models\Product;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductsController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::query()->orderBy('id', 'DESC')->with(['store'])
            ->filterIndexDataProduct($request)
            ->paginate(10);
        return view('admin.product.index', compact('products'));
    }

    public function create()
    {
        $stores = Store::query()->get();
        return view('admin.product.create', compact('stores'));
    }

    public function store(CreateRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();
            do {
                $code = randomNumber(6);
            } while (Product::where("product_code", $code)->select('id')->first());

            $data['product_code'] = $code;
            $store = new Product();
            $store->fill($data)->save();
            DB::commit();
        } catch (\Exception $e) {
            return back()
                ->withInput($request->input())
                ->with('danger', $e->getMessage());
        }

        return redirect()->route('products.index')->with('success', 'Create successfully');
    }

    public function edit($id)
    {
        $product = Product::query()->where('id', $id)->first();
        if (empty($product)) {
            return back()->with('danger', 'Data not found');

        }
        $stores = Store::query()->get();

        return view('admin.product.edit', compact('product', 'stores'));
    }

    public function show($id)
    {
        $product = Product::query()->where('id', $id)->first();
        if (empty($product)) {
            return back()->with('danger', 'Data not found');

        }
        $stores = Store::query()->get();

        return view('admin.product.show', compact('product', 'stores'));
    }

    public function update($id, UpdateRequest $request)
    {
        DB::beginTransaction();

        try {
            $data = $request->all();
            $product = Product::query()->where('id', $id)->first();
            if (empty($product)) {
                return back()->with('danger', 'Data not found');
            }
            $product->fill($data)->save();
            DB::commit();
        }catch (\Exception $e){
            return back()
                ->withInput($request->input())
                ->with('danger', $e->getMessage());
        }

        return redirect()->route('products.index')->with('success', 'Update successfully');
    }

    public function destroy($id)
    {
        Product::query()->where('id', $id)->delete();
        return redirect()->route('products.index')->with('success', 'Delete successfully');

    }

}
