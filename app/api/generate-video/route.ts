import * as fal  from "@fal-ai/serverless-client";
import { NextResponse } from "next/server";

fal.config({
  credentials: process.env.FAL_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt, image } = await req.json();

   let result: any;

if (image) {
  result = await fal.subscribe(
    "fal-ai/ltx-2.3/image-to-video/fast",
    {
      input: {
        prompt,
        image_url: image,
        duration: 6,
        aspect_ratio: "16:9",
        resolution: "1080p",
        fps: 25,
      },
    }
  );
} else {
  result = await fal.subscribe(
    "fal-ai/ltx-2.3/text-to-video/fast",
    {
      input: {
        prompt,
        duration: 6,
        aspect_ratio: "16:9",
        resolution: "1080p",
        fps: 25,
      },
    }
  );
}
    
    return NextResponse.json({
      success: true,
      videoUrl: result.video.url,
    });
  } catch (error: any) {
    console.dir(error.body, {depth: null, });
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