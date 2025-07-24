
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import prisma from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

// Initialize Gemini client
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Force dynamic rendering to bypass Next.js caching
export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await params to get the id
  const { id } = await params;
  console.log('Article ID:', id); // Debug

  const user = await getUserFromToken(request);
  if (!user) {
    console.log('No user found'); // Debug
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // console.log('User:', user); // Debug

  const article = await prisma.article.findFirst({
    where: { id, userId: user.id },
  });
  // console.log('Article:', article); // Debug

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  try {
    const prompt = `Summarize the following article in 100 words or less:\n\n${article.body}`;
    
     const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  const summary = response.text?.trim();
    if (!summary) {
      console.log('No summary generated'); // Debug
      return NextResponse.json({ error: 'No summary generated' }, { status: 502 });
    }
    // console.log('Summary:', summary); // Debug
    return NextResponse.json({ summary });
  } catch (error: unknown) {
    console.error('Gemini error:', (error as Error).message); // Debug
    return NextResponse.json({ error: (error as Error).message || 'Failed to generate summary' }, { status: 500 });
  }
}
