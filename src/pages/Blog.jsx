import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/posts';

export default function Blog() {
  const posts = getAllPosts();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <h1 style={{ fontSize: '3.5rem', borderBottom: 'var(--border-width) solid var(--border-color)', paddingBottom: '1rem', marginBottom: '0' }}>Blog / Thoughts</h1>
      
      {posts.length === 0 ? (
        <div className="brutal-card" style={{ padding: '3rem', backgroundColor: 'var(--card-bg)', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Fira Code', monospace", fontSize: '1.1rem', opacity: 0.5 }}>{'// no posts yet — check back soon'}</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {posts.map((post, index) => {
            const cardDate = post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown Date';
            const isFeatured = index === 0;

            return (
              <motion.div
                key={post.slug}
                className="brutal-card interactive"
                style={{
                  padding: '2rem',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-color)',
                  borderLeft: isFeatured ? '6px solid var(--accent-yellow)' : 'var(--border-width) solid var(--border-color)',
                }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'tween', duration: 0.28, ease: 'easeOut', delay: Math.min(index * 0.09, 0.45) }}
                whileHover={{ x: 4, y: 4, transition: { type: 'tween', duration: 0.08 } }}
                whileTap={{ x: 6, y: 6, transition: { type: 'tween', duration: 0.05 } }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 800, fontFamily: 'monospace', fontSize: '0.85rem', backgroundColor: 'var(--text-color)', color: 'var(--bg-color)', padding: '0.2rem 0.5rem' }}>
                    {cardDate}
                  </span>
                  {isFeatured && (
                    <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'var(--accent-yellow)', color: '#000', border: '2px solid var(--border-color)', padding: '0.15rem 0.5rem' }}>
                      LATEST
                    </span>
                  )}
                </div>
                <h2 style={{ marginBottom: '0.75rem', fontSize: '1.8rem' }}>{post.title}</h2>
                {(post.subtitle || post.excerpt) && (
                  <p style={{ marginBottom: '1.5rem', fontWeight: 500, fontSize: '1rem', opacity: 0.7 }}>{post.subtitle || post.excerpt}</p>
                )}
                <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <button className="brutal-btn" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--border-color)', color: 'var(--text-color)' }}>Read More ➝</button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
