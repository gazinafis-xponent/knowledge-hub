import { GET, POST } from '@/app/api/articles/route';
import  prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: { findUnique: jest.fn() },
    article: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('Articles API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET returns articles for authenticated user', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      password: 'mock-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockArticles = [{ id: '1', title: 'Test', body: 'Body', tags: ['test'], userId: '1', createdAt: new Date(), updatedAt: new Date() }];

    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);
    jest.spyOn(prisma.article, 'findMany').mockResolvedValue(mockArticles);

    const request = new NextRequest('http://localhost/api/articles', {
      headers: { Authorization: 'Bearer mock-token' },
    });

    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(prisma.article.findMany).toHaveBeenCalled();
  });

  it('POST creates a new article', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      password: 'mock-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
   const mockArticle = { id: '1', title: 'Test', body: 'Body', tags: ['test'], userId: '1', createdAt: new Date(), updatedAt: new Date() };

    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);
    jest.spyOn(prisma.article, 'create').mockResolvedValue(mockArticle);

    const request = new NextRequest('http://localhost/api/articles', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer mock-token',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: 'Test', body: 'Body', tags: ['test'] }),
    });

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(201);
    expect(json).toEqual(mockArticle);
    expect(prisma.article.create).toHaveBeenCalledWith({
      data: {
        title: 'Test',
        body: 'Body',
        tags: ['test'],
        userId: '1',
      },
    });
  });
});
