import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TrustIndicatorCard } from '../TrustIndicatorCard';

describe('TrustIndicatorCard', () => {
  const defaultIndicator = {
    icon: '🎯',
    title: 'Test Title',
    description: 'Test Description',
  };

  it('renders without crashing', () => {
    render(<TrustIndicatorCard indicator={defaultIndicator} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('displays icon', () => {
    render(<TrustIndicatorCard indicator={defaultIndicator} />);
    expect(screen.getByText('🎯')).toBeInTheDocument();
  });

  it('displays title', () => {
    render(<TrustIndicatorCard indicator={defaultIndicator} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('displays description', () => {
    render(<TrustIndicatorCard indicator={defaultIndicator} />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders with test id', () => {
    render(<TrustIndicatorCard indicator={defaultIndicator} />);
    expect(screen.getByTestId('trust-indicator-test-title')).toBeInTheDocument();
  });

  it('accepts custom test id', () => {
    render(<TrustIndicatorCard indicator={defaultIndicator} testId="custom-test-id" />);
    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });

  it('renders with different icons', () => {
    const icons = ['✅', '📊', '🔍', '🇮🇳'];
    
    icons.forEach(icon => {
      const { unmount } = render(
        <TrustIndicatorCard indicator={{ ...defaultIndicator, icon }} />
      );
      expect(screen.getByText(icon)).toBeInTheDocument();
      unmount();
    });
  });

  it('handles long descriptions', () => {
    const longDescription = 'This is a very long description that should still render properly without breaking the layout of the card component.';
    
    render(<TrustIndicatorCard indicator={{ ...defaultIndicator, description: longDescription }} />);
    expect(screen.getByText(longDescription)).toBeInTheDocument();
  });

  it('has proper heading structure', () => {
    render(<TrustIndicatorCard indicator={defaultIndicator} />);
    
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Test Title');
  });

  it('icon is hidden from screen readers', () => {
    const { container } = render(<TrustIndicatorCard indicator={defaultIndicator} />);
    
    const iconDiv = container.querySelector('.indicator-icon');
    expect(iconDiv).toHaveAttribute('aria-hidden', 'true');
  });
});
