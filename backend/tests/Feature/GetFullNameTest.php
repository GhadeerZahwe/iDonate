<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class GetFullNameTest extends TestCase
{
    public function testGetFullName()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'nabiha@gmail.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200);

        $token = $response['authorisation']['token'];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/getFullName');

        $response->assertStatus(200);

      

        $response->assertJsonStructure([
            'first_name' ,
            'last_name' ,
        ]);
    }
}
