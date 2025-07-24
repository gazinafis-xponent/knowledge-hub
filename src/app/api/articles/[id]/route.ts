
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { getUserFromToken } from '@/lib/auth';

// Force dynamic rendering to bypass Next.js caching
export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await params to get the id
  const { id } = await params;
  console.log('Fetch Article ID:', id); // Debug

  const user = await getUserFromToken(request);
  if (!user) {
    console.log('No user found'); // Debug
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  console.log('User:', user); // Debug

  const article = await prisma.article.findFirst({
    where: { id, userId: user.id },
  });
  console.log('Article:', article); // Debug

  if (!article) {
    return NextResponse.json({ error: 'Article not found or not owned by user' }, { status: 404 });
  }

  return NextResponse.json(article);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await params to get the id
  const { id } = await params;
  console.log('Delete Article ID:', id); // Debug

  const user = await getUserFromToken(request);
  if (!user) {
    console.log('No user found'); // Debug
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  console.log('User:', user); // Debug

  const article = await prisma.article.findFirst({
    where: { id, userId: user.id },
  });
  console.log('Article:', article); // Debug

  if (!article) {
    return NextResponse.json({ error: 'Article not found or not owned by user' }, { status: 404 });
  }

  try {
    await prisma.article.delete({
      where: { id },
    });
    console.log('Article deleted:', id); // Debug
    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (error: any) {
    console.error('Delete error:', error.message); // Debug
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
