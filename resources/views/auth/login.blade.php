<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>{{ config('app.name') }}</title>

    <!-- Bootstrap -->
    <link href="{{asset('backend/bootstrap-3.3.7-dist/css/bootstrap.min.css')}}" rel="stylesheet"/>
    <link rel="stylesheet" href="{{asset('backend/css/app.css')}}"/>
    <link rel="stylesheet" href="{{asset('backend/css/auth.css')}}"/>
    <link rel="stylesheet" href="{{asset('backend/css/login_admin.css')}}"/>
    <style>
        @media screen and (max-width: 375px) {
            .auth__brands {
                margin-top: 70px;
                height: 180px;
                padding: 16px;
            }
        }

        @media screen and (max-width: 390px) {
            .card-container.card {
                width: 375px !important;
                padding: 2rem 2rem !important;
            }

            .form-mobile {
                margin-left: 12px !important;
            }
        }

        @media screen and (max-width: 375px) {
            .card-container.card {
                width: 352px !important;
            }

            .form-mobile {
                margin-left: 1px !important;
            }
        }
    </style>
</head>

<body>
<!--Start  Sidebar -->
<div class="container full-wrapper">
    <div id="google_translate_element"></div>
    <div class="auth h-100">
{{--        <img class="auth__brands" src="{{asset('backend/images/logo_login_admin.png')}}" alt=""/>--}}
        <div class="card card-container form-mobile">
            <form class="form-auth mt-4" method="post" spellcheck="false" autocomplete="on" action="{{ route('auth.post-login') }}">
                {{ csrf_field() }}
                @include('admin.layouts.flash-message')
                <input name="lang" class="lang" value="{{request()->get('language') == null ? 'en' : request()->get('language')}}" type="hidden" />
                <div class="form-group {{ $errors->has('email') ? ' has-error' : '' }}">
                    <label for="user-name">Email</label>
                    <input type="text" name="email" id="user-name" value="{{ old('email') }}"
                           class="form-control form-custom"
                           placeholder="Email" autofocus/>
                    @include("admin.partial.error-field-v2", with(['column' => 'user_name']))

                </div>
                <div class="form-group {{ $errors->has('password') ? ' has-error' : '' }}">
                    <label for="password-sign-in">Password</label>
                    <input type="password" name="password" id="password-sign-in" class="form-control form-custom"
                           placeholder="Password"/>
                    @include("admin.partial.error-field-v2", with(['column' => 'password']))
                </div>

                <button class="btn btn-master"
                        style="margin-top: 3.5rem;background-color: #F78A29;color: #000000; font-size: 16px;"
                        type="submit">
                    Login
                </button>
            </form>
        </div>
    </div>
</div>

<!--End Sidebar -->

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="{{asset('backend/bootstrap-3.3.7-dist/js/bootstrap.min.js')}}"></script>
<!--PLEASE DO NOT COPY CONTENT OF THIS URL AND PASTE THIS CODE-->
<!--param hl is lang you want to show in browser-->

</body>

</html>



