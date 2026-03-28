import { motion } from 'framer-motion';

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
  {
    label: 'Email',
    href: 'mailto:yc697@cam.ac.uk',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" ry="2" /><path d="M3 7l9 6 9-6" /></svg>
  },
];

export default function Sidebar() {
  return (
    <aside
      className="sidebar"
      style={{
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
          <motion.a
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
              boxShadow: '4px 4px 0px 0px var(--shadow-color)',
            }}
            whileHover={{ 
              x: 2, 
              y: 2, 
              boxShadow: '2px 2px 0px 0px var(--shadow-color)',
              backgroundColor: 'var(--accent-yellow)',
              color: '#000'
            }}
            whileTap={{ 
              x: 4, 
              y: 4, 
              boxShadow: '0px 0px 0px 0px var(--shadow-color)' 
            }}
            transition={{ type: 'tween', duration: 0.08 }}
          >
            <span style={{ display: 'flex', alignItems: 'center', opacity: 0.8 }}>{icon}</span>
            <span className="sidebar-social-label">{label}</span>
          </motion.a>
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
  );
}
