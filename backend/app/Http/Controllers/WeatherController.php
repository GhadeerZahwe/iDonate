<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class WeatherController extends Controller
{
    public function getWeatherTemperature(Request $request)
    {
        $apiKey = 'JjrnFqkUC6sAzhUv1Bci4ZF0LBhdrOV4';

        $latitude = 33.8469148;
        $longitude = 35.5214354;

        $apiUrl = "https://api.tomorrow.io/v4/timelines?location={$latitude},{$longitude}&fields=temperature&timesteps=1h&units=metric&apikey={$apiKey}";

        $client = new Client();

        $response = $client->get($apiUrl);

        $weatherData = json_decode($response->getBody(), true);

        $temperature = $weatherData['data']['timelines'][0]['intervals'][0]['values']['temperature'];

        $responseText = "The current temperature in Beirut is {$temperature}°C.";

        return response()->json(['response' => $responseText]);
    }
}
