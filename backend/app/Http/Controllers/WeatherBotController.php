<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class WeatherBotController extends Controller
{
    public function getWeatherAdvice(Request $request)
    {
        // Replace 'YOUR_TOMORROW_IO_API_KEY' with your actual API key
        $apiKey = 'JjrnFqkUC6sAzhUv1Bci4ZF0LBhdrOV4';

        // Coordinates for Beirut
        $latitude = 33.8469148;
        $longitude = 35.5214354;

        // Construct the API endpoint URL
        $apiUrl = "https://api.tomorrow.io/v4/timelines?location={$latitude},{$longitude}&fields=temperature&timesteps=1h&units=metric&apikey={$apiKey}";

        // Initialize Guzzle client
        $client = new Client();

        // Make a GET request to the Tomorrow.io API
        $response = $client->get($apiUrl);

        // Decode the JSON response
        $weatherData = json_decode($response->getBody(), true);

        // Extract temperature data
        $temperature = $weatherData['data']['timelines'][0]['intervals'][0]['values']['temperature'];

        // Generate a response
        $responseText = "The current temperature in Beirut is {$temperature}°C.";

        return response()->json(['response' => $responseText]);
    }
}
