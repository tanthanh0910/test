<ul class="sidebar-menu" data-widget="tree">

    <li class="{{(Request::is('stores')) || (Request::is('stores/*')) ? 'active' : ''}}">
        <a style="padding-left: 14.5px;" class="{{(Request::is('stores')) || (Request::is('stores/*')) ? 'menu-active-color' : ''}}"
           href="{{route('stores.index')}}">
            <i class="fa fa-fw fa-home"></i> <span>Stores</span>
            <span class="pull-right-container"></span>
        </a>
    </li>
</ul>
<ul class="sidebar-menu" data-widget="tree">

    <li class="{{(Request::is('products')) || (Request::is('products/*')) ? 'active' : ''}}">
        <a style="padding-left: 14.5px;" class="{{(Request::is('products')) || (Request::is('products/*')) ? 'menu-active-color' : ''}}"
           href="{{route('products.index')}}">
            <i class="fa fa-fw fa-home"></i> <span>Product</span>
            <span class="pull-right-container"></span>
        </a>
    </li>
</ul>
