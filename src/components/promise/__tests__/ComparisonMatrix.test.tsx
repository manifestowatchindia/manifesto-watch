import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ComparisonMatrix, PromiseComparison } from '../ComparisonMatrix';

// Mock Data
const mockPartyNames = {
  'ldf': 'LDF (CPM-led)',
  'udf': 'UDF (INC-led)',
  'nda': 'NDA (BJP-led)'
};

const mockComparisons: PromiseComparison[] = [
  {
    category: 'Employment',
    subcategory: 'Government Jobs',
    parties: {
      'ldf': {
        promise: '100,000 government jobs in 5 years',
        budget: 150000000000,
        timeline: '5 years (2026-2031)',
        pastRecord: 67,
        feasibilityScore: 78,
        details: 'Focus on teaching, police, and healthcare sectors'
      },
      'udf': {
        promise: '200,000 government jobs in 5 years',
        budget: 300000000000,
        timeline: '5 years (2026-2031)',
        pastRecord: 45,
        feasibilityScore: 52,
        details: 'Includes 100K private sector incentives'
      },
      'nda': {
        promise: '150,000 government jobs in 3 years',
        budget: 225000000000,
        timeline: '3 years (2026-2029)',
        pastRecord: undefined,
        feasibilityScore: 65,
        details: 'Focus on PSU jobs and skill training'
      }
    },
    expertAnalysis: 'LDF target is conservative but achievable. UDF target requires significant budget expansion.'
  }
];

const mockPartialComparisons: PromiseComparison[] = [
  {
    category: 'Healthcare',
    parties: {
      'ldf': {
        promise: 'Universal healthcare coverage',
        details: 'Expand public health infrastructure'
      },
      'udf': {
        promise: 'Health insurance for all',
        budget: 50000000000,
        details: 'Insurance-based model'
      }
    }
  }
];

describe('ComparisonMatrix', () => {
  describe('Rendering - Basic Elements', () => {
    it('renders the category title', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf', 'nda']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      expect(screen.getByText(/Party Comparison: Employment/i)).toBeInTheDocument();
    });

    it('renders party count in description', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      expect(screen.getByText(/Comparing promises from 2 parties/i)).toBeInTheDocument();
    });

    it('renders subcategory title when provided', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf', 'nda']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      expect(screen.getAllByText('Government Jobs')[0]).toBeInTheDocument();
    });

    it('renders all party names', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf', 'nda']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      expect(screen.getAllByText(/LDF \(CPM-led\)/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/UDF \(INC-led\)/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/NDA \(BJP-led\)/i).length).toBeGreaterThan(0);
    });

    it('applies custom className', () => {
      const { container } = render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
          className="custom-class"
        />
      );

      const matrix = container.querySelector('.comparison-matrix');
      expect(matrix).toHaveClass('custom-class');
    });
  });

  describe('Promise Data Display', () => {
    it('displays all promise texts', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf', 'nda']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      expect(screen.getAllByText('100,000 government jobs in 5 years')[0]).toBeInTheDocument();
      expect(screen.getAllByText('200,000 government jobs in 5 years')[0]).toBeInTheDocument();
      expect(screen.getAllByText('150,000 government jobs in 3 years')[0]).toBeInTheDocument();
    });

    it('displays budget in crores format', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      expect(screen.getAllByText('₹15000.00 Cr')[0]).toBeInTheDocument();
      expect(screen.getAllByText('₹30000.00 Cr')[0]).toBeInTheDocument();
    });

    it('displays timeline information', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'nda']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      expect(screen.getAllByText('5 years (2026-2031)')[0]).toBeInTheDocument();
      expect(screen.getAllByText('3 years (2026-2029)')[0]).toBeInTheDocument();
    });

    it('displays details text', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      expect(screen.getAllByText('Focus on teaching, police, and healthcare sectors')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Includes 100K private sector incentives')[0]).toBeInTheDocument();
    });
  });

  describe('Past Record Display', () => {
    it('displays star ratings for past record', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      // Should show stars for 67% (3+ stars)
      const starsElements = screen.getAllByText(/⭐/);
      expect(starsElements.length).toBeGreaterThan(0);
    });

    it('displays completion percentage', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      expect(screen.getAllByText('67% completion')[0]).toBeInTheDocument();
      expect(screen.getAllByText('45% completion')[0]).toBeInTheDocument();
    });

    it('shows "No history" for parties without past record', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['nda']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      expect(screen.getByText('No history')).toBeInTheDocument();
    });
  });

  describe('Feasibility Score Display', () => {
    it('displays feasibility badges', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf', 'nda']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      // Check for feasibility badge text (with emojis)
      expect(screen.getAllByText(/Feasible/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Moderate Concerns/i)[0]).toBeInTheDocument();
    });

    it('displays feasibility scores', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf', 'nda']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      expect(screen.getAllByText('78% score')[0]).toBeInTheDocument();
      expect(screen.getAllByText('52% score')[0]).toBeInTheDocument();
      expect(screen.getAllByText('65% score')[0]).toBeInTheDocument();
    });

    it('applies correct color classes based on score', () => {
      const { container } = render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      // High score (78%) should have feasibility badges - check both desktop and mobile views
      const feasibilityBadges = container.querySelectorAll('.bg-green-100, .bg-blue-100, .bg-yellow-100, .bg-red-100');
      expect(feasibilityBadges.length).toBeGreaterThan(0);
    });
  });

  describe('Expert Analysis', () => {
    it('displays expert analysis section', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      expect(screen.getAllByText('Expert Analysis')[0]).toBeInTheDocument();
      expect(screen.getAllByText(/LDF target is conservative but achievable/i)[0]).toBeInTheDocument();
    });

    it('does not display expert analysis when not provided', () => {
      render(
        <ComparisonMatrix
          category="Healthcare"
          parties={['ldf', 'udf']}
          partyNames={mockPartyNames}
          comparisons={mockPartialComparisons}
        />
      );

      expect(screen.queryByText('Expert Analysis')).not.toBeInTheDocument();
    });
  });

  describe('Empty States', () => {
    it('shows empty state when no comparisons provided', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf']}
          partyNames={mockPartyNames}
          comparisons={[]}
        />
      );

      expect(screen.getByText(/No comparison data available/i)).toBeInTheDocument();
      expect(screen.getByText(/Try selecting different parties or categories/i)).toBeInTheDocument();
    });

    it('shows "Not specified" for missing budget', () => {
      render(
        <ComparisonMatrix
          category="Healthcare"
          parties={['ldf']}
          partyNames={mockPartyNames}
          comparisons={mockPartialComparisons}
        />
      );

      expect(screen.getAllByText('Not specified')[0]).toBeInTheDocument();
    });

    it('shows "Not specified" for missing timeline', () => {
      render(
        <ComparisonMatrix
          category="Healthcare"
          parties={['ldf']}
          partyNames={mockPartyNames}
          comparisons={mockPartialComparisons}
        />
      );

      expect(screen.getAllByText('Not specified').length).toBeGreaterThan(0);
    });

    it('shows "Not assessed" for missing feasibility score', () => {
      render(
        <ComparisonMatrix
          category="Healthcare"
          parties={['ldf']}
          partyNames={mockPartyNames}
          comparisons={mockPartialComparisons}
        />
      );

      expect(screen.getByText('Not assessed')).toBeInTheDocument();
    });

    it('shows "No promise" when party data is missing', () => {
      const comparisonsWithMissingParty: PromiseComparison[] = [
        {
          category: 'Employment',
          parties: {
            'ldf': {
              promise: 'Test promise',
              details: 'Test details'
            }
          }
        }
      ];

      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf']}
          partyNames={mockPartyNames}
          comparisons={comparisonsWithMissingParty}
        />
      );

      expect(screen.getByText('No promise')).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('renders desktop table view', () => {
      const { container } = render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      const desktopView = container.querySelector('.hidden.md\\:block');
      expect(desktopView).toBeInTheDocument();
    });

    it('renders mobile card view', () => {
      const { container } = render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      const mobileView = container.querySelector('.block.md\\:hidden');
      expect(mobileView).toBeInTheDocument();
    });

    it('mobile view has horizontal scroll container', () => {
      const { container } = render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf', 'nda']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      const scrollContainer = container.querySelector('.overflow-x-auto');
      expect(scrollContainer).toBeInTheDocument();
    });
  });

  describe('Multiple Comparisons', () => {
    const multipleComparisons: PromiseComparison[] = [
      ...mockComparisons,
      {
        category: 'Employment',
        subcategory: 'Private Sector Support',
        parties: {
          'ldf': {
            promise: 'Tax incentives for job creators',
            details: 'Reduce corporate tax for hiring'
          },
          'udf': {
            promise: 'Startup support program',
            details: 'Fund 1000 startups'
          }
        }
      }
    ];

    it('renders multiple comparison sections', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf']}
          partyNames={mockPartyNames}
          comparisons={multipleComparisons}
        />
      );

      expect(screen.getAllByText('Government Jobs')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Private Sector Support')[0]).toBeInTheDocument();
    });

    it('displays data for all comparisons', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf']}
          partyNames={mockPartyNames}
          comparisons={multipleComparisons}
        />
      );

      expect(screen.getAllByText('100,000 government jobs in 5 years')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Tax incentives for job creators')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Startup support program')[0]).toBeInTheDocument();
    });
  });

  describe('Budget Formatting', () => {
    const budgetTestComparisons: PromiseComparison[] = [
      {
        category: 'Test',
        parties: {
          'party1': {
            promise: 'Small budget',
            budget: 5000,
            details: 'Test'
          },
          'party2': {
            promise: 'Medium budget',
            budget: 500000,
            details: 'Test'
          },
          'party3': {
            promise: 'Large budget',
            budget: 50000000000,
            details: 'Test'
          }
        }
      }
    ];

    it('formats small amounts in K', () => {
      render(
        <ComparisonMatrix
          category="Test"
          parties={['party1']}
          partyNames={{ party1: 'Party 1' }}
          comparisons={budgetTestComparisons}
        />
      );

      expect(screen.getAllByText('₹5.00 K')[0]).toBeInTheDocument();
    });

    it('formats medium amounts in L', () => {
      render(
        <ComparisonMatrix
          category="Test"
          parties={['party2']}
          partyNames={{ party2: 'Party 2' }}
          comparisons={budgetTestComparisons}
        />
      );

      expect(screen.getAllByText('₹5.00 L')[0]).toBeInTheDocument();
    });

    it('formats large amounts in Cr', () => {
      render(
        <ComparisonMatrix
          category="Test"
          parties={['party3']}
          partyNames={{ party3: 'Party 3' }}
          comparisons={budgetTestComparisons}
        />
      );

      expect(screen.getAllByText('₹5000.00 Cr')[0]).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('uses semantic table structure', () => {
      const { container } = render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      expect(container.querySelector('table')).toBeInTheDocument();
      expect(container.querySelector('thead')).toBeInTheDocument();
      expect(container.querySelector('tbody')).toBeInTheDocument();
    });

    it('has proper table headers', () => {
      render(
        <ComparisonMatrix
          category="Employment"
          parties={['ldf', 'udf']}
          partyNames={mockPartyNames}
          comparisons={mockComparisons}
        />
      );

      expect(screen.getByText('Aspect')).toBeInTheDocument();
      // Using getAllByText because text appears in both desktop table and mobile view
      expect(screen.getAllByText('Promise')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Budget')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Timeline')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Past Record')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Feasibility')[0]).toBeInTheDocument();
    });
  });
});
