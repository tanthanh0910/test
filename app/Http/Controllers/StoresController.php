<?php

namespace App\Http\Controllers;

use App\Http\Requests\Store\CreateRequest;
use App\Http\Requests\Store\UpdateRequest;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StoresController extends Controller
{
    public function index(Request $request)
    {
        $stores = Store::query()->orderBy('id', 'DESC')
            ->filterIndexData($request)
            ->paginate(10);
        return view('admin.stores.index', compact('stores'));
    }

    public function create()
    {
        $users = User::query()->where('role_id', 2)->get();
        return view('admin.stores.create', compact('users'));
    }

    public function store(CreateRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();
            do {
                $code = randomNumber(6);
            } while (Store::where("store_code", $code)->select('id')->first());

            $data['store_code'] = $code;
            $store = new Store();
            $store->fill($data)->save();
            DB::commit();
        } catch (\Exception $e) {
            return back()
                ->withInput($request->input())
                ->with('danger', $e->getMessage());
        }

        return redirect()->route('stores.index')->with('success', 'Create successfully');
    }

    public function edit($id)
    {
        $user = Store::query()->where('id', $id)->first();
        if (empty($user)) {
            return back()->with('danger', 'Data not found');

        }
        $users = User::query()->where('role_id', 2)->get();

        return view('admin.stores.edit', compact('user', 'users'));
    }

    public function show($id)
    {
        $user = Store::query()->where('id', $id)->first();
        if (empty($user)) {
            return back()->with('danger', 'Data not found');

        }
        $users = User::query()->where('role_id', 2)->get();

        return view('admin.stores.show', compact('user', 'users'));
    }

    public function update($id, UpdateRequest $request)
    {
        DB::beginTransaction();

        try {
            $data = $request->all();
            $user = Store::query()->where('id', $id)->first();
            if (empty($user)) {
                return back()->with('danger', 'Data not found');

            }
            $user->fill($data)->save();
            DB::commit();
        }catch (\Exception $e){
            return back()
                ->withInput($request->input())
                ->with('danger', $e->getMessage());
        }

        return redirect()->route('stores.index')->with('success', 'Update successfully');
    }

    public function destroy($id)
    {
        Store::query()->where('id', $id)->delete();
        return redirect()->route('stores.index')->with('success', 'Delete successfully');

    }

}
