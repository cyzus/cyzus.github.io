import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * A reusable Neo-Brutalist segmented control / slider switch.
 * 
 * @param {Array} items - List of items { label, value, path? }
 * @param {any} activeValue - The value of the currently active item
 * @param {Function} onChange - (optional) callback for when an item is clicked
 * @param {string} layoutId - Animation ID for Framer Motion (must be unique per switch instance)
 * @param {Object} style - (optional) style for the container
 * @param {string} minWidth - (optional) min-width for each item
 */
export default function BrutalSwitch({ items, activeValue, onChange, layoutId, style = {}, minWidth = '80px' }) {
  return (
    <div style={{
      display: 'inline-flex',
      padding: '3px',
      backgroundColor: 'var(--card-bg)',
      border: 'var(--border-width) solid var(--border-color)',
      boxShadow: 'var(--shadow-hard)',
      position: 'relative',
      gap: '3px',
      ...style
    }}>
      {items.map((item) => {
        const isActive = item.value === activeValue;
        
        const itemStyles = {
          padding: '0.4rem 1rem',
          fontSize: '1rem',
          fontWeight: 800,
          textDecoration: 'none',
          fontFamily: "'Fira Code', monospace",
          color: isActive ? '#000' : 'var(--text-color)',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 1,
          transition: 'color 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: minWidth,
        };

        const highlight = isActive && (
          <motion.div
            layoutId={layoutId}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'var(--accent-yellow)',
              border: '2px solid var(--border-color)',
              boxShadow: '2px 2px 0px var(--shadow-color)',
              zIndex: -1,
            }}
            transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
          />
        );

        if (item.path) {
          return (
            <Link key={item.value} to={item.path} style={itemStyles} onClick={() => onChange?.(item.value)}>
              {highlight}
              {item.label}
            </Link>
          );
        }

        return (
          <button key={item.value} onClick={() => onChange?.(item.value)} style={itemStyles}>
            {highlight}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
