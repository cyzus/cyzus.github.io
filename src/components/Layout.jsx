import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const [theme, setTheme] = useState('auto');
  const [systemDark, setSystemDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);
  const isDark = theme === 'auto' ? systemDark : theme === 'dark';
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!media) return;
    const update = event => setSystemDark(event.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#111110' : '#f3f3ef');
  }, [isDark]);
  useLayoutEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'instant' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
  useEffect(() => {
    if (!window.IntersectionObserver || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('ink-reveal');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.section-heading, .biography, .publication, .project, .essay-row, .contact-profile').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);
  return (
    <div className="archive-shell">
      <Link className="skip-link" to={`${pathname}#main-content`}>Skip to content</Link>
      <header className="archive-header">
        <Link className="wordmark" to="/" aria-label="chiyz — Greek chi followed by yz — Yizhou Chi home" title="χ is the Greek letter chi">
          <span className="wordmark-chi-stack" aria-hidden="true"><span className="wordmark-chi">χ</span><span className="wordmark-caption">chi</span></span>
          <span className="wordmark-yz" aria-hidden="true">yz</span>
        </Link>
        <span className="header-note">A personal archive</span>
        <nav aria-label="Main navigation">
          <Link to="/" aria-current={pathname === '/' ? 'page' : undefined}>Index</Link>
          <Link to="/blog" aria-current={pathname.startsWith('/blog') ? 'page' : undefined}>Writing</Link>
          <Link to="/contact" aria-current={pathname === '/contact' ? 'page' : undefined}>Contact</Link>
          <button className="theme-toggle" onClick={() => setTheme(theme === 'auto' ? 'light' : theme === 'light' ? 'dark' : 'auto')} aria-label={`Theme: ${theme}. Switch to ${theme === 'auto' ? 'light' : theme === 'light' ? 'dark' : 'auto'}`} title={`Theme: ${theme}`}><span aria-hidden="true">{theme === 'auto' ? '◒' : isDark ? '◐' : '◑'}</span><span className="theme-label">{theme}</span></button>
        </nav>
      </header>
      <main key={pathname} id="main-content" className={pathname === '/' ? 'home-main' : 'reading-main'}><Outlet /></main>
      <footer className="archive-footer"><span>Yizhou Chi · Cambridge</span><Link to="/contact">Get in touch ↗</Link><span aria-hidden="true">✳</span></footer>
    </div>
  );
}
