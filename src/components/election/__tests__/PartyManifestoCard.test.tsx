import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PartyManifestoCard } from '../PartyManifestoCard';

describe('PartyManifestoCard', () => {
  const mockKeyPromises = [
    '100,000 government jobs in 5 years',
    '₹2,000 monthly pension for elderly',
    'Free rice for all ration card holders',
    'Universal healthcare coverage',
  ];

  describe('Rendering - Basic Elements', () => {
    it('renders party name', () => {
      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
        />
      );

      expect(screen.getByText('LDF (CPM-led)')).toBeInTheDocument();
    });

    it('renders party logo when provided', () => {
      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          logo="/logos/ldf.png"
          releaseStatus="released"
        />
      );

      const logo = screen.getByAltText('LDF (CPM-led) logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/logos/ldf.png');
    });

    it('renders party initial when logo not provided', () => {
      const { container } = render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
        />
      );

      const initial = container.querySelector('.bg-gray-300.rounded-full');
      expect(initial).toBeInTheDocument();
      expect(initial).toHaveTextContent('L');
    });

    it('renders manifesto year', () => {
      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
        />
      );

      expect(screen.getByText('Manifesto 2026')).toBeInTheDocument();
    });
  });

  describe('Release Status', () => {
    it('displays released status badge', () => {
      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
        />
      );

      expect(screen.getByText('Released')).toBeInTheDocument();
    });

    it('displays expected status badge', () => {
      render(
        <PartyManifestoCard
          party="UDF (INC-led)"
          releaseStatus="expected"
          expectedDate="2026-03-01"
        />
      );

      expect(screen.getByText('Expected Soon')).toBeInTheDocument();
    });

    it('displays not-released status badge', () => {
      render(
        <PartyManifestoCard
          party="NDA (BJP-led)"
          releaseStatus="not-released"
        />
      );

      expect(screen.getByText('Not Released')).toBeInTheDocument();
    });

    it('shows expected date when status is expected', () => {
      render(
        <PartyManifestoCard
          party="UDF (INC-led)"
          releaseStatus="expected"
          expectedDate="2026-03-15"
        />
      );

      expect(screen.getByText(/Expected:/)).toBeInTheDocument();
      expect(screen.getByText(/Mar.*2026/)).toBeInTheDocument();
    });

    it('does not show expected date for released status', () => {
      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          expectedDate="2026-03-15"
        />
      );

      expect(screen.queryByText(/Expected:/)).not.toBeInTheDocument();
    });
  });

  describe('Key Promises', () => {
    it('renders key promises when manifesto is released', () => {
      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          keyPromises={mockKeyPromises}
        />
      );

      expect(screen.getByText('100,000 government jobs in 5 years')).toBeInTheDocument();
      expect(screen.getByText('₹2,000 monthly pension for elderly')).toBeInTheDocument();
      expect(screen.getByText('Free rice for all ration card holders')).toBeInTheDocument();
    });

    it('limits display to 4 key promises', () => {
      const manyPromises = [
        'Promise 1',
        'Promise 2',
        'Promise 3',
        'Promise 4',
        'Promise 5',
        'Promise 6',
      ];

      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          keyPromises={manyPromises}
        />
      );

      expect(screen.getByText('Promise 1')).toBeInTheDocument();
      expect(screen.getByText('Promise 4')).toBeInTheDocument();
      expect(screen.queryByText('Promise 5')).not.toBeInTheDocument();
    });

    it('shows count of additional promises', () => {
      const manyPromises = [
        'Promise 1',
        'Promise 2',
        'Promise 3',
        'Promise 4',
        'Promise 5',
        'Promise 6',
      ];

      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          keyPromises={manyPromises}
        />
      );

      expect(screen.getByText('+2 more promises')).toBeInTheDocument();
    });

    it('does not show key promises for expected status', () => {
      render(
        <PartyManifestoCard
          party="UDF (INC-led)"
          releaseStatus="expected"
          keyPromises={mockKeyPromises}
        />
      );

      expect(screen.queryByText('100,000 government jobs in 5 years')).not.toBeInTheDocument();
      expect(screen.getByText(/Manifesto will be available soon/)).toBeInTheDocument();
    });

    it('shows message when manifesto not released', () => {
      render(
        <PartyManifestoCard
          party="NDA (BJP-led)"
          releaseStatus="not-released"
        />
      );

      expect(screen.getByText('Manifesto not yet released.')).toBeInTheDocument();
    });
  });

  describe('Button Interactions', () => {
    it('renders Read Full Manifesto button', () => {
      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          onReadFull={jest.fn()}
        />
      );

      expect(screen.getByText(/Read Full Manifesto/)).toBeInTheDocument();
    });

    it('calls onReadFull when Read button is clicked', () => {
      const onReadFull = jest.fn();

      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          onReadFull={onReadFull}
        />
      );

      fireEvent.click(screen.getByText(/Read Full Manifesto/));
      expect(onReadFull).toHaveBeenCalledTimes(1);
    });

    it('disables Read button when manifesto not released', () => {
      render(
        <PartyManifestoCard
          party="NDA (BJP-led)"
          releaseStatus="not-released"
          onReadFull={jest.fn()}
        />
      );

      const button = screen.getByText(/Read Full Manifesto/).closest('button');
      expect(button).toBeDisabled();
    });

    it('renders Track Promises button when manifesto is released', () => {
      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          onTrackPromises={jest.fn()}
        />
      );

      expect(screen.getByText(/Track Promises/)).toBeInTheDocument();
    });

    it('calls onTrackPromises when Track button is clicked', () => {
      const onTrackPromises = jest.fn();

      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          onTrackPromises={onTrackPromises}
        />
      );

      fireEvent.click(screen.getByText(/Track Promises/));
      expect(onTrackPromises).toHaveBeenCalledTimes(1);
    });

    it('does not render Track button when handler not provided', () => {
      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
        />
      );

      expect(screen.queryByText(/Track Promises/)).not.toBeInTheDocument();
    });

    it('renders Download button when documentUrl is provided', () => {
      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          documentUrl="/manifestos/ldf-2026.pdf"
        />
      );

      const downloadButton = screen.getByLabelText(/Download manifesto PDF/);
      expect(downloadButton).toBeInTheDocument();
    });

    it('calls onDownload when Download button is clicked', () => {
      const onDownload = jest.fn();

      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          documentUrl="/manifestos/ldf-2026.pdf"
          onDownload={onDownload}
        />
      );

      const downloadButton = screen.getByLabelText(/Download manifesto PDF/);
      fireEvent.click(downloadButton);
      expect(onDownload).toHaveBeenCalledTimes(1);
    });

    it('opens document URL when Download clicked without handler', () => {
      const windowOpenSpy = jest.spyOn(window, 'open').mockImplementation();

      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          documentUrl="/manifestos/ldf-2026.pdf"
        />
      );

      const downloadButton = screen.getByLabelText(/Download manifesto PDF/);
      fireEvent.click(downloadButton);

      expect(windowOpenSpy).toHaveBeenCalledWith(
        '/manifestos/ldf-2026.pdf',
        '_blank',
        'noopener,noreferrer'
      );

      windowOpenSpy.mockRestore();
    });

    it('shows PDF available message when documentUrl provided', () => {
      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          documentUrl="/manifestos/ldf-2026.pdf"
        />
      );

      expect(screen.getByText('PDF document available for download')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA label on Read button', () => {
      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          onReadFull={jest.fn()}
        />
      );

      const button = screen.getByLabelText('Read full manifesto for LDF (CPM-led)');
      expect(button).toBeInTheDocument();
    });

    it('has proper ARIA label on Track button', () => {
      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          onTrackPromises={jest.fn()}
        />
      );

      const button = screen.getByLabelText('Track promises for LDF (CPM-led)');
      expect(button).toBeInTheDocument();
    });

    it('has proper ARIA label on Download button', () => {
      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          documentUrl="/manifestos/ldf-2026.pdf"
        />
      );

      const button = screen.getByLabelText('Download manifesto PDF for LDF (CPM-led)');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          className="custom-class"
        />
      );

      const card = container.querySelector('.custom-class');
      expect(card).toBeInTheDocument();
    });

    it('has hover effects on card', () => {
      const { container } = render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
        />
      );

      const card = container.firstChild;
      expect(card).toHaveClass('hover:shadow-xl');
      expect(card).toHaveClass('hover:scale-[1.02]');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty key promises array', () => {
      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          keyPromises={[]}
        />
      );

      expect(screen.queryByText('Key Promises')).not.toBeInTheDocument();
    });

    it('handles very long party names', () => {
      const longPartyName = 'United Democratic Front (Indian National Congress-led) Kerala 2026';

      render(
        <PartyManifestoCard
          party={longPartyName}
          releaseStatus="released"
        />
      );

      expect(screen.getByText(longPartyName)).toBeInTheDocument();
    });

    it('handles very long promise text', () => {
      const longPromise = 'This is an extremely long promise that describes a very detailed policy initiative that will be implemented over multiple phases across the entire state with specific targets and measurable outcomes'.repeat(2);

      render(
        <PartyManifestoCard
          party="LDF (CPM-led)"
          releaseStatus="released"
          keyPromises={[longPromise]}
        />
      );

      expect(screen.getByText(longPromise)).toBeInTheDocument();
    });
  });
});
