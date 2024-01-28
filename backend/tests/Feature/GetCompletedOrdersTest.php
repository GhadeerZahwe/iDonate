<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class GetCompletedOrdersTest extends TestCase
{
    public function testGetCompletedOrders()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'Hadi@gmail.com',
            'password' => '123456',
        ]);

        $response->assertStatus(200);

        $token = $response['authorisation']['token'];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/getCompletedOrders');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'completed_orders' => [
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

        $response->assertJson(['completed_orders' => []]); 
    }
}
