import Replicate from "replicate";
import { NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const prediction = await replicate.predictions.get(params.id);

    return NextResponse.json({
      status: prediction.status,
      output: prediction.output,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}