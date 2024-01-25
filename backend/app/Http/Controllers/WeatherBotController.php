<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;

class WeatherBotController extends Controller
{
    public function getWeatherAdvice(Request $request)
    {
        $userPrompt = "Advise on any weather considerations that may affect food donation deliveries today in Lebanon.";
        $keywords = ['weather', 'advice', 'food donation', 'Lebanon'];

        $containsKeyword = false;
        foreach ($keywords as $keyword) {
            if (str_contains($userPrompt, strtolower($keyword))) {
                $containsKeyword = true;
                break;
            }
        }

        if ($containsKeyword) {
            $predefinedPrompts = [
                "What weather considerations should be taken into account for food donation deliveries in Lebanon today?",
                "Lebanon's current weather may impact food donation deliveries. How can I help you navigate this?",
                "Understanding the weather is crucial for successful food donation deliveries in Lebanon. What specific information are you looking for?",
                "Did you know that being aware of the weather conditions is essential for planning food donation deliveries in Lebanon? How can I assist you with this?",
                "Considering the weather in Lebanon is important for food donation deliveries. What specific advice are you seeking?",
            ];

            $selectedPrompt = $predefinedPrompts[array_rand($predefinedPrompts)];

            $result = OpenAI::completions()->create([
                'model' => 'gpt-3.5-turbo-instruct',
                'prompt' => $selectedPrompt,
                'max_tokens' => 3700,
            ]);

            $lines = explode("\n", $result->toArray()['choices'][0]['text']);
            $limitedResponse = implode("\n", array_slice($lines, 0, 11));

            return response()->json(['response' => $limitedResponse]);
        } else {
            $response = "I'm here to assist you with weather-related questions for food donation deliveries in Lebanon. Please provide a relevant prompt, including keywords like 'weather,' 'advice,' or 'Lebanon.'";
            return response()->json(['response' => $response]);
        }
    }
}
