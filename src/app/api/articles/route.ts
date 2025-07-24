import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';
import  {getUserFromToken}  from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const tag = searchParams.get('tag') || '';
  const user = await getUserFromToken(request);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const articles = await prisma.article.findMany({
    where: {
      userId: user.id,
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { body: { contains: search, mode: 'insensitive' } },
      ],
      tags: tag ? { has: tag } : undefined,
    },
  });

  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  const user = await getUserFromToken(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, body, tags } = await request.json();
  const article = await prisma.article.create({
    data: { title, body, tags, userId: user.id },
  });

  return NextResponse.json(article);
}