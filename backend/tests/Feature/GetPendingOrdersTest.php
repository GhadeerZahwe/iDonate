<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class GetPendingOrdersTest extends TestCase
{
    public function testGetPendingOrders()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'Hadi@gmail.com',
            'password' => '123456',
        ]);

        $response->assertStatus(200);

        $token = $response['authorisation']['token'];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/getPendingOrders');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'pending_orders' => [
                '*' => [
                    'id',
                    'status',
                    'description',
                    'total_weight',
                    'pickup_within',
                    'phone_number',
                    'date',
                    'location_pickup',
                    'donor',
                    'locations',
                ],
            ],
        ]);

        $response->assertJson(['pending_orders' => []]); // Assuming no pending orders initially
    }
}
