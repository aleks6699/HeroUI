import { NextResponse } from 'next/server';
import { memes } from '@/app/dataBase/db';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const memeId = parseInt(params.id);
  if (isNaN(memeId)) {
    return NextResponse.json(
      { error: "Invalid meme ID" },
      { status: 400 }
    );
  }

  const meme = memes.find(m => m.id === memeId);

  if (!meme) {
    return NextResponse.json(
      { error: "Meme not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(meme);
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const memeId = parseInt(params.id);
  if (isNaN(memeId)) {
    return NextResponse.json(
      { error: "Invalid meme ID" },
      { status: 400 }
    );
  }

  try {
    const updateData = await request.json();

    if (!updateData.name && !updateData.image && updateData.likes === undefined) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    const memeIndex = memes.findIndex(m => m.id === memeId);
    if (memeIndex === -1) {
      return NextResponse.json(
        { error: "Meme not found" },
        { status: 404 }
      );
    }

    if (updateData.name && (updateData.name.length < 3 || updateData.name.length > 100)) {
      return NextResponse.json(
        { error: "Name must be between 3 and 100 characters" },
        { status: 400 }
      );
    }

    if (updateData.image && !/\.(jpe?g|png|gif|webp)$/i.test(updateData.image)) {
      return NextResponse.json(
        { error: "Invalid image format. Use .jpg, .jpeg, .png, .gif or .webp" },
        { status: 400 }
      );
    }

    const updatedMeme = {
      ...memes[memeIndex],
      ...updateData,
      id: memeId
    };

    memes[memeIndex] = updatedMeme;

    return NextResponse.json(updatedMeme);

  } catch (error) {
    console.error('Error updating meme:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
