<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class AuthControllerRegisterTest extends TestCase
{
    // use RefreshDatabase;

    /**
     * Test user registration.
     *
     * @return void
     */
    public function testUserRegistration()
    {
        $userData = [
            'first_name' => 'Nabiha',
            'last_name' => 'Daoud',
            'email' => 'nabiha@gmail.com',
            'password' => 'password123',
            'phone' => '123456789',
            'user_type' => 'donor',
        ];

        $response = $this->post('/api/register', $userData);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'user',
                'authorisation' => [
                    'token',
                    'type',
                ],
            ]);
    }
}
