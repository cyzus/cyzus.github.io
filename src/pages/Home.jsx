import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import DitherField from '../components/DitherField';
import rehypeRaw from 'rehype-raw';
import { publications, projects } from '../data/portfolio';
import enContent from '../about/en.md?raw';
import zhContent from '../about/zh.md?raw';

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
  return (
    <>
      <section className="opening" aria-labelledby="site-title">
        <DitherField />
        <div className="opening-meta"><span>Researcher / Builder</span><span>Cambridge, UK</span></div>
        <h1 id="site-title">Yizhou <em>Chi.</em></h1>
        <div className="opening-grid">
          <div className="opening-copy">
            <span className="eyebrow">On minds & machines</span>
            <h2>Building AI that<br />reasons about<br /><em>the world.</em></h2>
            <p>I'm a PhD candidate in Computer Science at the University of Cambridge, building interactive language agents that collaborate safely and effectively with people.</p>
            <Link className="text-link" to="/#publications">Explore the research <span>↓</span></Link>
            <div className="social-links" aria-label="Social links">
              <a href="https://github.com/cyzus" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://scholar.google.com/citations?user=yrTAyfQAAAAJ&hl" target="_blank" rel="noreferrer">Scholar ↗</a>
              <a href="https://twitter.com/YizhouChi" target="_blank" rel="noreferrer">X / Twitter ↗</a>
              <a href="mailto:yc697@cam.ac.uk">Email ↗</a>
            </div>
          </div>
          <figure className="angel-plate">
            <div className="plate-top"><span>I / THE OBSERVER</span><span aria-hidden="true">✧</span></div>
            <div className="plate-image"><img src="/img/bg-me.jpeg" alt="A geometric EVA Angel suspended against the sky" /><span className="plate-reticle" aria-hidden="true">+</span></div>
            <figcaption><span>Between mind and world</span><span aria-hidden="true">I</span></figcaption>
          </figure>
        </div>
        <nav className="section-index" aria-label="On this page"><Link to="/#about"><span>01</span> About</Link><Link to="/#publications"><span>02</span> Research</Link><Link to="/#projects"><span>03</span> Projects</Link></nav>
      </section>
      <section id="about" className="archive-section about-section">
        <div className="section-heading"><span className="eyebrow">01 / The person</span><h2>A little<br /><em>background.</em></h2><div className="language-control" aria-label="Biography language"><button aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button><span>/</span><button aria-pressed={lang === 'zh'} onClick={() => setLang('zh')}>中文</button></div></div>
        <div key={lang} className="markdown-content biography language-reveal" lang={lang}><ReactMarkdown rehypePlugins={[rehypeRaw]}>{lang === 'en' ? enContent : zhContent}</ReactMarkdown></div>
      </section>
      <section id="publications" className="archive-section">
        <div className="section-heading wide-heading"><div><span className="eyebrow">02 / Inquiries</span><h2>Selected <em>research.</em></h2></div><span className="section-count">{String(publications.length).padStart(2, '0')} works</span></div>
        <div className="publication-list">{publications.map((pub, index) => <article className="publication" key={pub.title}><div className="publication-meta"><span className="work-number">{String(index + 1).padStart(2, '0')}</span><span>{pub.tags[0]}</span></div><div className="publication-copy"><h3>{pub.title}</h3><AuthorList authors={pub.authors} /><p>{pub.description}</p><div className="work-links">{pub.links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div></div></article>)}</div>
      </section>
      <section id="projects" className="archive-section">
        <div className="section-heading wide-heading"><div><span className="eyebrow">03 / Experiments</span><h2>Things <em>I've built.</em></h2></div><span aria-hidden="true" className="section-symbol">✳</span></div>
        <div className="project-list">{projects.map((project, index) => <article className="project" key={project.title}><span className="eyebrow">{String(index + 1).padStart(2, '0')} / {project.isDaemon ? 'Active project' : project.status}</span><h3>{project.title}</h3><p>{project.description}</p><div className="work-links">{project.links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div></article>)}</div>
      </section>
    </>
  );
}
