import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = await getUserFromToken(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const article = await prisma.article.findFirst({
    where: { id: params.id, userId: user.id },
  });

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Summarize the following article in 100 words or less:\n\n${article.body}`,
        },
      ],
      max_tokens: 100,
    });

    const summary = response.choices?.[0]?.message?.content?.trim();
    if (!summary) {
      return NextResponse.json({ error: 'No summary generated' }, { status: 502 });
    }
    return NextResponse.json({ summary });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to generate summary' }, { status: 500 });
  }
}