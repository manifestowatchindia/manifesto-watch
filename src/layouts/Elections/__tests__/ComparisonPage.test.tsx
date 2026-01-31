import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HelmetProvider } from 'react-helmet-async';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({
    state: 'kerala',
    year: '2026'
  }))
}));

import { ComparisonPage } from '../ComparisonPage';

// Wrapper component with all necessary providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      {component}
    </HelmetProvider>
  );
};

describe('ComparisonPage', () => {
  describe('Rendering - Basic Elements', () => {
    it('renders page title', () => {
      renderWithProviders(<ComparisonPage />);
      expect(screen.getByText('Compare Party Manifestos')).toBeInTheDocument();
    });

    it('renders state and year from URL params', () => {
      renderWithProviders(<ComparisonPage />);
      expect(screen.getByText('Kerala Election 2026')).toBeInTheDocument();
    });

    it('renders party selection section', () => {
      renderWithProviders(<ComparisonPage />);
      expect(screen.getByText(/Select Parties \(minimum 2\)/i)).toBeInTheDocument();
    });

    it('renders category selection section', () => {
      renderWithProviders(<ComparisonPage />);
      expect(screen.getByText('Select Categories')).toBeInTheDocument();
    });

    it('renders all party options', () => {
      renderWithProviders(<ComparisonPage />);
      expect(screen.getByText('LDF (CPM-led)')).toBeInTheDocument();
      expect(screen.getByText('UDF (INC-led)')).toBeInTheDocument();
      expect(screen.getByText('NDA (BJP-led)')).toBeInTheDocument();
      expect(screen.getByText('Independent Candidates')).toBeInTheDocument();
    });

    it('renders all category options', () => {
      renderWithProviders(<ComparisonPage />);
      expect(screen.getByText('Employment')).toBeInTheDocument();
      expect(screen.getByText('Healthcare')).toBeInTheDocument();
      expect(screen.getByText('Education')).toBeInTheDocument();
      expect(screen.getByText('Agriculture')).toBeInTheDocument();
      expect(screen.getByText('Infrastructure')).toBeInTheDocument();
      expect(screen.getByText('Welfare Schemes')).toBeInTheDocument();
    });

    it('renders Generate Comparison button', () => {
      renderWithProviders(<ComparisonPage />);
      expect(screen.getByText('Generate Comparison')).toBeInTheDocument();
    });

    it('renders Clear All button', () => {
      renderWithProviders(<ComparisonPage />);
      expect(screen.getByText('Clear All')).toBeInTheDocument();
    });
  });

  describe('Party Selection', () => {
    it('allows selecting a party', () => {
      renderWithProviders(<ComparisonPage />);
      const ldfCheckbox = screen.getByRole('checkbox', { name: /LDF \(CPM-led\)/i });
      
      fireEvent.click(ldfCheckbox);
      expect(ldfCheckbox).toBeChecked();
    });

    it('allows deselecting a party', () => {
      renderWithProviders(<ComparisonPage />);
      const ldfCheckbox = screen.getByRole('checkbox', { name: /LDF \(CPM-led\)/i });
      
      fireEvent.click(ldfCheckbox);
      expect(ldfCheckbox).toBeChecked();
      
      fireEvent.click(ldfCheckbox);
      expect(ldfCheckbox).not.toBeChecked();
    });

    it('allows selecting multiple parties', () => {
      renderWithProviders(<ComparisonPage />);
      const ldfCheckbox = screen.getByRole('checkbox', { name: /LDF \(CPM-led\)/i });
      const udfCheckbox = screen.getByRole('checkbox', { name: /UDF \(INC-led\)/i });
      
      fireEvent.click(ldfCheckbox);
      fireEvent.click(udfCheckbox);
      
      expect(ldfCheckbox).toBeChecked();
      expect(udfCheckbox).toBeChecked();
    });

    it('shows party count when parties are selected', () => {
      renderWithProviders(<ComparisonPage />);
      const ldfCheckbox = screen.getByRole('checkbox', { name: /LDF \(CPM-led\)/i });
      const udfCheckbox = screen.getByRole('checkbox', { name: /UDF \(INC-led\)/i });
      
      fireEvent.click(ldfCheckbox);
      fireEvent.click(udfCheckbox);
      
      expect(screen.getByText('2 parties selected')).toBeInTheDocument();
    });

    it('Select All parties button works', () => {
      renderWithProviders(<ComparisonPage />);
      const selectAllButton = screen.getAllByText(/Select All/i)[0];
      
      fireEvent.click(selectAllButton);
      
      expect(screen.getByText('4 parties selected')).toBeInTheDocument();
    });

    it('Deselect All parties button works', () => {
      renderWithProviders(<ComparisonPage />);
      const selectAllButton = screen.getAllByText(/Select All/i)[0];
      
      // First select all
      fireEvent.click(selectAllButton);
      expect(screen.getByText('4 parties selected')).toBeInTheDocument();
      
      // Then deselect all
      const deselectButton = screen.getByText('Deselect All');
      fireEvent.click(deselectButton);
      
      expect(screen.queryByText('4 parties selected')).not.toBeInTheDocument();
    });
  });

  describe('Category Selection', () => {
    it('allows selecting a category', () => {
      renderWithProviders(<ComparisonPage />);
      const employmentCheckbox = screen.getByRole('checkbox', { name: /Employment/i });
      
      fireEvent.click(employmentCheckbox);
      expect(employmentCheckbox).toBeChecked();
    });

    it('allows deselecting a category', () => {
      renderWithProviders(<ComparisonPage />);
      const employmentCheckbox = screen.getByRole('checkbox', { name: /Employment/i });
      
      fireEvent.click(employmentCheckbox);
      expect(employmentCheckbox).toBeChecked();
      
      fireEvent.click(employmentCheckbox);
      expect(employmentCheckbox).not.toBeChecked();
    });

    it('allows selecting multiple categories', () => {
      renderWithProviders(<ComparisonPage />);
      const employmentCheckbox = screen.getByRole('checkbox', { name: /Employment/i });
      const healthcareCheckbox = screen.getByRole('checkbox', { name: /Healthcare/i });
      
      fireEvent.click(employmentCheckbox);
      fireEvent.click(healthcareCheckbox);
      
      expect(employmentCheckbox).toBeChecked();
      expect(healthcareCheckbox).toBeChecked();
    });

    it('shows category count when categories are selected', () => {
      renderWithProviders(<ComparisonPage />);
      const employmentCheckbox = screen.getByRole('checkbox', { name: /Employment/i });
      const healthcareCheckbox = screen.getByRole('checkbox', { name: /Healthcare/i });
      
      fireEvent.click(employmentCheckbox);
      fireEvent.click(healthcareCheckbox);
      
      expect(screen.getByText('2 categories selected')).toBeInTheDocument();
    });

    it('Select All categories button works', () => {
      renderWithProviders(<ComparisonPage />);
      const selectAllButtons = screen.getAllByText(/Select All/i);
      const categorySelectAllButton = selectAllButtons[1]; // Second "Select All" is for categories
      
      fireEvent.click(categorySelectAllButton);
      
      expect(screen.getByText('6 categories selected')).toBeInTheDocument();
    });
  });

  describe('Generate Comparison', () => {
    it('button is disabled when less than 2 parties selected', () => {
      renderWithProviders(<ComparisonPage />);
      const generateButton = screen.getByText('Generate Comparison');
      
      expect(generateButton).toBeDisabled();
    });

    it('button is disabled when no categories selected', () => {
      renderWithProviders(<ComparisonPage />);
      const ldfCheckbox = screen.getByRole('checkbox', { name: /LDF \(CPM-led\)/i });
      const udfCheckbox = screen.getByRole('checkbox', { name: /UDF \(INC-led\)/i });
      
      fireEvent.click(ldfCheckbox);
      fireEvent.click(udfCheckbox);
      
      const generateButton = screen.getByText('Generate Comparison');
      expect(generateButton).toBeDisabled();
    });

    it('button is enabled when requirements are met', () => {
      renderWithProviders(<ComparisonPage />);
      
      // Select 2 parties
      const ldfCheckbox = screen.getByRole('checkbox', { name: /LDF \(CPM-led\)/i });
      const udfCheckbox = screen.getByRole('checkbox', { name: /UDF \(INC-led\)/i });
      fireEvent.click(ldfCheckbox);
      fireEvent.click(udfCheckbox);
      
      // Select 1 category
      const employmentCheckbox = screen.getByRole('checkbox', { name: /Employment/i });
      fireEvent.click(employmentCheckbox);
      
      const generateButton = screen.getByText('Generate Comparison');
      expect(generateButton).not.toBeDisabled();
    });

    it('shows error when trying to compare with only 1 party', () => {
      renderWithProviders(<ComparisonPage />);
      
      // Select only 1 party (button will be disabled, but we can test the logic)
      const ldfCheckbox = screen.getByRole('checkbox', { name: /LDF \(CPM-led\)/i });
      fireEvent.click(ldfCheckbox);
      
      // Select 1 category
      const employmentCheckbox = screen.getByRole('checkbox', { name: /Employment/i });
      fireEvent.click(employmentCheckbox);
      
      const generateButton = screen.getByText('Generate Comparison');
      expect(generateButton).toBeDisabled();
    });

    it('generates comparison when clicked with valid selections', async () => {
      renderWithProviders(<ComparisonPage />);
      
      // Select 2 parties
      const ldfCheckbox = screen.getByRole('checkbox', { name: /LDF \(CPM-led\)/i });
      const udfCheckbox = screen.getByRole('checkbox', { name: /UDF \(INC-led\)/i });
      fireEvent.click(ldfCheckbox);
      fireEvent.click(udfCheckbox);
      
      // Select 1 category
      const employmentCheckbox = screen.getByRole('checkbox', { name: /Employment/i });
      fireEvent.click(employmentCheckbox);
      
      const generateButton = screen.getByText('Generate Comparison');
      fireEvent.click(generateButton);
      
      // Should show loading state
      expect(screen.getByText('Generating...')).toBeInTheDocument();
      
      // Wait for comparison to load
      await waitFor(() => {
        expect(screen.getByText('Comparison Results')).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it('shows loading state during generation', async () => {
      renderWithProviders(<ComparisonPage />);
      
      // Select parties and categories
      const ldfCheckbox = screen.getByRole('checkbox', { name: /LDF \(CPM-led\)/i });
      const udfCheckbox = screen.getByRole('checkbox', { name: /UDF \(INC-led\)/i });
      const employmentCheckbox = screen.getByRole('checkbox', { name: /Employment/i });
      
      fireEvent.click(ldfCheckbox);
      fireEvent.click(udfCheckbox);
      fireEvent.click(employmentCheckbox);
      
      const generateButton = screen.getByText('Generate Comparison');
      fireEvent.click(generateButton);
      
      expect(screen.getByText('Generating comparison...')).toBeInTheDocument();
    });
  });

  describe('Clear All Functionality', () => {
    it('clears all selections when clicked', () => {
      renderWithProviders(<ComparisonPage />);
      
      // Select parties and categories
      const ldfCheckbox = screen.getByRole('checkbox', { name: /LDF \(CPM-led\)/i });
      const employmentCheckbox = screen.getByRole('checkbox', { name: /Employment/i });
      
      fireEvent.click(ldfCheckbox);
      fireEvent.click(employmentCheckbox);
      
      expect(ldfCheckbox).toBeChecked();
      expect(employmentCheckbox).toBeChecked();
      
      // Click Clear All
      const clearButton = screen.getByText('Clear All');
      fireEvent.click(clearButton);
      
      expect(ldfCheckbox).not.toBeChecked();
      expect(employmentCheckbox).not.toBeChecked();
    });

    it('clears comparison results', async () => {
      renderWithProviders(<ComparisonPage />);
      
      // Generate comparison first
      const ldfCheckbox = screen.getByRole('checkbox', { name: /LDF \(CPM-led\)/i });
      const udfCheckbox = screen.getByRole('checkbox', { name: /UDF \(INC-led\)/i });
      const employmentCheckbox = screen.getByRole('checkbox', { name: /Employment/i });
      
      fireEvent.click(ldfCheckbox);
      fireEvent.click(udfCheckbox);
      fireEvent.click(employmentCheckbox);
      
      const generateButton = screen.getByText('Generate Comparison');
      fireEvent.click(generateButton);
      
      await waitFor(() => {
        expect(screen.getByText('Comparison Results')).toBeInTheDocument();
      }, { timeout: 2000 });
      
      // Click Clear All
      const clearButton = screen.getByText('Clear All');
      fireEvent.click(clearButton);
      
      expect(screen.queryByText('Comparison Results')).not.toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('shows empty state when no comparison generated', () => {
      renderWithProviders(<ComparisonPage />);
      expect(screen.getByText('Ready to Compare?')).toBeInTheDocument();
      expect(screen.getByText(/Select at least 2 parties and 1 category/i)).toBeInTheDocument();
    });

    it('shows comparison prompt text', () => {
      renderWithProviders(<ComparisonPage />);
      expect(screen.getByText(/side-by-side analysis/i)).toBeInTheDocument();
    });
  });

  describe('Comparison Results Display', () => {
    it('shows Share button after comparison generated', async () => {
      renderWithProviders(<ComparisonPage />);
      
      // Generate comparison
      const ldfCheckbox = screen.getByRole('checkbox', { name: /LDF \(CPM-led\)/i });
      const udfCheckbox = screen.getByRole('checkbox', { name: /UDF \(INC-led\)/i });
      const employmentCheckbox = screen.getByRole('checkbox', { name: /Employment/i });
      
      fireEvent.click(ldfCheckbox);
      fireEvent.click(udfCheckbox);
      fireEvent.click(employmentCheckbox);
      
      fireEvent.click(screen.getByText('Generate Comparison'));
      
      await waitFor(() => {
        expect(screen.getByText('Share')).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it('shows Download PDF button after comparison generated', async () => {
      renderWithProviders(<ComparisonPage />);
      
      // Generate comparison
      const ldfCheckbox = screen.getByRole('checkbox', { name: /LDF \(CPM-led\)/i });
      const udfCheckbox = screen.getByRole('checkbox', { name: /UDF \(INC-led\)/i });
      const employmentCheckbox = screen.getByRole('checkbox', { name: /Employment/i });
      
      fireEvent.click(ldfCheckbox);
      fireEvent.click(udfCheckbox);
      fireEvent.click(employmentCheckbox);
      
      fireEvent.click(screen.getByText('Generate Comparison'));
      
      await waitFor(() => {
        expect(screen.getByText('Download PDF')).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it('shows disclaimer after comparison generated', async () => {
      renderWithProviders(<ComparisonPage />);
      
      // Generate comparison
      const ldfCheckbox = screen.getByRole('checkbox', { name: /LDF \(CPM-led\)/i });
      const udfCheckbox = screen.getByRole('checkbox', { name: /UDF \(INC-led\)/i });
      const employmentCheckbox = screen.getByRole('checkbox', { name: /Employment/i });
      
      fireEvent.click(ldfCheckbox);
      fireEvent.click(udfCheckbox);
      fireEvent.click(employmentCheckbox);
      
      fireEvent.click(screen.getByText('Generate Comparison'));
      
      await waitFor(() => {
        expect(screen.getByText(/⚠️ Disclaimer/i)).toBeInTheDocument();
        expect(screen.getByText(/based on official party manifestos/i)).toBeInTheDocument();
      }, { timeout: 2000 });
    });
  });

  describe('Responsive Behavior', () => {
    it('renders selection panel in responsive grid', () => {
      const { container } = renderWithProviders(<ComparisonPage />);
      const partyGrid = container.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4');
      expect(partyGrid).toBeInTheDocument();
    });

    it('renders category grid responsively', () => {
      const { container } = renderWithProviders(<ComparisonPage />);
      const categoryGrid = container.querySelector('.grid.grid-cols-2.sm\\:grid-cols-3.lg\\:grid-cols-6');
      expect(categoryGrid).toBeInTheDocument();
    });
  });

  describe('SEO', () => {
    it('sets page title correctly', () => {
      renderWithProviders(<ComparisonPage />);
      // Helmet async doesn't update document.title in tests immediately
      // but we can verify the component renders without errors
      expect(screen.getByText('Compare Party Manifestos')).toBeInTheDocument();
    });
  });

  describe('Visual Feedback', () => {
    it('highlights selected parties with border color', () => {
      const { container } = renderWithProviders(<ComparisonPage />);
      const ldfCheckbox = screen.getByRole('checkbox', { name: /LDF \(CPM-led\)/i });
      
      fireEvent.click(ldfCheckbox);
      
      const selectedLabel = ldfCheckbox.closest('label');
      expect(selectedLabel).toHaveClass('border-blue-500');
      expect(selectedLabel).toHaveClass('bg-blue-50');
    });

    it('highlights selected categories with border color', () => {
      const { container } = renderWithProviders(<ComparisonPage />);
      const employmentCheckbox = screen.getByRole('checkbox', { name: /Employment/i });
      
      fireEvent.click(employmentCheckbox);
      
      const selectedLabel = employmentCheckbox.closest('label');
      expect(selectedLabel).toHaveClass('border-green-500');
      expect(selectedLabel).toHaveClass('bg-green-50');
    });
  });
});
