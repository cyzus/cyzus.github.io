import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Full-bleed background image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/img/404-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        filter: 'brightness(0.55)',
        zIndex: 0,
      }} />

      {/* Grain overlay for Neo-Brutalist texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
        zIndex: 1,
      }} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'left',
          maxWidth: '600px',
          width: '100%',
          color: '#e5e5e5',
          textShadow: '0 4px 8px rgba(0,0,0,0.8)',
        }}
      >
        {/* Terminal-style label */}
        <p style={{
          fontFamily: "'Fira Code', monospace",
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#facc15',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: '1.5rem',
          opacity: 0.9,
        }}>
          {'> ERROR_CODE: 404'}
        </p>

        <h1 style={{
          fontFamily: "'Fira Code', monospace",
          fontSize: 'clamp(3.5rem, 12vw, 6rem)',
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: '0.5rem',
          color: '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '-0.03em',
        }}>
          404
        </h1>

        <h2 style={{
          fontFamily: "'Fira Code', monospace",
          fontSize: '1.1rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '1.5rem',
          color: '#facc15',
        }}>
          Page Not Found
        </h2>

        <p style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '0.95rem',
          lineHeight: 1.8,
          marginBottom: '2.5rem',
          color: '#c0c0c0',
          fontWeight: 500,
        }}>
          この先は何もない。<br />
          Whatever you were looking for isn't here — or never existed.
        </p>

        <Link
          to="/"
          className="brutal-btn"
          style={{
            display: 'inline-block',
            textDecoration: 'none',
            textShadow: 'none',
          }}
        >
          {'$ cd ~/home'}
        </Link>
      </motion.div>
    </div>
  );
}
