@extends('admin.layouts.app')
@section('title','Store')
@section('content')
    <!-- Start main content -->
    <div class="content user-admin">
        <div class="flex-1">
            <!-- Search input and button create new -->
            <div class="d-flex px-4 pt-4 pb-4 scrollbarX" style="overflow-x: auto">
                <form action="" method="GET" class="form-inline">
                    <div class="form-group has-feedback has-search mr-5">
                        <span class="glyphicon glyphicon-search form-control-feedback"></span>
                        <input name="search" value="{{request()->get('search')}}" type="text" class="form-control"
                               placeholder="search"
                               style="min-width: 150px"/>
                    </div>
                    <button style="height: 35px" type="submit" class="btn btn-warning select-field"><i
                            class="fa fa-search"></i></button>
                    <a style="height: 35px" type="button" class="btn btn-danger select-field"
                       href="{{route('products.index')}}"><i
                            class="fa fa-redo"></i></a>
                    <a href="{{route("products.create")}}" class="btn btn-add ml-auto float-right">
                        <img class="pr-3" style="color: #F78A29;" src="{{asset('backend/icons/icon-add.svg')}}" alt=""/>
                        Create
                    </a>
                </form>

            </div>

            <!-- Table admin user -->
            <div class="scrollbarX" style="overflow-x: auto">
                <table class="table table-hover">
                    <tr>
                        <th class="text-bold">Name</th>
                        <th class="text-bold">Price</th>
                        <th class="text-bold">Store</th>
                        <th class="text-bold">Product code</th>
                        <th class="text-bold">Action</th>
                    </tr>
                    @if(empty($products->count()))
                        <tr>
                            <td colspan="5" align="center">Data not found</td>
                        </tr>
                    @else
                        @foreach($products as $item)
                            <tr id="row-{{$item->id}}">
                                <td>{{$item->name}}</td>
                                <td>{{$item->price}}</td>
                                <td>{{optional($item->store)->name}}</td>
                                <td>{{$item->product_code}}</td>
                                <td>
                                    <a class="link-edit"
                                       href="{{route('products.show', ['product' => $item->id])}}">Show</a>
                                    <a class="link-edit"
                                       href="{{route('products.edit', ['product' => $item->id])}}">Edit</a>
                                    <a type="button" data-row-id="#row-{{$item->id}}"
                                       class="link-delete" data-btn-confirm="Confirm"
                                       data-btn-cancel="Cancel"
                                       data-href="{{route('products.destroy', ['product' => $item->id])}}"
                                       data-title="confirm"
                                       data-message="Are you sure you want to delete this item?">Delete</a>
                                </td>
                            </tr>
                        @endforeach
                    @endif
                </table>
                <div style="text-align: right">
                    @if(!empty($products) && $products->count())
                        {!! $products->appends(request()->all())->links("pagination::bootstrap-4") !!}
                    @endif
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
@endpush
