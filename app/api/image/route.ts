import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const IMAGE_GENERATION_API_URL = "http://4.240.106.246:8080/predictions";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { amount }=body;
        
        const {
            prompt,
            cn_type1 = "ImagePrompt",
            cn_type2 = "ImagePrompt",
            cn_type3 = "ImagePrompt",
            cn_type4 = "ImagePrompt",
            sharpness = 2,
            image_seed = 50403806253646856,
            uov_method = "Disabled",
            image_number = amount,
            guidance_scale = 4,
            refiner_switch = 0.5,
            negative_prompt = "",
            style_selections = "Fooocus V2,Fooocus Enhance,Fooocus Sharp",
            uov_upscale_value = 0,
            outpaint_selections = "",
            outpaint_distance_top = 0,
            performance_selection = "Speed",
            outpaint_distance_left = 0,
            aspect_ratios_selection = "1152*896",
            outpaint_distance_right = 0,
            outpaint_distance_bottom = 0,
            inpaint_additional_prompt = ""
        } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!prompt || typeof prompt !== "string") {
            return new NextResponse("Prompt is required and should be a string.", { status: 400 });
        }

        const response = await fetch(IMAGE_GENERATION_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                input: {
                    prompt,
                    cn_type1,
                    cn_type2,
                    cn_type3,
                    cn_type4,
                    sharpness,
                    image_seed,
                    uov_method,
                    image_number,
                    guidance_scale,
                    refiner_switch,
                    negative_prompt,
                    style_selections,
                    uov_upscale_value,
                    outpaint_selections,
                    outpaint_distance_top,
                    performance_selection,
                    outpaint_distance_left,
                    aspect_ratios_selection,
                    outpaint_distance_right,
                    outpaint_distance_bottom,
                    inpaint_additional_prompt
                }
            })
        });

        const data = await response.json();
        // console.log(data);

        if (response.ok && data && data.output) {
            // Assuming the response contains a base64 image string
            console.log(data)
            return NextResponse.json( data );
        } else {
            console.error("[IMAGE_GENERATION_ERROR] Response Error:", data);
            return new NextResponse("Error generating image", { status: 500 });
        }
    } catch (error: any) {
        console.error("[IMAGE_GENERATION_ERROR] Error:", error.message);
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}
