import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', zIndex: 100, backgroundColor: 'transparent' }}>
      <div style={{ height: '100%', width: `${progress}%`, backgroundColor: 'var(--accent-yellow)', transition: 'width 0.1s linear', borderRight: progress > 0 && progress < 100 ? '2px solid var(--border-color)' : 'none' }} />
    </div>
  );
}

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/cyzus',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
  },
  {
    label: 'X / Twitter',
    href: 'https://twitter.com/YizhouChi',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=yrTAyfQAAAAJ&hl',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
  },
];

export default function Layout() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const location = useLocation();
  const isPost = location.pathname.startsWith('/blog/');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      {isPost && <ScrollProgressBar />}

      {/* Header */}
      <header className="site-header" style={{
        borderBottom: 'var(--border-width) solid var(--border-color)',
        backgroundColor: 'var(--card-bg)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 900, textDecoration: 'none', color: 'var(--text-color)', fontFamily: "'Fira Code', monospace" }}>
          ■ YIZHOU CHI ■
        </Link>
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            to="/"
            style={{
              padding: '0.4rem 0.8rem',
              fontSize: '1.05rem',
              fontWeight: 700,
              textDecoration: 'none',
              fontFamily: "'Fira Code', monospace",
              color: location.pathname === '/' ? '#000' : 'var(--text-color)',
              backgroundColor: location.pathname === '/' ? 'var(--accent-yellow)' : 'transparent',
              border: location.pathname === '/' ? '2px solid var(--border-color)' : '2px solid transparent',
              boxShadow: location.pathname === '/' ? '2px 2px 0px var(--shadow-color)' : 'none',
              transition: 'all 0.1s ease',
            }}
          >
            /home
          </Link>
          <Link
            to="/blog"
            style={{
              padding: '0.4rem 0.8rem',
              fontSize: '1.05rem',
              fontWeight: 700,
              textDecoration: 'none',
              fontFamily: "'Fira Code', monospace",
              color: location.pathname.startsWith('/blog') ? '#000' : 'var(--text-color)',
              backgroundColor: location.pathname.startsWith('/blog') ? 'var(--accent-yellow)' : 'transparent',
              border: location.pathname.startsWith('/blog') ? '2px solid var(--border-color)' : '2px solid transparent',
              boxShadow: location.pathname.startsWith('/blog') ? '2px 2px 0px var(--shadow-color)' : 'none',
              transition: 'all 0.1s ease',
            }}
          >
            /blog
          </Link>

          <div style={{ width: '2px', height: '24px', backgroundColor: 'var(--border-color)', margin: '0 0.5rem', opacity: 0.3 }} />

          <button
            onClick={() => setIsDark(!isDark)}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-color)',
              cursor: 'pointer',
              opacity: 0.8,
            }}
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
          </button>
        </nav>
      </header>

      <div className="container layout-wrapper" style={{ flex: 1, display: 'flex', width: '100%', maxWidth: '1400px', gap: '2rem' }}>
        {/* Sidebar */}
        <aside className="sidebar" style={{
          width: '280px',
          flexShrink: 0,
          border: 'var(--border-width) solid var(--border-color)',
          backgroundColor: 'var(--card-bg)',
          padding: '0',
          height: 'fit-content',
          boxShadow: 'var(--shadow-hard)',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: '100px',
          overflow: 'hidden',
        }}>
          {/* Avatar */}
          <div className="sidebar-avatar" style={{ width: '100%', aspectRatio: '1/1', borderBottom: 'var(--border-width) solid var(--border-color)', backgroundColor: '#87CEEB', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="/img/bg-me.jpeg"
              alt="EVA Angel"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>

          {/* Name + Tagline */}
          <div className="sidebar-identity" style={{ padding: '1.5rem 1.5rem 0' }}>
            <h3 style={{ fontSize: '1.3rem', fontFamily: "'Fira Code', monospace", marginBottom: '0.75rem' }}>{'> Yizhou_Chi'}</h3>
            <p style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-color)', opacity: 0.75, lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Building AI that reasons about the world.
            </p>
          </div>

          {/* Mobile-only vertical divider */}
          <div className="sidebar-vdivider" />

          {/* Divider */}
          <div className="sidebar-divider" style={{ height: 'var(--border-width)', backgroundColor: 'var(--border-color)', margin: '0 1.5rem' }} />

          {/* Social Links */}
          <div className="sidebar-social" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontFamily: "'Fira Code', monospace",
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--text-color)',
                  textDecoration: 'none',
                  border: '2px solid var(--border-color)',
                  padding: '0.4rem 0.75rem',
                  backgroundColor: 'var(--card-bg)',
                  boxShadow: '3px 3px 0px 0px var(--shadow-color)',
                  transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out, background-color 0.1s ease-out',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translate(2px, 2px)';
                  e.currentTarget.style.boxShadow = '1px 1px 0px 0px var(--shadow-color)';
                  e.currentTarget.style.backgroundColor = 'var(--accent-yellow)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '3px 3px 0px 0px var(--shadow-color)';
                  e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', opacity: 0.8 }}>{icon}</span>
                <span className="sidebar-social-label">{label}</span>
              </a>
            ))}
          </div>

          {/* Mobile-only vertical divider */}
          <div className="sidebar-vdivider" />

          {/* Currently Block */}
          <div className="sidebar-currently" style={{ margin: '1.25rem 1.5rem 1.5rem', padding: '0.75rem 1rem', backgroundColor: 'var(--accent-yellow)', border: '2px solid var(--border-color)', boxShadow: '3px 3px 0px 0px var(--shadow-color)' }}>
            <p style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', opacity: 0.6, color: '#000' }}>Currently</p>
            <p style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.8rem', lineHeight: 1.6, color: '#000', fontWeight: 600 }}>
              {'> PhD @ Cambridge'}<br />
              {'> Advisor: A. Vlachos'}<br />
              {'> Topic: Agents, World Models'}
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main style={{ flex: 1, minWidth: 0, paddingBottom: '4rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
