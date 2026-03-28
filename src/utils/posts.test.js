import { describe, expect, it } from 'vitest';
import { getAllPosts, getPostBySlug } from './posts';

describe('posts utils', () => {
  it('loads posts with required fields and sorts by date descending', () => {
    const posts = getAllPosts();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toMatchObject({
      slug: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
    });

    for (let i = 1; i < posts.length; i += 1) {
      const prev = new Date(posts[i - 1].date).getTime();
      const next = new Date(posts[i].date).getTime();
      expect(prev).toBeGreaterThanOrEqual(next);
    }
  });

  it('finds an existing post by slug', () => {
    const [first] = getAllPosts();
    const post = getPostBySlug(first.slug);

    expect(post).toBeTruthy();
    expect(post.slug).toBe(first.slug);
  });
});
