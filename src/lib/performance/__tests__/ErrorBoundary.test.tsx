import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorBoundary } from '../ErrorBoundary';

// Test component that throws an error
const ThrowError: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Component that throws on click
const ThrowOnClick: React.FC = () => {
  const [shouldThrow, setShouldThrow] = React.useState(false);
  
  if (shouldThrow) {
    throw new Error('Click error');
  }
  
  return (
    <button onClick={() => setShouldThrow(true)}>
      Throw Error
    </button>
  );
};

describe('ErrorBoundary Component', () => {
  // Suppress console.error for these tests since we expect errors
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Normal Operation', () => {
    it('should render children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <div>Test Content</div>
        </ErrorBoundary>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should render multiple children correctly', () => {
      render(
        <ErrorBoundary>
          <div>First Child</div>
          <div>Second Child</div>
        </ErrorBoundary>
      );

      expect(screen.getByText('First Child')).toBeInTheDocument();
      expect(screen.getByText('Second Child')).toBeInTheDocument();
    });
  });

  describe('Error Catching', () => {
    it('should catch errors from child components', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    });

    it('should display default error UI when error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      // Check for error title
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
      
      // Check for error message
      expect(screen.getByText(/We're sorry for the inconvenience/)).toBeInTheDocument();
      
      // Check for Try Again button
      expect(screen.getByRole('button', { name: /Try Again/i })).toBeInTheDocument();
      
      // Check for Go to Homepage button
      expect(screen.getByRole('button', { name: /Go to Homepage/i })).toBeInTheDocument();
    });

    it('should log error to console', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(console.error).toHaveBeenCalled();
    });

    it('should call onError callback when provided', () => {
      const onError = jest.fn();
      
      render(
        <ErrorBoundary onError={onError}>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(onError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      );
    });
  });

  describe('Custom Fallback', () => {
    it('should render custom fallback UI when provided', () => {
      const customFallback = <div>Custom Error UI</div>;
      
      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom Error UI')).toBeInTheDocument();
      expect(screen.queryByText('Oops! Something went wrong')).not.toBeInTheDocument();
    });

    it('should render custom fallback with complex UI', () => {
      const customFallback = (
        <div>
          <h1>Custom Error</h1>
          <button>Custom Reset</button>
        </div>
      );
      
      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom Error')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Custom Reset/i })).toBeInTheDocument();
    });
  });

  describe('Error Recovery', () => {
    it('should reset error state when Try Again button is clicked', () => {
      let shouldThrow = true;
      
      const DynamicThrow = () => {
        if (shouldThrow) {
          throw new Error('Test error');
        }
        return <div>No error</div>;
      };

      const { rerender } = render(
        <ErrorBoundary>
          <DynamicThrow />
        </ErrorBoundary>
      );

      // Error UI should be visible
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();

      // Click Try Again and update the component to not throw
      shouldThrow = false;
      fireEvent.click(screen.getByRole('button', { name: /Try Again/i }));

      // Re-render with the updated state
      rerender(
        <ErrorBoundary>
          <DynamicThrow />
        </ErrorBoundary>
      );

      // Should show normal content after reset
      expect(screen.getByText('No error')).toBeInTheDocument();
      expect(screen.queryByText('Oops! Something went wrong')).not.toBeInTheDocument();
    });
  });

  describe('UI Elements', () => {
    beforeEach(() => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );
    });

    it('should display error icon', () => {
      const icon = document.querySelector('.fa-exclamation-triangle');
      expect(icon).toBeInTheDocument();
    });

    it('should have Try Again button with icon', () => {
      const button = screen.getByRole('button', { name: /Try Again/i });
      expect(button).toBeInTheDocument();
      expect(button.querySelector('.fa-redo-alt')).toBeInTheDocument();
    });

    it('should have Go to Homepage button with icon', () => {
      const button = screen.getByRole('button', { name: /Go to Homepage/i });
      expect(button).toBeInTheDocument();
      expect(button.querySelector('.fa-home')).toBeInTheDocument();
    });

    it('should have help text', () => {
      expect(screen.getByText(/If this problem persists/)).toBeInTheDocument();
    });
  });

  describe('Tailwind Styling', () => {
    it('should have proper Tailwind classes on error container', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const container = screen.getByText('Oops! Something went wrong').closest('div');
      expect(container).toHaveClass('bg-gray-900', 'border', 'border-gray-800', 'rounded-2xl');
    });

    it('should have responsive layout classes', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const outerContainer = screen.getByText('Oops! Something went wrong').closest('.min-h-screen');
      expect(outerContainer).toHaveClass('min-h-screen', 'bg-black', 'flex', 'items-center', 'justify-center');
    });

    it('should have proper button styling', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const tryAgainButton = screen.getByRole('button', { name: /Try Again/i });
      expect(tryAgainButton).toHaveClass('bg-blue-600', 'hover:bg-blue-700', 'rounded-lg');

      const homeButton = screen.getByRole('button', { name: /Go to Homepage/i });
      expect(homeButton).toHaveClass('bg-gray-800', 'hover:bg-gray-700', 'rounded-lg');
    });
  });

  describe('Development Mode', () => {
    const originalEnv = process.env.NODE_ENV;

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
    });

    it('should show error details in development mode', () => {
      process.env.NODE_ENV = 'development';

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText(/Error Details \(Development Only\)/)).toBeInTheDocument();
    });

    it('should not show error details in production mode', () => {
      process.env.NODE_ENV = 'production';

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.queryByText(/Error Details/)).not.toBeInTheDocument();
    });

    it('should display error message in development mode', () => {
      process.env.NODE_ENV = 'development';

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const details = screen.getByText(/Error Details/).closest('details');
      expect(details).toBeInTheDocument();
    });
  });

  describe('Error Propagation', () => {
    it('should not catch errors from sibling components', () => {
      render(
        <>
          <ErrorBoundary>
            <div>Safe Component</div>
          </ErrorBoundary>
          <div>Sibling Component</div>
        </>
      );

      expect(screen.getByText('Safe Component')).toBeInTheDocument();
      expect(screen.getByText('Sibling Component')).toBeInTheDocument();
    });

    it('should isolate errors to its own subtree', () => {
      render(
        <>
          <ErrorBoundary>
            <ThrowError />
          </ErrorBoundary>
          <div>Unaffected Component</div>
        </>
      );

      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Unaffected Component')).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('should work with nested ErrorBoundaries', () => {
      render(
        <ErrorBoundary fallback={<div>Outer Error</div>}>
          <ErrorBoundary fallback={<div>Inner Error</div>}>
            <ThrowError />
          </ErrorBoundary>
        </ErrorBoundary>
      );

      // Inner boundary should catch the error
      expect(screen.getByText('Inner Error')).toBeInTheDocument();
      expect(screen.queryByText('Outer Error')).not.toBeInTheDocument();
    });

    it('should catch errors thrown by event handlers after reset', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowOnClick />
        </ErrorBoundary>
      );

      // Initially no error
      expect(screen.getByRole('button', { name: /Throw Error/i })).toBeInTheDocument();

      // Click to throw error
      fireEvent.click(screen.getByRole('button', { name: /Throw Error/i }));

      // Error boundary should catch it
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible button roles', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });

    it('should have descriptive button text', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByRole('button', { name: /Try Again/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Go to Homepage/i })).toBeInTheDocument();
    });
  });
});
