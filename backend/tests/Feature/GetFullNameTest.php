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
        // Log in as the user
        $response = $this->postJson('/api/login', [
            'email' => 'nabiha@gmail.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200);

        // Extract the token from the response
        $token = $response['authorisation']['token'];

        // Make a request to get the full name
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/getFullName');

        // Assert that the response is successful
        $response->assertStatus(200);

      

        // Assert the content of the response JSON
        $response->assertJsonStructure([
            'first_name' ,
            'last_name' ,
        ]);
    }
}
