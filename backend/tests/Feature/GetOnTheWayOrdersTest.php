<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class GetOnTheWayOrdersTest extends TestCase
{
    public function testGetOnTheWayOrders()
    {
        // Log in as the delivery user
        $response = $this->postJson('/api/login', [
            'email' => 'Hadi@gmail.com',
            'password' => '123456',
        ]);

        $response->assertStatus(200);

        // Extract the token from the response
        $token = $response['authorisation']['token'];

        // Make a request to get on the way orders
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/getOnTheWayOrders');

        // Assert that the response is successful
        $response->assertStatus(200);

        // Assert the structure of the response JSON
        $response->assertJsonStructure([
            'on_the_way_orders' => [
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

        // Assert that the on the way orders are retrieved successfully
        // You can add specific assertions based on the sample data provided
    }
}
