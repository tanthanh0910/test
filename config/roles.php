<?php

use App\Models\User;

return [
    'permissions' => [
        User::ROLE_SUPER_ADMIN => null,
        User::ROLE_ADMIN => null
    ],

    'none_authorize_actions' => [
    ]
];
