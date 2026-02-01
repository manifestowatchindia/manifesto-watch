import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SocialLinks } from '../SocialLinks';

describe('SocialLinks', () => {
  it('renders without crashing', () => {
    render(<SocialLinks />);
    expect(screen.getByTestId('social-links')).toBeInTheDocument();
  });

  it('renders default social links (4 links)', () => {
    render(<SocialLinks />);
    
    // Check that default links are rendered (Twitter, Instagram, YouTube, LinkedIn)
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(4);
  });

  it('renders Twitter link with correct href', () => {
    render(<SocialLinks />);
    
    const twitterLink = screen.getByRole('link', { name: /twitter/i });
    expect(twitterLink).toHaveAttribute('href', expect.stringContaining('twitter.com'));
  });

  it('renders Instagram link with correct href', () => {
    render(<SocialLinks />);
    
    const instagramLink = screen.getByRole('link', { name: /instagram/i });
    expect(instagramLink).toHaveAttribute('href', expect.stringContaining('instagram.com'));
  });

  it('renders YouTube link with correct href', () => {
    render(<SocialLinks />);
    
    const youtubeLink = screen.getByRole('link', { name: /youtube/i });
    expect(youtubeLink).toHaveAttribute('href', expect.stringContaining('youtube.com'));
  });

  it('renders LinkedIn link with correct href', () => {
    render(<SocialLinks />);
    
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
  });

  it('renders custom social links', () => {
    const customLinks = [
      { id: 'facebook', name: 'Facebook', url: 'https://facebook.com/test', icon: '📘', color: '#1877F2' },
      { id: 'tiktok', name: 'TikTok', url: 'https://tiktok.com/test', icon: '🎵', color: '#000000' },
    ];
    
    render(<SocialLinks links={customLinks} />);
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(2);
    
    expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /tiktok/i })).toBeInTheDocument();
  });

  it('opens links in new tab', () => {
    render(<SocialLinks />);
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });
  });

  it('renders with small size', () => {
    render(<SocialLinks size="small" />);
    
    // Just verify it renders - size is applied via inline styles
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(4);
  });

  it('renders with large size', () => {
    render(<SocialLinks size="large" />);
    
    // Just verify it renders - size is applied via inline styles
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(4);
  });

  it('has accessible link names', () => {
    render(<SocialLinks />);
    
    // Each link should have accessible name from aria-label
    const twitterLink = screen.getByRole('link', { name: /follow us on twitter/i });
    expect(twitterLink).toBeInTheDocument();
  });

  it('renders with showLabels', () => {
    render(<SocialLinks showLabels={true} />);
    
    // When showLabels is true, text labels should appear
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
  });
});
