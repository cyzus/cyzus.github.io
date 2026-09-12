import React from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/posts';

export default function Blog() {
  const posts = getAllPosts();
  return (
    <section aria-labelledby="writing-title">
      <header className="editorial-heading">
        <span className="eyebrow">Notes & essays</span>
        <h1 id="writing-title">Thinking <em>out loud.</em></h1>
        <p>On minds, machines, and everything in between.</p>
      </header>
      {posts.length === 0 ? <p className="empty-note">No essays yet. Check back soon.</p> : (
        <div className="essay-list">{posts.map((post, index) => (
          <article className="essay-row" key={post.slug}>
            <div className="essay-meta">
              <span>{post.date ? new Date(post.date).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' }) : 'Undated'}</span>
              {index === 0 && <span className="latest-note">LATEST</span>}
            </div>
            <div>
              <h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
              {(post.subtitle || post.excerpt) && <p>{post.subtitle || post.excerpt}</p>}
              <Link className="text-link" to={`/blog/${post.slug}`}>Read more <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        ))}</div>
      )}
    </section>
  );
}
