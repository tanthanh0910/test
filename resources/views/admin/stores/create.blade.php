@extends('admin.layouts.app')
@section('title','Store')
@section('content')

    <!-- Start main content -->
    <div class="content user-admin-add-new">
        <a class="btn-back-previous btn btn-default" href="{{route("stores.index")}}">
            <img src="{{asset('/backend/icons/icon-back-page.svg')}}"
                 alt=""/><span>Back to previous</span>
        </a>
        <div class="card mt-4 p-5 flex-1">
            <div class="text-center function-title">
                <p class="text-title">New Store</p>
            </div>

            <div class="d-flex justify-content-center">
                <!-- Form add new admin -->
                <form class="form-add-admin" id="formAddStore" method="post"
                      action="{{route('stores.store')}}">
                    @csrf
                    <div class="mt-4 row gutter-40 justify-content-between">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="label-bold" for="factory-name">Name
                                    *</label>
                                <input name="name" type="text" class="form-control big" id="name"
                                       value="{{old('name')}}"
                                       placeholder="Name"/>
                                @include("admin.partial.error-field-v2", with(['column' => 'name']))
                            </div>
                        </div>
                    </div>

                    <div class="mt-4 row gutter-40 justify-content-between">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class="label-bold" for="tel">Address</label>
                                <input name="address" type="text" class="form-control big" id="tel"
                                       value="{{old('address')}}"
                                       placeholder="Address"/>
                                @include("admin.partial.error-field-v2", with(['column' => 'address']))
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class="label-bold" for="email">Phone</label>
                                <input name="phone" type="text" class="form-control big"
                                       value="{{old('Phone')}}"
                                       id="email" placeholder="Phone"/>
                                @include("admin.partial.error-field-v2", with(['column' => 'phone']))
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 row gutter-40 justify-content-between">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="label-bold" for="address">User</label>
                                <select class="form-control" style="width: max-width" id="user_id"
                                        name="user_id">
                                    <option value="" hidden selected>All select</option>
                                    @if(!empty($users))
                                        @foreach($users as $user)
                                            <option value="{{$user->id}}" {{old('user_id') == $user->id ? 'selected' : '' }}>{{$user->name}}</option>
                                        @endforeach
                                    @endif
                                </select>
                                @include("admin.partial.error-field-v2", with(['column' => 'user_id']))
                            </div>
                        </div>
                    </div>

                    <div class="box-footer text-center">
                        <button type="submit" class="btn btn-default">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
