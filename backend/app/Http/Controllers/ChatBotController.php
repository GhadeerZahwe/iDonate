<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;

class ChatBotController extends Controller
{
    public function sendChat(Request $request)
    {
        $userPrompt = strtolower($request->input('prompt'));
        $keywords = ['food', 'donation', 'waste', 'extra food', 'feed','donate', 'weight', 'give','help' ,'need', 'lebanon'];

        $containsKeyword = false;
        foreach ($keywords as $keyword) {
            if (str_contains($userPrompt, strtolower($keyword))) {
                $containsKeyword = true;
                break;
            }
        }

        if ($containsKeyword) {
            $predefinedPrompts = [
                "What type of food items are you considering donating in Lebanon?",
                "Lebanon is in need of support. If you have extra food, consider making a donation to help those in the community. How can I assist you with this?",
                "In Lebanon, food donations can make a significant impact on people's lives. How would you like to contribute to this cause?",
                "Did you know that food donations play a crucial role in supporting communities in Lebanon? How can I help you get started?",
                "Thinking about making a difference in Lebanon? You can donate food to support those in need. How can I assist you with this process?",
                "What type of food items are you considering donating in Lebanon?",
                "Lebanon is in need of support. If you have extra food, consider making a donation to help those in the community. How can I assist you with this?",
                "In Lebanon, food donations can make a significant impact on people's lives. How would you like to contribute to this cause?",
                "Did you know that food donations play a crucial role in supporting communities in Lebanon? How can I help you get started?",
                "Thinking about making a difference in Lebanon? You can donate food to support those in need. How can I assist you with this process?",
                "What type of food items are you looking to donate?",
                "If you have extra food, consider donating it to those in need. How can I assist you with this?",
                "Thinking of making a difference? You can donate food to support those in need. How can I help you with this process?",
                "Curious about reducing food waste? Type 'learn more' for interesting facts and tips!",
                "Interested in giving back? Let me know if you have any questions about donating food or reducing food waste.",
                "Want to give back to the community? Let's explore how you can contribute through food donation.",
                "Planning to donate food? I'm here to guide you through the process and answer any questions you may have.",
                "Need assistance with questions about food, donation, or reducing food waste? Type 'help,' and I'll be there for you.",                     ];

            $selectedPrompt = $predefinedPrompts[array_rand($predefinedPrompts)];

            $result = OpenAI::completions()->create([
                'model' => 'gpt-3.5-turbo-instruct',
                'prompt' => $selectedPrompt,
                'max_tokens' => 3700,
            ]);

            $lines = explode("\n", $result->toArray()['choices'][0]['text']);
            $limitedResponse = implode("\n", array_slice($lines, 0, 11));

            $peopleFedStatistics = "One contribution help feed many individuals in need especially in Lebanon. Your support is making a meaningful impact on the community. Donate today, change a life.";

            $encouragingResponse = "Your contribution can make a real difference in the lives of people. Donating food helps combat hunger and builds a stronger community. $peopleFedStatistics\n\nLet me know if you have any questions or if there's anything specific you'd like assistance with regarding food donations in Lebanon.";

            return response()->json(['response' => $limitedResponse . "\n\n" . $encouragingResponse]);
        } else {
            $response = "I'm here to assist you with questions related to food, donation, waste, and more. Please provide a relevant prompt, including keywords like 'food,' 'donation,' or 'give extra food.'";
            return response()->json(['response' => $response]);
        }
    }
}
