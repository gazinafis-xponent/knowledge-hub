import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';

export async function GET(request: Request) {
  const user = await getUserFromToken(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ user });
}