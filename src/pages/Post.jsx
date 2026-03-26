import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  if (!post) {
    return (
      <div className="brutal-card" style={{ padding: '3rem', backgroundColor: 'var(--accent-pink)' }}>
        <h1 style={{ fontSize: '3rem' }}>404 - Post Not Found</h1>
        <Link to="/blog"><button className="brutal-btn" style={{ marginTop: '2rem', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}>← Back to Blog</button></Link>
      </div>
    );
  }

  const postDate = post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown Date';
  const readTime = estimateReadTime(post.body);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <div className="brutal-card" style={{ padding: '3rem', backgroundColor: 'var(--card-bg)', boxShadow: 'none' }}>
        <Link to="/blog" style={{ fontFamily: 'monospace', fontWeight: 800, textDecoration: 'none', color: 'var(--text-color)' }}>← Back to Blog</Link>
        <h1 style={{ fontSize: '4rem', marginTop: '2rem', marginBottom: '1rem', lineHeight: 1.1 }}>{post.title}</h1>
        {post.subtitle && <h3 style={{ fontSize: '1.5rem', opacity: 0.8, marginBottom: '1rem' }}>{post.subtitle}</h3>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 800, fontFamily: 'monospace', fontSize: '0.9rem', backgroundColor: 'var(--accent-yellow)', color: '#000', border: '2px solid var(--border-color)', padding: '0.2rem 0.5rem' }}>
            {postDate}
          </span>
          <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-color)', opacity: 0.55 }}>
            ≈ {readTime} min read
          </span>
        </div>
      </div>

      <div className="brutal-card" style={{ padding: '3rem', backgroundColor: 'var(--card-bg)' }}>
        <div style={{ fontSize: '1.1rem', lineHeight: 1.8 }} className="markdown-content">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.body}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
