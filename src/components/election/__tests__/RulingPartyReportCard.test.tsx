import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { RulingPartyReportCard } from '../RulingPartyReportCard';

jest.mock('../../ui/ProgressRing', () => ({
  ProgressRing: ({ percentage, label }: { percentage: number; label?: string }) => (
    <div data-testid="progress-ring">
      {percentage}% {label}
    </div>
  ),
}));

describe('RulingPartyReportCard', () => {
  const baseProps = {
    party: { name: 'LDF (CPM-led)', logo: '/logo.png' },
    term: '2021-2026',
    completionRate: 67,
    breakdown: {
      completed: 156,
      inProgress: 89,
      delayed: 23,
      notStarted: 12,
    },
  };

  test('renders party name and term', () => {
    render(<RulingPartyReportCard {...baseProps} />);

    expect(screen.getByRole('heading', { name: baseProps.party.name })).toBeInTheDocument();
    expect(screen.getByText(`Term: ${baseProps.term}`)).toBeInTheDocument();
  });

  test('renders completion percentage and ProgressRing', () => {
    render(<RulingPartyReportCard {...baseProps} />);

    expect(screen.getByText(`${baseProps.completionRate}%`)).toBeInTheDocument();
    expect(screen.getByTestId('progress-ring')).toHaveTextContent(`${baseProps.completionRate}%`);
  });

  test('renders breakdown counts for all statuses', () => {
    render(<RulingPartyReportCard {...baseProps} />);

    expect(screen.getByText(String(baseProps.breakdown.completed))).toBeInTheDocument();
    expect(screen.getByText(String(baseProps.breakdown.inProgress))).toBeInTheDocument();
    expect(screen.getByText(String(baseProps.breakdown.delayed))).toBeInTheDocument();
    expect(screen.getByText(String(baseProps.breakdown.notStarted))).toBeInTheDocument();

    expect(screen.getByText(/COMPLETED/i)).toBeInTheDocument();
    expect(screen.getByText(/IN PROGRESS/i)).toBeInTheDocument();
    expect(screen.getByText(/DELAYED/i)).toBeInTheDocument();
    expect(screen.getByText(/NOT STARTED/i)).toBeInTheDocument();
  });

  test('renders View Detailed Report button even when no handler is provided', () => {
    render(<RulingPartyReportCard {...baseProps} />);

    expect(
      screen.getByRole('button', {
        name: `View detailed report card for ${baseProps.party.name}`,
      })
    ).toBeInTheDocument();
  });

  test('calls onViewReport when button is clicked', () => {
    const onViewReport = jest.fn();

    render(<RulingPartyReportCard {...baseProps} onViewReport={onViewReport} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: `View detailed report card for ${baseProps.party.name}`,
      })
    );

    expect(onViewReport).toHaveBeenCalledTimes(1);
  });
});
