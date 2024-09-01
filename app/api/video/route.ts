import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from 'axios';

const NEXT_PUBLIC_DEEPAI_API_KEY = process.env.DEEPAI_API_KEY;

if (!NEXT_PUBLIC_DEEPAI_API_KEY) {
    throw new Error("The DEEPAI_API_KEY environment variable is missing or empty.");
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

        const response = await axios.post(
            'https://api.deepai.org/api/some-correct-endpoint', // Replace with the correct endpoint
            { text: prompt }, // Adjust payload as needed
            {
                headers: {
                    'Api-Key': NEXT_PUBLIC_DEEPAI_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        if (error.response) {
            console.error("[VIDEO_GENERATION_ERROR] Response Error:", error.response.data);
        } else if (error.request) {
            console.error("[VIDEO_GENERATION_ERROR] No Response:", error.request);
        } else {
            console.error("[VIDEO_GENERATION_ERROR] Error:", error.message);
        }
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}
