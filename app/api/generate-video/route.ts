import * as fal  from "@fal-ai/serverless-client";
import { NextResponse } from "next/server";

fal.config({
  credentials: process.env.FAL_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt, image } = await req.json();

    const result: any = await fal.subscribe("fal-ai/kling-video/v2.1/standard/image-to-video", {
      input: {
        prompt,
        image_url: image,
        duration: "5",
        aspect_ratio: "16:9",
      },
    });
    
    return NextResponse.json({
      success: true,
      videoUrl: result.video.url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}