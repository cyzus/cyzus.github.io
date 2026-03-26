import React from 'react';

export default function Footer() {
  return (
    <footer className="brutal-card" style={{ marginTop: '4rem', background: '#000', color: '#fff', padding: '2rem', boxShadow: '8px 8px 0px 0px var(--accent-yellow)' }}>
      <h2 style={{ fontFamily: "'Fira Code', monospace", marginBottom: '1rem', borderBottom: '2px solid #333', paddingBottom: '1rem', color: 'var(--accent-yellow)' }}>
        {'> ping yizhou'}
      </h2>
      <p style={{ fontFamily: "'Fira Code', monospace", color: '#aaa', marginBottom: '2rem' }}>Sending packets to inbox...</p>
      
      <p style={{ marginBottom: '0.5rem' }}>
        <span style={{ color: '#fff', fontWeight: 700, fontFamily: "'Fira Code', monospace" }}>Email:</span> <a href="mailto:yc697@cam.ac.uk" style={{ color: 'var(--accent-yellow)', textDecoration: 'underline' }}>yc697@cam.ac.uk</a>
      </p>
      <p style={{ marginBottom: '2rem' }}>
        <span style={{ color: '#fff', fontWeight: 700, fontFamily: "'Fira Code', monospace" }}>Twitter:</span> <a href="https://twitter.com/YizhouChi" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>@YizhouChi</a>
      </p>
      
      <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '3rem', textAlign: 'center', fontFamily: "'Fira Code', monospace" }}>
        /* Designed with minimal neo-brutalism */
      </p>
    </footer>
  );
}
