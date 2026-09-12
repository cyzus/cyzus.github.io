import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../utils/posts';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

function estimateReadTime(text) {
  const words = text?.trim().split(/\s+/).length || 0;
  return Math.max(1, Math.round(words / 200));
}

export default function Post() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  if (!post) return (
    <section className="editorial-heading missing-page">
      <span className="eyebrow">404 / Missing entry</span>
      <h1>Post <em>not found.</em></h1>
      <p>This entry may have moved or no longer exists.</p>
      <Link className="text-link" to="/blog">Back to Writing <span aria-hidden="true">↗</span></Link>
    </section>
  );
  const postDate = post.date ? new Date(post.date).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }) : 'Undated';
  return (
    <article className="essay-page">
      <Link className="back-link" to="/blog">← All writing</Link>
      <header className="editorial-heading article-heading">
        <div className="essay-meta"><span>{postDate}</span><span>{estimateReadTime(post.body)} min read</span></div>
        <h1>{post.title}</h1>
        {post.subtitle && <p>{post.subtitle}</p>}
      </header>
      <div className="markdown-content article-body"><ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.body}</ReactMarkdown></div>
      <div className="essay-end"><span aria-hidden="true">✳</span><Link className="back-link" to="/blog">← All writing</Link></div>
    </article>
  );
}
