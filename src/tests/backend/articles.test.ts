import { GET } from '@/app/api/articles/route';
import prisma  from '@/lib/prisma';
import jwt from 'jsonwebtoken';

jest.mock('@/lib/prisma');
jest.mock('@/lib/auth');

describe('Articles API', () => {
  it('returns articles for authenticated user', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    const mockArticles = [{ id: '1', title: 'Test', body: 'Body', tags: ['test'], userId: '1' }];

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (prisma.article.findMany as jest.Mock).mockResolvedValue(mockArticles);

    const request = new Request('http://localhost/api/articles', {
      headers: { Authorization: 'Bearer valid-token' },
    });

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockArticles);
  });
});