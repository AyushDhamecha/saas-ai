import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const AZURE_OPENAI_API_KEY = process.env.AZURE_API_KEY || "your_actual_key";

if (!AZURE_OPENAI_API_KEY) {
    throw new Error("The AZURE_OPENAI_API_KEY environment variable is missing or empty.");
}

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required.", { status: 400 });
        }

        // Define the payload for the custom API
        const payload = {
            input: {
                alpha: 0.5, // Default value
                prompt_a: prompt,
                prompt_b: prompt,
                denoising: 0.75, // Default value
                seed_image_id: "vibes", // Default value
                num_inference_steps: 50 // Default value
            }
        };

        // Send a POST request to the custom API endpoint
        const response = await fetch("http://4.240.106.246:5000/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorResponse = await response.text();
            console.error("[MUSIC_GENERATION_ERROR] Response Error:", errorResponse);
            return new NextResponse(`Music generation failed: ${errorResponse}`, { status: response.status });
        }

        const responseData = await response.json();

        // Log the response for debugging
        console.log("[MUSIC_GENERATION_SUCCESS] Response Data:", responseData);

        // Return the base64 audio code
        return NextResponse.json(responseData);
    } catch (error: any) {
        console.error("[MUSIC_GENERATION_ERROR]", error.message);
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}
