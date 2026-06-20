import Replicate from "replicate";
import { NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { prompt, image } = await req.json();
    console.log(image);

    console.log("Prompt received:", prompt);

    const output = await replicate.run(
      "kwaivgi/kling-v1.6-standard",
      {
        input: {
          prompt,
          start_image: image,
        },
      }
    );

    console.log("OUTPUT TYPE:", typeof output);
    console.dir(output, { depth: null});
    console.log("OUTPUT STRING:", String(output))

    return NextResponse.json({
      success: true,
      videoUrl: String(output),
    });
  } catch (error) {
    console.error("REPLICATE ERROR:", error);

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