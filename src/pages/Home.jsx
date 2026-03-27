import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import BrutalSwitch from '../components/BrutalSwitch';
import rehypeRaw from 'rehype-raw';
import { publications, projects } from '../data/portfolio';

import enContent from '../about/en.md?raw';
import zhContent from '../about/zh.md?raw';

const VENUE_KEYWORDS = ['2024', '2023', '2022', '2021', '2020', '2019', 'NAACL', 'ACL', 'EMNLP', 'NeurIPS', 'ICML', 'ICLR', 'IEEE', 'AAAI'];
const isVenueTag = (tag) => VENUE_KEYWORDS.some(k => tag.includes(k));

// ── Brutalist animation variants: snappy, tween, no bounce ──
const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'tween', duration: 0.28, ease: 'easeOut' },
  },
};

// Shared interactive card motion props (brutalist press)
const cardMotionProps = {
  whileHover: { x: 4, y: 4, transition: { type: 'tween', duration: 0.08 } },
  whileTap:   { x: 6, y: 6, transition: { type: 'tween', duration: 0.05 } },
};

function AuthorList({ authors }) {
  const [expanded, setExpanded] = useState(false);
  const hasMany = authors.length > 4;

  return (
    <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.7 }}>
      <strong>Authors: </strong>
      {hasMany && !expanded ? (
        <>
          {authors.slice(0, 1).map((a, i) => (
            <span key={i} style={{ fontWeight: a === 'Yizhou Chi' ? 800 : 'normal', textDecoration: a === 'Yizhou Chi' ? 'underline' : 'none' }}>{a}</span>
          ))}
          <span style={{ opacity: 0.6 }}>, et al. </span>
          <button onClick={() => setExpanded(true)} style={{ fontFamily: 'inherit', fontSize: '0.78rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', cursor: 'pointer', padding: '0 0.4rem' }}>
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
            <> <button onClick={() => setExpanded(false)} style={{ fontFamily: 'inherit', fontSize: '0.78rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', cursor: 'pointer', padding: '0 0.4rem' }}>
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ type: 'tween', duration: 0.15 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      {/* Hero Card — animate on mount (already in viewport) */}
      <motion.div
        className="brutal-card"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'tween', duration: 0.28, ease: 'easeOut', delay: 0.05 }}
        style={{ padding: '3rem', backgroundColor: 'var(--card-bg)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
          <BrutalSwitch
            items={[
              { label: 'EN', value: 'en' },
              { label: '中文', value: 'zh' }
            ]}
            activeValue={lang}
            onChange={setLang}
            layoutId="lang-active-bg"
            minWidth="60px"
            style={{ boxShadow: '4px 4px 0px var(--shadow-color)' }}
          />
        </div>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Hello, I'm Yizhou.
          <span style={{ display: 'inline-block', width: '0.08em', height: '1em', backgroundColor: 'var(--text-color)', marginLeft: '0.15em', verticalAlign: 'text-bottom', animation: 'blink 1s step-end infinite' }} />
        </h1>
        <p style={{ fontSize: '1.2rem', fontWeight: 600, maxWidth: '600px', marginBottom: '1.5rem' }}>
          I'm a PhD candidate in Computer Science at the University of Cambridge, building interactive language agents that collaborate safely and effectively with people.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="brutal-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}>$ cat about_me.md</button>
          <button onClick={() => document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' })} className="brutal-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', backgroundColor: 'var(--accent-yellow)', color: '#000' }}>$ cd ./publications</button>
          <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="brutal-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}>$ ls -l projects/</button>
        </div>
      </motion.div>

      {/* Bio Section — whileInView stagger */}
      <motion.div
        id="about"
        style={{ marginBottom: '2rem', scrollMarginTop: '100px' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={sectionVariants}
      >
        <motion.h2 className="terminal-header" variants={itemVariants}>[0] About_Me.md</motion.h2>
        <motion.div className="brutal-card" style={{ padding: '3rem', backgroundColor: 'var(--card-bg)' }} variants={itemVariants}>
          <div style={{ fontSize: '1.1rem', lineHeight: 1.8 }} className="markdown-content">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
          </div>
        </motion.div>
      </motion.div>

      {/* Publications Section — whileInView stagger + card press */}
      <motion.div
        id="publications"
        style={{ marginBottom: '2rem', scrollMarginTop: '100px' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={sectionVariants}
      >
        <motion.h2 className="terminal-header" variants={itemVariants}>[1] Selected_Publications.bib</motion.h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {publications.map((pub, idx) => (
            <motion.div
              key={idx}
              className="brutal-card interactive"
              style={{ padding: '2rem', backgroundColor: 'var(--card-bg)' }}
              variants={itemVariants}
              {...cardMotionProps}
            >
              <div style={{ marginBottom: '1rem' }}>
                {pub.tags.map(tag => (
                  <span key={tag} className="tag" style={isVenueTag(tag) ? { backgroundColor: 'var(--accent-yellow)', color: '#000', border: '2px solid var(--border-color)' } : {}}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textTransform: 'none' }}>{pub.title}</h3>
              <AuthorList authors={pub.authors} />
              <p style={{ marginBottom: '1.5rem', fontWeight: 500 }}>{pub.description}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {pub.links.map(link => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="brutal-btn-sm" style={{ backgroundColor: 'var(--card-bg)' }}>{link.label}</a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Projects Section — whileInView stagger + card press */}
      <motion.div
        id="projects"
        style={{ marginBottom: '2rem', scrollMarginTop: '100px' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={sectionVariants}
      >
        <motion.h2 className="terminal-header" variants={itemVariants}>[2] Side_Quests.sh</motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {projects.map((proj, idx) => (
            <motion.div
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
              variants={itemVariants}
              {...cardMotionProps}
            >
              <h3 style={{ textTransform: 'none', marginBottom: '1rem' }}>{proj.title}</h3>
              <p style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.8rem', backgroundColor: 'var(--accent-yellow)', color: '#000', padding: '0.3rem 0.6rem', border: '2px solid var(--border-color)', marginBottom: '1rem', width: 'fit-content', fontWeight: 700 }}>
                {proj.status}
              </p>
              <p style={{ flex: 1, marginBottom: '1.5rem', fontWeight: 500 }}>{proj.description}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {proj.links.map(link => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="brutal-btn-sm" style={{ backgroundColor: 'var(--card-bg)' }}>{link.label}</a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
}
