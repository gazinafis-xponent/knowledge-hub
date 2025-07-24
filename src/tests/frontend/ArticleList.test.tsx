import { render, screen } from '@testing-library/react';
import ArticleList from '@/components/ArticleList';

describe('ArticleList', () => {
  it('renders articles correctly', () => {
    const articles = [
      { id: '1', title: 'Test Article', body: 'Test body', tags: ['test'] },
    ];
    const onDelete = jest.fn();
    const onSummarize = jest.fn();

    render(<ArticleList articles={articles} onDelete={onDelete} onSummarize={onSummarize} />);

    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText(/Test body/)).toBeInTheDocument();
    expect(screen.getByText('Tags: test')).toBeInTheDocument();
  });
});