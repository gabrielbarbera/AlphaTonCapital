import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const zipPath = join(process.cwd(), 'public', 'assets', 'media_kit.zip');
    const fileBuffer = await readFile(zipPath);
    
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="media_kit.zip"',
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error serving media kit zip file:', error);
    }
    return new NextResponse(
      JSON.stringify({ error: 'Media kit file not found' }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

