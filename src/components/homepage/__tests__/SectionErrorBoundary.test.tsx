import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SectionErrorBoundary } from '../SectionErrorBoundary';

// Component that throws an error
const ThrowError: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Suppress console.error for these tests
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('SectionErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <SectionErrorBoundary sectionName="test">
        <div>Child content</div>
      </SectionErrorBoundary>
    );
    
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders fallback UI when child throws error', () => {
    render(
      <SectionErrorBoundary sectionName="test-section">
        <ThrowError />
      </SectionErrorBoundary>
    );
    
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it('uses section name in test id', () => {
    render(
      <SectionErrorBoundary sectionName="my-special-section">
        <ThrowError />
      </SectionErrorBoundary>
    );
    
    expect(screen.getByTestId('section-error-my-special-section')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    const customFallback = <div>Custom fallback content</div>;
    
    render(
      <SectionErrorBoundary sectionName="test" fallback={customFallback}>
        <ThrowError />
      </SectionErrorBoundary>
    );
    
    expect(screen.getByText('Custom fallback content')).toBeInTheDocument();
  });

  it('calls onError callback when error occurs', () => {
    const onErrorMock = jest.fn();
    
    render(
      <SectionErrorBoundary sectionName="test" onError={onErrorMock}>
        <ThrowError />
      </SectionErrorBoundary>
    );
    
    expect(onErrorMock).toHaveBeenCalled();
    expect(onErrorMock).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String)
      })
    );
  });

  it('does not render children after error', () => {
    render(
      <SectionErrorBoundary sectionName="test">
        <ThrowError />
      </SectionErrorBoundary>
    );
    
    expect(screen.queryByText('No error')).not.toBeInTheDocument();
  });

  it('renders successfully when child does not throw', () => {
    render(
      <SectionErrorBoundary sectionName="test">
        <ThrowError shouldThrow={false} />
      </SectionErrorBoundary>
    );
    
    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('isolates error to single section', () => {
    render(
      <div>
        <SectionErrorBoundary sectionName="section1">
          <ThrowError />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="section2">
          <div>Section 2 content</div>
        </SectionErrorBoundary>
      </div>
    );
    
    // Section 1 should show error with test id
    expect(screen.getByTestId('section-error-section1')).toBeInTheDocument();
    // Section 2 should still render
    expect(screen.getByText('Section 2 content')).toBeInTheDocument();
  });
});
