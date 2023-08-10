<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();
        User::truncate();

        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@gmail.com',
            'role_id' => User::ROLE_SUPER_ADMIN,
            'password' => bcrypt('123123123'),
        ]);

        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'role_id' => User::ROLE_ADMIN,
            'password' => bcrypt('123123123'),
        ]);
        User::create([
            'name' => 'User one',
            'email' => 'userone@gmail.com',
            'role_id' => 2,
            'password' => bcrypt('123123123'),
        ]);
        User::create([
            'name' => 'User two',
            'email' => 'usertwo@gmail.com',
            'role_id' => 2,
            'password' => bcrypt('123123123'),
        ]);
    }
}
