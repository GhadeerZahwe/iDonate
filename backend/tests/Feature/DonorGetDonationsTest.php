<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DonorGetDonationsTest extends TestCase
{

    public function testGetDonorDonations()
    {
                // Log in as the donor user
        $response = $this->postJson('/api/login', [
            'email' => 'nabiha@gmail.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200);

        $token = $response['authorisation']['token'];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/getDonorDonations');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'donor_info',
            'donations' => [
                '*' => [
                    'id',
                    'status',
                    'date',
                    'description',
                    'total_weight',
                    'pickup_within',
                    'phone_number',
                    'location_pickup',
                    'delivery_name',
                    'locations' => [
                        'id',
                        'user_id',
                        'latitude',
                        'longitude',
                        'description',
                        'created_at',
                        'updated_at',
                    ],
                ],
            ],
        ]);
    }
}
