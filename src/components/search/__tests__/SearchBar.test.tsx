import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from '../SearchBar';

global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();
  const mockOnSuggestionsChange = jest.fn();
  const defaultTrendingSearches = ['jobs', 'healthcare', 'roads'];

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    test('should render search input with placeholder', () => {
      render(<SearchBar onSearch={mockOnSearch} placeholder="Search promises..." />);
      const input = screen.getByPlaceholderText('Search promises...');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
    });

    test('should render search icon', () => {
      const { container } = render(<SearchBar onSearch={mockOnSearch} />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    test('should render trending searches', () => {
      render(<SearchBar onSearch={mockOnSearch} showTrending={true} trendingSearches={defaultTrendingSearches} />);
      expect(screen.getByText(/Trending Searches/)).toBeInTheDocument();
    });

    test('should render voice search button', () => {
      render(<SearchBar onSearch={mockOnSearch} showVoiceSearch={true} />);
      expect(screen.getByLabelText('Search by voice')).toBeInTheDocument();
    });
  });

  describe('Input Handling', () => {
    test('should update input value on typing', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'jobs' } });
      expect(input.value).toBe('jobs');
    });

    test('should clear input when clear button is clicked', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'healthcare' } });
      const clearButton = screen.getByLabelText('Clear search input');
      fireEvent.click(clearButton);
      expect(input.value).toBe('');
    });

    test('should show clear button when input has text', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test' } });
      expect(screen.getByLabelText('Clear search input')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      mockFetch.mockResolvedValue({ ok: true, json: async () => (['jobs list', 'jobs report']) } as Response);
    });

    test('should submit search on Enter key', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'healthcare' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(mockOnSearch).toHaveBeenCalledWith('healthcare');
    });

    test('should not submit empty search', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(mockOnSearch).not.toHaveBeenCalled();
    });

    test('should close dropdown on Escape', async () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'jobs' } });
      jest.advanceTimersByTime(300);
      await waitFor(() => expect(screen.getByRole('listbox')).toBeInTheDocument());
      fireEvent.keyDown(input, { key: 'Escape' });
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('Suggestions', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      mockFetch.mockResolvedValue({ ok: true, json: async () => (['jobs list', 'jobs report']) } as Response);
    });

    test('should fetch suggestions after debounce', async () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'jobs' } });
      expect(mockFetch).not.toHaveBeenCalled();
      jest.advanceTimersByTime(300);
      await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    });

    test('should display suggestions', async () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'jobs' } });
      jest.advanceTimersByTime(300);
      await waitFor(() => expect(screen.getByText('jobs list')).toBeInTheDocument());
    });

    test('should select suggestion on click', async () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'jobs' } });
      jest.advanceTimersByTime(300);
      await waitFor(() => expect(screen.getByText('jobs list')).toBeInTheDocument());
      fireEvent.click(screen.getByText('jobs list'));
      expect(mockOnSearch).toHaveBeenCalledWith('jobs list');
    });
  });

  describe('Trending Searches', () => {
    test('should select trending search on click', () => {
      render(<SearchBar onSearch={mockOnSearch} showTrending={true} trendingSearches={defaultTrendingSearches} />);
      const trendButton = screen.getByText('jobs');
      fireEvent.click(trendButton);
      expect(mockOnSearch).toHaveBeenCalledWith('jobs');
    });
  });

  describe('Accessibility', () => {
    test('should have ARIA attributes on input', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Search promises and manifestos');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
    });
  });
});
