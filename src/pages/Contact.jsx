import React from 'react';
import { Link } from 'react-router-dom';

const profiles = [
  ['GitHub', 'Code & projects', 'https://github.com/cyzus'],
  ['Google Scholar', 'Publications', 'https://scholar.google.com/citations?user=yrTAyfQAAAAJ&hl=en'],
  ['X / Twitter', 'Notes & conversation', 'https://twitter.com/YizhouChi'],
];

export default function Contact() {
  return (
    <section aria-labelledby="contact-title">
      <header className="editorial-heading">
        <span className="eyebrow">Correspondence</span>
        <h1 id="contact-title">Get <em>in touch.</em></h1>
        <p>I’m interested in how agents reason, work with people, and become systems we can understand and control. If that connects with what you’re working on, I’d like to hear from you.</p>
      </header>
      <div className="contact-topics">
        <section className="contact-topic">
          <span className="eyebrow">01 / Suzent</span>
          <div>
            <h2>Agents we <em>own.</em></h2>
            <p>I’m building Suzent, an open-source AI agent whose memory, tools, and workspace stay under your control. I’d love to hear how you’re using it, what’s missing, or what you’d like to build together—especially around persistent memory, model flexibility, and permissions.</p>
            <div className="work-links"><a href="https://suzent.com" target="_blank" rel="noreferrer">Explore Suzent ↗</a><a href="https://github.com/cyzus/suzent" target="_blank" rel="noreferrer">Contribute on GitHub ↗</a></div>
          </div>
        </section>
        <section className="contact-topic">
          <span className="eyebrow">02 / Research</span>
          <div>
            <h2>Reasoning <em>together.</em></h2>
            <p>My research at Cambridge explores language agents that clarify intent, revise their reasoning, and collaborate with people over time. I’m happy to discuss research ideas, exchange feedback on papers, or explore collaborations on agent reasoning, world models, and evaluation.</p>
            <div className="work-links"><Link to="/#publications">Selected research ↗</Link></div>
          </div>
        </section>
        <section className="contact-topic">
          <span className="eyebrow">03 / Conversations</span>
          <div>
            <h2>Something <em>else?</em></h2>
            <p>A question about an essay, an experiment you’re trying, or an idea that doesn’t fit either category is welcome too. A little context about what you’re working on is a good place to start.</p>
          </div>
        </section>
      </div>
      <div className="contact-email">
        <span className="eyebrow">Email</span>
        <a href="mailto:yc697@cam.ac.uk">Email me <span aria-hidden="true">↗</span></a>
        <p>University of Cambridge · Cambridge, UK</p>
      </div>
      <div className="contact-profiles">
        <h2>Find me <em>elsewhere.</em></h2>
        {profiles.map(([name, description, url]) => <a className="contact-profile" href={url} target="_blank" rel="noreferrer" key={name}><span>{name}</span><span className="profile-description">{description}</span><span aria-hidden="true">↗</span></a>)}
      </div>
    </section>
  );
}
