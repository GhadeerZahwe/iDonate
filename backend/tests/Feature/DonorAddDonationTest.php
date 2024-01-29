<?

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DonorAddDonationTest extends TestCase
{

    // // Test adding a donation by a donor
    // public function testAddDonationByDonor()
    // {
    //     // Authenticate as the donor user
    //     $response = $this->postJson('/api/login', [
    //         'email' => 'nabiha@gmail.com',
    //         'password' => 'password123',
    //     ]);

    //     $response->assertStatus(200);

    //     $token = $response['authorisation']['token'];

    //     // Send authenticated request to add donation
    //     $response = $this->withHeaders([
    //         'Authorization' => 'Bearer ' . $token,
    //     ])->postJson('/api/addDonation', [
    //         'total_weight' => '20',
    //         'pickup_within' => '24',
    //         'description' => 'Apples Donation',
    //         'phone_number' => '+96103899901',
    //         'latitude' => '40.7128',
    //         'longitude' => '-4.73',
    //         'location_description' => 'Al-Hamra',
    //         'date' => '2024-01-12',
    //         'location_pickup' => '123 Street',
    //     ]);

    //     $response->assertStatus(201)
    //         ->assertJson([
    //             'message' => 'Donation added successfully',
    //         ]);

    //     // Assert the donation and associated location were created
    //     $this->assertDatabaseHas('orders', [
    //         'description' => 'Apples Donation',
    //         'total_weight' => '20',
    //         'pickup_within' => '24',
    //         'phone_number' => '+96103899901',
    //         'date' => '2024-01-12',
    //         'location_pickup' => '123 Street',
    //     ]);
    //     $this->assertDatabaseHas('locations', [
    //         'latitude' => '40.7128',
    //         'longitude' => '-4.73',
    //         'description' => 'Al-Hamra',
    //     ]);
    //}
 }