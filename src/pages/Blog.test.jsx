import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Blog from './Blog';

vi.mock('../utils/posts', () => ({
  getAllPosts: () => [
    {
      slug: 'new-post',
      title: 'Newest Post',
      subtitle: 'Latest updates',
      date: '2026-01-02',
    },
    {
      slug: 'old-post',
      title: 'Older Post',
      subtitle: 'Archive',
      date: '2025-01-01',
    },
  ],
}));

describe('Blog page', () => {
  it('renders posts and marks the first one as latest', () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Newest Post' })).toBeInTheDocument();
    expect(screen.getByText('LATEST')).toBeInTheDocument();

    const links = screen.getAllByRole('link', { name: /Read More/i });
    expect(links[0]).toHaveAttribute('href', '/blog/new-post');
  });
});
