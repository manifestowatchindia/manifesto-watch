import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PromiseTimeline, TimelineEvent } from '../PromiseTimeline';

describe('PromiseTimeline', () => {
  const mockEvents: TimelineEvent[] = [
    {
      date: '2024-06-01',
      status: 'in-progress',
      description: 'Initiative launched with pilot program',
      details: 'Started in 5 districts as trial phase',
    },
    {
      date: '2024-01-15',
      status: 'completed',
      description: 'Budget allocation approved',
    },
    {
      date: '2023-12-01',
      status: 'not-started',
      description: 'Proposal submitted to cabinet',
      details: 'Awaiting approval from finance ministry',
    },
  ];

  describe('Rendering', () => {
    it('renders all timeline events', () => {
      render(<PromiseTimeline events={mockEvents} />);
      
      expect(screen.getByText('Initiative launched with pilot program')).toBeInTheDocument();
      expect(screen.getByText('Budget allocation approved')).toBeInTheDocument();
      expect(screen.getByText('Proposal submitted to cabinet')).toBeInTheDocument();
    });

    it('renders event details when provided', () => {
      render(<PromiseTimeline events={mockEvents} />);
      
      expect(screen.getByText('Started in 5 districts as trial phase')).toBeInTheDocument();
      expect(screen.getByText('Awaiting approval from finance ministry')).toBeInTheDocument();
    });

    it('does not render details when not provided', () => {
      const eventsWithoutDetails: TimelineEvent[] = [
        {
          date: '2024-01-15',
          status: 'completed',
          description: 'Budget allocation approved',
        },
      ];
      
      const { container } = render(<PromiseTimeline events={eventsWithoutDetails} />);
      const detailParagraphs = container.querySelectorAll('.text-sm.text-gray-600');
      
      expect(detailParagraphs).toHaveLength(0);
    });

    it('formats dates correctly', () => {
      render(<PromiseTimeline events={mockEvents} />);
      
      // Check for formatted date (format: "1 Jun, 2024" or similar)
      expect(screen.getByText(/Jun.*2024/)).toBeInTheDocument();
      expect(screen.getByText(/Jan.*2024/)).toBeInTheDocument();
      expect(screen.getByText(/Dec.*2023/)).toBeInTheDocument();
    });

    it('displays empty state when no events', () => {
      render(<PromiseTimeline events={[]} />);
      
      expect(screen.getByText('No timeline events available')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <PromiseTimeline events={mockEvents} className="custom-class" />
      );
      
      const timeline = container.querySelector('.custom-class');
      expect(timeline).toBeInTheDocument();
    });
  });

  describe('Status Display', () => {
    it('displays completed status correctly', () => {
      const events: TimelineEvent[] = [
        { date: '2024-01-01', status: 'completed', description: 'Task done' },
      ];
      
      render(<PromiseTimeline events={events} />);
      
      const statusBadge = screen.getAllByText(/completed/i)[0];
      expect(statusBadge).toBeInTheDocument();
    });

    it('displays in-progress status correctly', () => {
      const events: TimelineEvent[] = [
        { date: '2024-01-01', status: 'in-progress', description: 'Ongoing task' },
      ];
      
      render(<PromiseTimeline events={events} />);
      
      expect(screen.getByText(/in progress/i)).toBeInTheDocument();
    });

    it('displays delayed status correctly', () => {
      const events: TimelineEvent[] = [
        { date: '2024-01-01', status: 'delayed', description: 'Task behind schedule' },
      ];
      
      render(<PromiseTimeline events={events} />);
      
      const statusBadge = screen.getAllByText(/delayed/i)[0];
      expect(statusBadge).toBeInTheDocument();
    });

    it('displays not-started status correctly', () => {
      const events: TimelineEvent[] = [
        { date: '2024-01-01', status: 'not-started', description: 'Pending task' },
      ];
      
      render(<PromiseTimeline events={events} />);
      
      expect(screen.getByText(/not started/i)).toBeInTheDocument();
    });

    it('displays partially-completed status correctly', () => {
      const events: TimelineEvent[] = [
        { date: '2024-01-01', status: 'partially-completed', description: 'Partial task' },
      ];
      
      render(<PromiseTimeline events={events} />);
      
      expect(screen.getByText(/partially completed/i)).toBeInTheDocument();
    });
  });

  describe('Sorting', () => {
    it('sorts events by date (most recent first)', () => {
      const unsortedEvents: TimelineEvent[] = [
        { date: '2023-01-01', status: 'completed', description: 'Oldest' },
        { date: '2024-12-31', status: 'in-progress', description: 'Newest' },
        { date: '2024-06-15', status: 'delayed', description: 'Middle' },
      ];
      
      render(<PromiseTimeline events={unsortedEvents} />);
      
      const descriptions = screen.getAllByRole('listitem');
      
      // First item should be newest
      expect(descriptions[0]).toHaveTextContent('Newest');
      // Last item should be oldest
      expect(descriptions[2]).toHaveTextContent('Oldest');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA role for timeline', () => {
      const { container } = render(<PromiseTimeline events={mockEvents} />);
      
      const timeline = container.querySelector('[role="list"]');
      expect(timeline).toBeInTheDocument();
      expect(timeline).toHaveAttribute('aria-label', 'Promise timeline');
    });

    it('has proper ARIA role for each event', () => {
      render(<PromiseTimeline events={mockEvents} />);
      
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(3);
    });

    it('has proper ARIA labels on events', () => {
      render(<PromiseTimeline events={mockEvents} />);
      
      const firstItem = screen.getByLabelText(/Initiative launched with pilot program on/);
      expect(firstItem).toBeInTheDocument();
    });

    it('has semantic time elements with datetime attributes', () => {
      render(<PromiseTimeline events={mockEvents} />);
      
      const timeElements = screen.getAllByText(/Jun.*2024|Jan.*2024|Dec.*2023/);
      
      timeElements.forEach(element => {
        expect(element.tagName).toBe('TIME');
        expect(element).toHaveAttribute('datetime');
      });
    });
  });

  describe('Visual Structure', () => {
    it('renders status icons', () => {
      const { container } = render(<PromiseTimeline events={mockEvents} />);
      
      // Check for icon circles (status indicators)
      const iconCircles = container.querySelectorAll('.rounded-full.flex.items-center.justify-center');
      expect(iconCircles.length).toBeGreaterThan(0);
    });

    it('renders connecting lines between events', () => {
      const { container } = render(<PromiseTimeline events={mockEvents} />);
      
      // Should have connecting lines (one less than number of events)
      const connectingLines = container.querySelectorAll('.w-0\\.5');
      expect(connectingLines.length).toBe(mockEvents.length - 1);
    });

    it('does not render connecting line after last event', () => {
      const singleEvent: TimelineEvent[] = [
        { date: '2024-01-01', status: 'completed', description: 'Only event' },
      ];
      
      const { container } = render(<PromiseTimeline events={singleEvent} />);
      
      const connectingLines = container.querySelectorAll('.w-0\\.5');
      expect(connectingLines).toHaveLength(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles single event', () => {
      const singleEvent: TimelineEvent[] = [
        { date: '2024-01-01', status: 'completed', description: 'Single event' },
      ];
      
      render(<PromiseTimeline events={singleEvent} />);
      
      expect(screen.getByText('Single event')).toBeInTheDocument();
    });

    it('handles events with same date', () => {
      const sameDateEvents: TimelineEvent[] = [
        { date: '2024-01-01', status: 'completed', description: 'Event 1' },
        { date: '2024-01-01', status: 'in-progress', description: 'Event 2' },
      ];
      
      render(<PromiseTimeline events={sameDateEvents} />);
      
      expect(screen.getByText('Event 1')).toBeInTheDocument();
      expect(screen.getByText('Event 2')).toBeInTheDocument();
    });

    it('handles very long descriptions', () => {
      const longDescription = 'This is a very long description that should still be displayed correctly without breaking the layout or causing any visual issues in the timeline component'.repeat(2);
      
      const events: TimelineEvent[] = [
        { date: '2024-01-01', status: 'completed', description: longDescription },
      ];
      
      render(<PromiseTimeline events={events} />);
      
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it('handles undefined events array gracefully', () => {
      render(<PromiseTimeline events={undefined as any} />);
      
      expect(screen.getByText('No timeline events available')).toBeInTheDocument();
    });
  });
});
