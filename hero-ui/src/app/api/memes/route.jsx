import {memes} from "../../dataBase/db";  
import { NextResponse } from "next/server";

export async function GET() {
  if (!memes) {
    return NextResponse.json({ error: "Meme not found" }, { status: 404 });
  }

  return NextResponse.json(memes);
}