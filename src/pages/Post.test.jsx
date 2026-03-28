import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Post from './Post';

vi.mock('../utils/posts', () => ({
  getPostBySlug: (slug) => {
    if (slug === 'test-post') {
      return {
        title: 'Test Post',
        subtitle: 'Subheading',
        date: '2026-02-01',
        body: 'word '.repeat(420),
      };
    }
    return undefined;
  },
}));

describe('Post page', () => {
  it('renders the fallback UI when a post does not exist', () => {
    render(
      <MemoryRouter initialEntries={['/blog/missing']}>
        <Routes>
          <Route path="/blog/:slug" element={<Post />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /404 - Post Not Found/i })).toBeInTheDocument();
  });

  it('renders a valid post and calculated reading time', () => {
    render(
      <MemoryRouter initialEntries={['/blog/test-post']}>
        <Routes>
          <Route path="/blog/:slug" element={<Post />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Test Post' })).toBeInTheDocument();
    expect(screen.getByText(/2 min read/)).toBeInTheDocument();
  });
});
