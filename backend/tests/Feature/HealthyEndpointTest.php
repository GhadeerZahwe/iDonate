<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class HealthyEndpointTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_server_status_endpoint(): void
    {
        $response = $this->get('/api/healthy');

        $response->assertStatus(200)
        ->assertJson([
            'success'=> true,
        ]);
    }
}
