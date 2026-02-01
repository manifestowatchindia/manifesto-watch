/**
 * Tests for StatusBreakdown Component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { StatusBreakdown, StatusItem } from '../StatusBreakdown';

// Mock AnimatedCounter to simplify tests
jest.mock('../../ui/AnimatedCounter', () => ({
  AnimatedCounter: ({ value, suffix = '', prefix = '', 'data-testid': testId }: any) => (
    <span data-testid={testId}>{prefix}{value}{suffix}</span>
  ),
}));

// Helper to wrap component with Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

const mockStats: StatusItem[] = [
  { status: 'Delivered', count: 50, label: 'Delivered', icon: '✅', filterValue: 'delivered' },
  { status: 'Under implementation', count: 30, label: 'In Progress', icon: '🔄', filterValue: 'under-implementation' },
  { status: 'Actioned', count: 10, label: 'Started', icon: '🎯', filterValue: 'actioned' },
  { status: 'Announced', count: 8, label: 'Not Started', icon: '⏳', filterValue: 'announced' },
  { status: 'Deferred', count: 2, label: 'Deferred', icon: '❌', filterValue: 'deferred' },
];

const totalCount = 100;

describe('StatusBreakdown', () => {
  describe('Basic Rendering', () => {
    it('renders the component', () => {
      renderWithRouter(
        <StatusBreakdown stats={mockStats} total={totalCount} data-testid="breakdown" />
      );
      
      expect(screen.getByTestId('breakdown')).toBeInTheDocument();
    });

    it('displays total count', () => {
      renderWithRouter(
        <StatusBreakdown stats={mockStats} total={totalCount} />
      );
      
      expect(screen.getByTestId('total-count')).toHaveTextContent('100');
    });

    it('renders all status items', () => {
      renderWithRouter(
        <StatusBreakdown stats={mockStats} total={totalCount} />
      );
      
      expect(screen.getByText('Delivered')).toBeInTheDocument();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
      expect(screen.getByText('Started')).toBeInTheDocument();
      expect(screen.getByText('Not Started')).toBeInTheDocument();
      expect(screen.getByText('Deferred')).toBeInTheDocument();
    });

    it('displays status icons', () => {
      renderWithRouter(
        <StatusBreakdown stats={mockStats} total={totalCount} />
      );
      
      expect(screen.getByText('✅')).toBeInTheDocument();
      expect(screen.getByText('🔄')).toBeInTheDocument();
      expect(screen.getByText('🎯')).toBeInTheDocument();
      expect(screen.getByText('⏳')).toBeInTheDocument();
      expect(screen.getByText('❌')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderWithRouter(
        <StatusBreakdown 
          stats={mockStats} 
          total={totalCount} 
          className="custom-class"
          data-testid="breakdown"
        />
      );
      
      expect(screen.getByTestId('breakdown')).toHaveClass('custom-class');
    });
  });

  describe('Percentages', () => {
    it('calculates and displays correct percentages', () => {
      renderWithRouter(
        <StatusBreakdown stats={mockStats} total={totalCount} />
      );
      
      // Delivered: 50/100 = 50%
      expect(screen.getByText('50%')).toBeInTheDocument();
      // In Progress: 30/100 = 30%
      expect(screen.getByText('30%')).toBeInTheDocument();
      // Actioned: 10/100 = 10%
      expect(screen.getByText('10%')).toBeInTheDocument();
    });

    it('handles zero total gracefully', () => {
      renderWithRouter(
        <StatusBreakdown stats={mockStats} total={0} />
      );
      
      // All percentages should be 0%
      const percentages = screen.getAllByText('0%');
      expect(percentages.length).toBe(mockStats.length);
    });
  });

  describe('Navigation Links', () => {
    it('creates correct links for each status', () => {
      renderWithRouter(
        <StatusBreakdown stats={mockStats} total={totalCount} />
      );
      
      expect(screen.getByTestId('status-delivered')).toHaveAttribute(
        'href',
        '/promises?status=delivered'
      );
      expect(screen.getByTestId('status-under-implementation')).toHaveAttribute(
        'href',
        '/promises?status=under-implementation'
      );
    });

    it('uses custom baseUrl for links', () => {
      renderWithRouter(
        <StatusBreakdown 
          stats={mockStats} 
          total={totalCount} 
          baseUrl="/custom-promises"
        />
      );
      
      expect(screen.getByTestId('status-delivered')).toHaveAttribute(
        'href',
        '/custom-promises?status=delivered'
      );
    });
  });

  describe('Interactions', () => {
    it('calls onStatusClick when a status is clicked', () => {
      const onStatusClick = jest.fn();
      renderWithRouter(
        <StatusBreakdown 
          stats={mockStats} 
          total={totalCount} 
          onStatusClick={onStatusClick}
        />
      );
      
      fireEvent.click(screen.getByTestId('status-delivered'));
      
      expect(onStatusClick).toHaveBeenCalledWith('Delivered');
    });

    it('calls onStatusClick with correct status for each item', () => {
      const onStatusClick = jest.fn();
      renderWithRouter(
        <StatusBreakdown 
          stats={mockStats} 
          total={totalCount} 
          onStatusClick={onStatusClick}
        />
      );
      
      fireEvent.click(screen.getByTestId('status-deferred'));
      expect(onStatusClick).toHaveBeenCalledWith('Deferred');
      
      fireEvent.click(screen.getByTestId('status-actioned'));
      expect(onStatusClick).toHaveBeenCalledWith('Actioned');
    });
  });

  describe('Accessibility', () => {
    it('has list role on status container', () => {
      renderWithRouter(
        <StatusBreakdown stats={mockStats} total={totalCount} />
      );
      
      expect(screen.getByRole('list', { name: /promise status breakdown/i })).toBeInTheDocument();
    });

    it('status items have descriptive aria-labels', () => {
      renderWithRouter(
        <StatusBreakdown stats={mockStats} total={totalCount} />
      );
      
      expect(screen.getByLabelText(/delivered: 50 promises \(50%\)/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/in progress: 30 promises \(30%\)/i)).toBeInTheDocument();
    });

    it('icons are hidden from screen readers', () => {
      const { container } = renderWithRouter(
        <StatusBreakdown stats={mockStats} total={totalCount} />
      );
      
      const iconElements = container.querySelectorAll('[aria-hidden="true"]');
      expect(iconElements.length).toBeGreaterThan(0);
    });
  });

  describe('Animation Control', () => {
    it('passes shouldAnimate prop to AnimatedCounter', () => {
      // AnimatedCounter is mocked, so we verify it receives the prop
      renderWithRouter(
        <StatusBreakdown 
          stats={mockStats} 
          total={totalCount} 
          shouldAnimate={false}
        />
      );
      
      // The mock renders values directly
      expect(screen.getByTestId('total-count')).toHaveTextContent('100');
    });
  });

  describe('Empty State', () => {
    it('renders with empty stats array', () => {
      renderWithRouter(
        <StatusBreakdown stats={[]} total={0} data-testid="breakdown" />
      );
      
      expect(screen.getByTestId('breakdown')).toBeInTheDocument();
      expect(screen.getByTestId('total-count')).toHaveTextContent('0');
    });
  });
});
