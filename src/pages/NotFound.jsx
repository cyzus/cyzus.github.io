import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="editorial-heading missing-page">
      <span className="eyebrow">404 / Outside the archive</span>
      <h1>Nothing <em>here.</em></h1>
      <p>The page you’re looking for may have moved, or the address may be incorrect.</p>
      <Link className="text-link" to="/">Return to the index <span aria-hidden="true">↗</span></Link>
    </section>
  );
}
