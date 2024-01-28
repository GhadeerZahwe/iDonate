<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthControllerLoginTest extends TestCase
{
    public function testUserLogin()
    {
        $user = User::where('email', 'Ghadeer@gmail.com')->first();
        $this->assertNotNull($user, 'User with email Hadi@gmail.com not found.');

        $hashedPassword = Hash::make('123456');

        $response = $this->postJson('/api/login', [
            'email' => 'Ghadeer@gmail.com',
            'password' => '123456',
        ]);

        // Debugging: Log response content
        // dump($response->content());

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'user' => [
                'id',
                'first_name',
                'last_name',
                'email',
                'phone',
                'user_type',
                'created_at',
                'updated_at',
                'deleted_at',
            ],
            'authorisation' => [
                'token',
                'type',
            ],
        ]);
    }
}
