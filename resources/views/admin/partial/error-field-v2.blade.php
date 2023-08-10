@if(!empty($column))
    @if ($errors->has($column))
        <div class="d-flex">
            <div class="text-small text-secondary">
                <strong class="text-danger">{{ $errors->first($column) }}</strong>
            </div>
        </div>
    @endif
@endif
