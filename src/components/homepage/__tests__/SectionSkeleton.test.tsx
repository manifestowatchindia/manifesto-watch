import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SectionSkeleton } from '../SectionSkeleton';

describe('SectionSkeleton', () => {
  it('renders without crashing', () => {
    render(<SectionSkeleton variant="default" />);
    expect(screen.getByTestId('section-skeleton-default')).toBeInTheDocument();
  });

  it('renders hero skeleton variant', () => {
    render(<SectionSkeleton variant="hero" />);
    expect(screen.getByTestId('section-skeleton-hero')).toBeInTheDocument();
  });

  it('renders tracker skeleton variant', () => {
    render(<SectionSkeleton variant="tracker" />);
    expect(screen.getByTestId('section-skeleton-tracker')).toBeInTheDocument();
  });

  it('renders cards skeleton variant', () => {
    render(<SectionSkeleton variant="cards" />);
    expect(screen.getByTestId('section-skeleton-cards')).toBeInTheDocument();
  });

  it('renders grid skeleton variant', () => {
    render(<SectionSkeleton variant="grid" />);
    expect(screen.getByTestId('section-skeleton-grid')).toBeInTheDocument();
  });

  it('renders map skeleton variant', () => {
    render(<SectionSkeleton variant="map" />);
    expect(screen.getByTestId('section-skeleton-map')).toBeInTheDocument();
  });

  it('renders form skeleton variant', () => {
    render(<SectionSkeleton variant="form" />);
    expect(screen.getByTestId('section-skeleton-form')).toBeInTheDocument();
  });

  it('has proper aria attributes for accessibility', () => {
    render(<SectionSkeleton variant="default" />);
    
    const skeleton = screen.getByRole('status');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('aria-label', 'Loading section');
  });

  it('accepts custom title for accessibility', () => {
    render(<SectionSkeleton variant="hero" title="Loading hero section" />);
    
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading hero section');
  });

  it('uses default variant when not specified', () => {
    render(<SectionSkeleton />);
    expect(screen.getByTestId('section-skeleton-default')).toBeInTheDocument();
  });
});
