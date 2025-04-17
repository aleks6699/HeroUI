import {memes} from "../../dataBase/db";  
import { NextResponse } from "next/server";

export async function GET() {
  if (!memes) {
    return NextResponse.json({ error: "Meme not found" }, { status: 404 });
  }
  

  return NextResponse.json(memes);
}
export async function POST(request) {
  const { name, image } = await request.json();
  if (!name || !image) {
    return NextResponse.json({ error: "Meme not found" }, { status: 404 });
  }
  memes.push({ name, image });
  return NextResponse.json(memes);
}