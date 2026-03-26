import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { publications, projects } from '../data/portfolio';

import enContent from '../about/en.md?raw';
import zhContent from '../about/zh.md?raw';

// Venue keywords that should get yellow highlight treatment
const VENUE_KEYWORDS = ['2024', '2023', '2022', '2021', '2020', '2019', 'NAACL', 'ACL', 'EMNLP', 'NeurIPS', 'ICML', 'ICLR', 'IEEE', 'AAAI'];
const isVenueTag = (tag) => VENUE_KEYWORDS.some(k => tag.includes(k));

function AuthorList({ authors }) {
  const [expanded, setExpanded] = useState(false);
  const LIMIT = 4;
  const hasMany = authors.length > LIMIT;

  const displayed = hasMany && !expanded
    ? [authors[0], '…']
    : authors;

  return (
    <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.7 }}>
      <strong>Authors: </strong>
      {hasMany && !expanded ? (
        <>
          {authors.slice(0, 1).map((a, i) => (
            <span key={i} style={{ fontWeight: a === 'Yizhou Chi' ? 800 : 'normal', textDecoration: a === 'Yizhou Chi' ? 'underline' : 'none' }}>{a}</span>
          ))}
          <span style={{ opacity: 0.6 }}>, et al. </span>
          <button
            onClick={() => setExpanded(true)}
            style={{ fontFamily: 'inherit', fontSize: '0.78rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', cursor: 'pointer', padding: '0 0.4rem' }}
          >
            show all ↓
          </button>
        </>
      ) : (
        <>
          {authors.map((a, i) => (
            <span key={i} style={{ fontWeight: a === 'Yizhou Chi' ? 800 : 'normal', textDecoration: a === 'Yizhou Chi' ? 'underline' : 'none' }}>
              {a}{i < authors.length - 1 ? ', ' : ''}
            </span>
          ))}
          {hasMany && (
            <> <button
              onClick={() => setExpanded(false)}
              style={{ fontFamily: 'inherit', fontSize: '0.78rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', cursor: 'pointer', padding: '0 0.4rem' }}
            >
              collapse ↑
            </button></>
          )}
        </>
      )}
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState('en');
  const content = lang === 'en' ? enContent : zhContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      {/* Hero Card */}
      <div className="brutal-card" style={{ padding: '3rem', backgroundColor: 'var(--card-bg)' }}>
        {/* Language toggle — top right */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <button
            className="brutal-btn"
            onClick={() => setLang('en')}
            style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem', backgroundColor: lang === 'en' ? 'var(--text-color)' : 'var(--card-bg)', color: lang === 'en' ? 'var(--bg-color)' : 'var(--text-color)' }}
          >
            EN
          </button>
          <button
            className="brutal-btn"
            onClick={() => setLang('zh')}
            style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem', backgroundColor: lang === 'zh' ? 'var(--text-color)' : 'var(--card-bg)', color: lang === 'zh' ? 'var(--bg-color)' : 'var(--text-color)' }}
          >
            中文
          </button>
        </div>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Hello, I'm Yizhou.
          <span style={{
            display: 'inline-block',
            width: '0.08em',
            height: '1em',
            backgroundColor: 'var(--text-color)',
            marginLeft: '0.15em',
            verticalAlign: 'text-bottom',
            animation: 'blink 1s step-end infinite',
          }} />
        </h1>
        <p style={{ fontSize: '1.2rem', fontWeight: 600, maxWidth: '600px', marginBottom: '1.5rem' }}>
          I'm a PhD candidate in Computer Science at the University of Cambridge, building interactive language agents that collaborate safely and effectively with people.
        </p>
        {/* Nav buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="brutal-btn"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
          >
            $ cat about_me.md
          </button>
          <button
            onClick={() => document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' })}
            className="brutal-btn"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', backgroundColor: 'var(--accent-yellow)', color: '#000' }}
          >
            $ cd ./publications
          </button>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="brutal-btn"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
          >
            $ ls -l projects/
          </button>
        </div>
      </div>


      {/* Bio Section */}
      <div id="about" style={{ marginBottom: '2rem', scrollMarginTop: '100px' }}>
        <h2 className="terminal-header">[0] About_Me.md</h2>
        <div className="brutal-card" style={{ padding: '3rem', backgroundColor: 'var(--card-bg)' }}>
          <div style={{ fontSize: '1.1rem', lineHeight: 1.8 }} className="markdown-content">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
      
      {/* Publications Section */}
      <div id="publications" style={{ marginBottom: '2rem', scrollMarginTop: '100px' }}>
        <h2 className="terminal-header">[1] Selected_Publications.bib</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {publications.map((pub, idx) => (
            <div key={idx} className="brutal-card interactive" style={{ padding: '2rem', backgroundColor: 'var(--card-bg)' }}>
              <div style={{ marginBottom: '1rem' }}>
                {pub.tags.map(tag => (
                  <span
                    key={tag}
                    className="tag"
                    style={isVenueTag(tag) ? {
                      backgroundColor: 'var(--accent-yellow)',
                      color: '#000',
                      border: '2px solid var(--border-color)',
                    } : {}}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textTransform: 'none' }}>{pub.title}</h3>
              <AuthorList authors={pub.authors} />
              <p style={{ marginBottom: '1.5rem', fontWeight: 500 }}>{pub.description}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {pub.links.map(link => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="brutal-btn-sm" style={{ backgroundColor: 'var(--card-bg)' }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" style={{ marginBottom: '2rem', scrollMarginTop: '100px' }}>
        <h2 className="terminal-header">[2] Side_Quests.sh</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="brutal-card interactive"
              style={{
                padding: '2rem',
                backgroundColor: 'var(--card-bg)',
                color: 'var(--text-color)',
                borderLeft: idx === 0 ? '6px solid var(--accent-yellow)' : 'var(--border-width) solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h3 style={{ textTransform: 'none', marginBottom: '1rem' }}>{proj.title}</h3>
              <p style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: '0.8rem',
                backgroundColor: 'var(--accent-yellow)',
                color: '#000',
                padding: '0.3rem 0.6rem',
                border: '2px solid var(--border-color)',
                marginBottom: '1rem',
                width: 'fit-content',
                fontWeight: 700,
              }}>
                {proj.status}
              </p>
              <p style={{ flex: 1, marginBottom: '1.5rem', fontWeight: 500 }}>{proj.description}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {proj.links.map(link => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="brutal-btn-sm" style={{ backgroundColor: 'var(--card-bg)' }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </motion.div>
  );
}


