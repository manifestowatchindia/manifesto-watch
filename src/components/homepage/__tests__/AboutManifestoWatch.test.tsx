import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AboutManifestoWatch } from '../AboutManifestoWatch';

describe('AboutManifestoWatch', () => {
  it('renders without crashing', () => {
    render(<AboutManifestoWatch />);
    expect(screen.getByText(/About ManifestoWatch/i)).toBeInTheDocument();
  });

  it('displays mission statement', () => {
    render(<AboutManifestoWatch />);
    expect(screen.getByText(/Data, not opinions/i)).toBeInTheDocument();
  });

  it('renders default trust indicators', () => {
    render(<AboutManifestoWatch />);
    
    expect(screen.getByText(/Non-Partisan/i)).toBeInTheDocument();
    expect(screen.getByText(/Data-Driven/i)).toBeInTheDocument();
    expect(screen.getByText(/Open & Transparent/i)).toBeInTheDocument();
    expect(screen.getByText(/Made in India/i)).toBeInTheDocument();
  });

  it('renders CTA links', () => {
    render(<AboutManifestoWatch />);
    
    // Note: "Learn More About Us" link temporarily removed - to be discussed with PM
    // expect(screen.getByTestId('learn-more-link')).toBeInTheDocument();
    expect(screen.getByTestId('methodology-link')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<AboutManifestoWatch />);
    
    // Text is inside a paragraph
    expect(screen.getByText(/India's first comprehensive platform/i)).toBeInTheDocument();
  });

  it('renders with custom trust indicators', () => {
    const customIndicators = [
      { icon: '🔒', title: 'Secure', description: 'Your data is safe' },
      { icon: '⚡', title: 'Fast', description: 'Lightning quick' },
    ];
    
    render(<AboutManifestoWatch trustIndicators={customIndicators} />);
    
    expect(screen.getByText('Secure')).toBeInTheDocument();
    expect(screen.getByText('Fast')).toBeInTheDocument();
  });

  it('renders with custom mission statement', () => {
    render(<AboutManifestoWatch missionStatement="Custom Mission" />);
    
    // Mission is rendered inside quotes
    expect(screen.getByTestId('mission-statement')).toHaveTextContent('Custom Mission');
  });

  it('trust indicator cards render', () => {
    render(<AboutManifestoWatch />);
    
    // Each trust indicator should be rendered
    expect(screen.getByText('Non-Partisan')).toBeInTheDocument();
    expect(screen.getByText('Data-Driven')).toBeInTheDocument();
    expect(screen.getByText('Open & Transparent')).toBeInTheDocument();
    expect(screen.getByText('Made in India')).toBeInTheDocument();
  });

  it('has proper section structure', () => {
    render(<AboutManifestoWatch />);
    
    const section = screen.getByTestId('about-manifesto-watch');
    expect(section).toBeInTheDocument();
  });
});
