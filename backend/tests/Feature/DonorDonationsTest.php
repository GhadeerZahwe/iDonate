<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class DonorDonationsTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function testGetDonorDonations(): void
    {
        $response = $this->actingAs($donor)->get('/api/getDonorDonations');

        $response->assertStatus(200);

        
    }
}
