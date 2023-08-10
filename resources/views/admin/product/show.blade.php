@extends('admin.layouts.app')
@section('title','Show')
@section('content')

    <!-- Start main content -->
    <div class="content user-admin-add-new">
        <a class="btn-back-previous btn btn-default" href="{{route("products.index")}}">
            <img src="{{asset('/backend/icons/icon-back-page.svg')}}"
                 alt=""/><span>Back to previous</span>
        </a>
        <div class="card mt-4 p-5 flex-1">
            <div class="text-center function-title">
                <p class="text-title">Show Product</p>
            </div>

            <div class="d-flex justify-content-center">
                <!-- Form add new admin -->
                <div class="mt-4 row gutter-40 justify-content-between">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="label-bold" for="factory-name">Name
                                *</label>
                            <input name="name" type="text" class="form-control big" id="name"
                                   value="{{old('name',$product->name)}}"
                                   placeholder="Name" readonly/>
                            @include("admin.partial.error-field-v2", with(['column' => 'name']))
                        </div>
                    </div>
                </div>

                <div class="mt-4 row gutter-40 justify-content-between">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="label-bold" for="store_id">Store</label>
                            <select class="form-control" style="width: max-width" id="store_id"
                                    name="store_id" disabled>
                                <option value="" hidden selected>All select</option>
                                @if(!empty($stores))
                                    @foreach($stores as $item)
                                        <option
                                            value="{{$item->id}}" {{old('store_id') == $item->id || $product->store_id == $item->id? 'selected' : '' }}>{{$item->name}}</option>
                                    @endforeach
                                @endif
                            </select>
                            @include("admin.partial.error-field-v2", with(['column' => 'store_id']))
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="label-bold" for="price">Price</label>
                            <input name="price" type="number" class="form-control big"
                                   value="{{old('price',$product->price)}}"
                                   id="email" placeholder="Price" readonly/>
                            @include("admin.partial.error-field-v2", with(['column' => 'price']))
                        </div>
                    </div>
                </div>

                <div class="mt-5 row gutter-40 justify-content-between">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="label-bold" for="tel">Remark</label>
                            <input name="remark" type="text" class="form-control big" id="tel"
                                   value="{{old('remark',$product->remark)}}"
                                   placeholder="Address" readonly/>
                            @include("admin.partial.error-field-v2", with(['column' => 'remark']))
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
