@if ($message = Session::get('success'))
    <div class="alert alert-success mt-5">
        {{ $message }}
    </div>
@endif


@if ($message = Session::get('error'))

    <div class="alert alert-danger mt-5">
        {{ $message }}
    </div>
@endif


@if ($message = Session::get('warning'))

    <div class="alert alert-warning mt-5">
        {{ $message }}
    </div>
@endif

@if ($message = Session::get('danger'))
    <div class="alert alert-danger mt-5">
        {{ $message }}
    </div>
@endif

@if ($message = Session::get('info'))
    <div class="alert alert-info mt-5">
        {{ $message }}
    </div>

@endif
