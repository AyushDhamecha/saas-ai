import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { CreateChatCompletionRequestMessage } from "openai/resources/index.mjs";

const AZURE_OPENAI_API_KEY = process.env.AZURE_API_KEY ;
const AZURE_OPENAI_INSTANCE_NAME = process.env.AZURE_OPENAI_INSTANCE_NAME;  
const AZURE_OPENAI_MODEL_DEPLOYMENT = process.env.AZURE_DEPLOYMENT_NAME||""; 

if (!AZURE_OPENAI_API_KEY) {
    throw new Error("The AZURE_OPENAI_API_KEY environment variable is missing or empty.");
}

const openai = new OpenAI({
    apiKey: AZURE_OPENAI_API_KEY,
    baseURL: `https://${AZURE_OPENAI_INSTANCE_NAME}.openai.azure.com/openai/deployments/${AZURE_OPENAI_MODEL_DEPLOYMENT}`,
    defaultQuery: { "api-version": "2023-03-15-preview" },  
    defaultHeaders: { "api-key": AZURE_OPENAI_API_KEY },
});

const instructionMessage: CreateChatCompletionRequestMessage = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
};

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!messages || !Array.isArray(messages)) {
            return new NextResponse("Messages are required and should be an array.", { status: 400 });
        }

        const response = await openai.chat.completions.create({
            model: AZURE_OPENAI_MODEL_DEPLOYMENT,
            messages: [instructionMessage, ...messages],
        });

        if (response.choices && response.choices[0] && response.choices[0].message) {
            return NextResponse.json(response.choices[0].message);
        } else {
            return new NextResponse("No response from OpenAI.", { status: 500 });
        }
    } catch (error: any) {
        if (error.response) {
            console.error("[CODE_ERROR] Response Error:", error.response.data);
        } else if (error.request) {
            console.error("[CODE_ERROR] No Response:", error.request);
        } else {
            console.error("[CODE_ERROR] Error:", error.message);
        }
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}
