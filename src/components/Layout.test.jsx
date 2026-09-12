import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { it, expect, vi } from 'vitest';
import Layout from './Layout';

it('keeps section and skip links on the current hash-router page', async () => {
  window.location.hash = '#/';
  const originalScroll = Element.prototype.scrollIntoView;
  const scroll = vi.fn();
  Element.prototype.scrollIntoView = scroll;
  const top = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  const user = userEvent.setup();
  try {
    render(<HashRouter><Routes><Route element={<Layout />}><Route path="/" element={<><Link to="/#about">About</Link><section id="about">Biography</section></>} /></Route></Routes></HashRouter>);
    await user.click(screen.getByRole('link', { name: 'About', exact: true }));
    expect(window.location.hash).toBe('#/#about');
    expect(screen.getByText('Biography')).toHaveFocus();
    expect(scroll).toHaveBeenCalled();
    await user.click(screen.getByRole('link', { name: 'Skip to content' }));
    expect(window.location.hash).toBe('#/#main-content');
    expect(screen.getByRole('main')).toHaveFocus();
  } finally {
    Element.prototype.scrollIntoView = originalScroll;
    top.mockRestore();
    window.location.hash = '#/';
  }
});

it('defaults to the system theme and supports returning to auto', async () => {
  const listeners = new Set();
  const media = { matches: true, addEventListener: (_, listener) => listeners.add(listener), removeEventListener: (_, listener) => listeners.delete(listener) };
  vi.stubGlobal('matchMedia', () => media);
  const top = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  const user = userEvent.setup();
  const view = render(<HashRouter><Layout /></HashRouter>);
  try {
    expect(document.documentElement).toHaveClass('dark');
    act(() => { media.matches = false; listeners.forEach(listener => listener(media)); });
    expect(document.documentElement).not.toHaveClass('dark');
    await user.click(screen.getByRole('button', { name: 'Theme: auto. Switch to light' }));
    act(() => { media.matches = true; listeners.forEach(listener => listener(media)); });
    expect(document.documentElement).not.toHaveClass('dark');
    await user.click(screen.getByRole('button', { name: 'Theme: light. Switch to dark' }));
    expect(document.documentElement).toHaveClass('dark');
    await user.click(screen.getByRole('button', { name: 'Theme: dark. Switch to auto' }));
    act(() => { media.matches = false; listeners.forEach(listener => listener(media)); });
    expect(document.documentElement).not.toHaveClass('dark');
  } finally {
    view.unmount();
    top.mockRestore();
    vi.unstubAllGlobals();
  }
});
