<?php

namespace Tests\Feature;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class AuthControllerLogoutTest extends TestCase
{
   
   public function testUserLogout(){
   $response=$this->postJson('/api/login',[
       'email'=>'Ghadeer@gmail.com',
       'password'=>'123456',
   ]);

   $token=$response->json('authorisation.token');
   $response->assertStatus(200);
   $this->assertNotNull($token);

   $logoutResponse=$this->withHeaders([
    'Authorization'=>'Bearer '. $token,
   ])->postJson('/api/logout');

   $logoutResponse->assertStatus(200)
   ->assertJson([
    'status' => 'success',
    'message' => 'Successfully logged out'
   ]);
  }
}
