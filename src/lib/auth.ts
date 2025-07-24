import jwt from 'jsonwebtoken';
import  prisma  from './prisma';
// import { NextRequest } from 'next/server';

export async function getUserFromToken(request: Request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  console.log(token)
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true }, // Select only necessary fields
    });
    return user;
  } catch (error) {
    return null;
  }
}