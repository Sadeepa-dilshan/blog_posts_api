<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         // Create roles
         $adminRole = Role::create(['name' => 'admin']);
         $userRole = Role::create(['name' => 'user']);
 
         // Create permissions
         $manageUsers = Permission::create(['name' => 'manage users']);
         $editPosts = Permission::create(['name' => 'edit posts']);
 
         // Assign permissions to roles
         $adminRole->givePermissionTo($manageUsers);
         $adminRole->givePermissionTo($editPosts);
 
         $userRole->givePermissionTo($editPosts);
    }
}
