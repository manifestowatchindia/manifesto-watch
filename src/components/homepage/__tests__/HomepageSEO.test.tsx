import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import '@testing-library/jest-dom';
import HomepageSEO from '../HomepageSEO';

// Helper to render with HelmetProvider
const renderWithHelmet = (ui: React.ReactElement) => {
  const helmetContext = {};
  return {
    ...render(
      <HelmetProvider context={helmetContext}>
        {ui}
      </HelmetProvider>
    ),
    helmetContext,
  };
};

describe('HomepageSEO', () => {
  beforeEach(() => {
    // Clear any existing head content
    document.head.innerHTML = '';
  });

  it('renders without crashing', () => {
    expect(() => renderWithHelmet(<HomepageSEO />)).not.toThrow();
  });

  it('renders with default election context', async () => {
    renderWithHelmet(<HomepageSEO />);
    
    await waitFor(() => {
      const title = document.querySelector('title');
      expect(title?.textContent).toContain('ManifestoWatch');
      expect(title?.textContent).toContain('Kerala, Tamil Nadu, West Bengal Elections 2026');
    });
  });

  it('renders with custom election context', async () => {
    renderWithHelmet(<HomepageSEO electionContext="Bihar Elections 2025" />);
    
    await waitFor(() => {
      const title = document.querySelector('title');
      expect(title?.textContent).toContain('Bihar Elections 2025');
    });
  });

  it('includes meta description', async () => {
    renderWithHelmet(<HomepageSEO />);
    
    await waitFor(() => {
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription).not.toBeNull();
      expect(metaDescription?.getAttribute('content')).toContain("India's #1 platform");
    });
  });

  it('includes Open Graph tags', async () => {
    renderWithHelmet(<HomepageSEO />);
    
    await waitFor(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogType = document.querySelector('meta[property="og:type"]');
      const ogUrl = document.querySelector('meta[property="og:url"]');
      
      expect(ogTitle).not.toBeNull();
      expect(ogType?.getAttribute('content')).toBe('website');
      expect(ogUrl?.getAttribute('content')).toBe('https://manifestowatch.in');
    });
  });

  it('includes Twitter Card tags', async () => {
    renderWithHelmet(<HomepageSEO />);
    
    await waitFor(() => {
      const twitterCard = document.querySelector('meta[name="twitter:card"]');
      const twitterSite = document.querySelector('meta[name="twitter:site"]');
      
      expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
      expect(twitterSite?.getAttribute('content')).toBe('@manifestowatch');
    });
  });

  it('includes canonical URL', async () => {
    renderWithHelmet(<HomepageSEO />);
    
    await waitFor(() => {
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical?.getAttribute('href')).toBe('https://manifestowatch.in');
    });
  });

  it('includes structured data scripts', async () => {
    renderWithHelmet(<HomepageSEO />);
    
    await waitFor(() => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBeGreaterThan(0);
      
      // Check for WebSite schema
      const scriptContents = Array.from(scripts).map(s => s.textContent);
      const hasWebSiteSchema = scriptContents.some(content => 
        content && content.includes('"@type":"WebSite"')
      );
      expect(hasWebSiteSchema).toBe(true);
    });
  });

  it('includes robots meta tag', async () => {
    renderWithHelmet(<HomepageSEO />);
    
    await waitFor(() => {
      const robots = document.querySelector('meta[name="robots"]');
      expect(robots?.getAttribute('content')).toContain('index');
      expect(robots?.getAttribute('content')).toContain('follow');
    });
  });
});
