import React, { useState, useEffect } from 'react';
import { Link, useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BrutalSwitch from './BrutalSwitch';
import Sidebar from './Sidebar';

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

export default function Layout() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const location = useLocation();
  const currentOutlet = useOutlet();
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

      {/* Header — slides down on mount */}
      <motion.header
        className="site-header"
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
        style={{
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
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <BrutalSwitch
            items={[
              { label: '/home', value: '/', path: '/', isActive: location.pathname === '/' },
              { label: '/blog', value: '/blog', path: '/blog', isActive: location.pathname.startsWith('/blog') }
            ]}
            activeValue={location.pathname}
            layoutId="nav-active-bg"
            minWidth="95px"
          />

          <div style={{ width: '2px', height: '24px', backgroundColor: 'var(--border-color)', margin: '0 0.25rem', opacity: 0.3 }} />

          <motion.button
            onClick={() => setIsDark(!isDark)}
            whileTap={{ y: 2 }}
            transition={{ type: 'tween', duration: 0.08 }}
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
            <motion.span
              key={isDark ? 'sun' : 'moon'}
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ type: 'tween', duration: 0.18, ease: 'easeOut' }}
              style={{ display: 'flex' }}
            >
              {isDark ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              )}
            </motion.span>
          </motion.button>
        </nav>
      </motion.header>

      <div className="container layout-wrapper" style={{ flex: 1, display: 'flex', width: '100%', maxWidth: '1400px', gap: '2rem' }}>
        <Sidebar />

        {/* Main Content Area — min-height prevents layout shift during exit */}
        <main style={{ flex: 1, minWidth: 0, paddingBottom: '4rem', display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
          <div style={{ flex: 1 }}>
            <AnimatePresence mode="wait" initial={false}>
              {currentOutlet && React.cloneElement(currentOutlet, { key: location.pathname })}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
