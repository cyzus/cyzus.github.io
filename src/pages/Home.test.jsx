import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home page', () => {
  it('switches biography language from English to Chinese', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/I am a PhD candidate in Computer Science at the University of Cambridge/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '中文' }));

    expect(screen.getByText(/于 人心 与 机理 之间/)).toBeInTheDocument();
  });
});
