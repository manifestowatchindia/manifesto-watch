import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../../lib/hooks/useDebounce';

export interface SearchBarProps {
  onSearch: (query: string) => void;
  onSuggestionsChange?: (suggestions: string[]) => void;
  placeholder?: string;
  showVoiceSearch?: boolean;
  showTrending?: boolean;
  trendingSearches?: string[];
}

/**
 * SearchBar Component
 * 
 * A comprehensive search component with:
 * - Real-time search input with debouncing
 * - Auto-suggest dropdown with debounced API calls
 * - Optional voice search capability
 * - Trending searches chips
 * - Keyboard navigation support (Enter to search, Escape to close)
 * - Full accessibility support
 * 
 * @component
 * @example
 * <SearchBar
 *   onSearch={(query) => handleSearch(query)}
 *   placeholder="Search promises..."
 *   showVoiceSearch={true}
 *   showTrending={true}
 *   trendingSearches={['jobs', 'healthcare', 'roads']}
 * />
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onSuggestionsChange,
  placeholder = 'Search promises, manifestos, and categories...',
  showVoiceSearch = false,
  showTrending = true,
  trendingSearches = [],
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  // Fetch suggestions when debounced query changes
  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      fetchSuggestions(debouncedQuery);
      setIsOpen(true);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  /**
   * Fetch suggestions from API
   */
  const fetchSuggestions = async (searchQuery: string) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `/api/v1/search/suggestions?q=${encodeURIComponent(searchQuery)}&limit=8`,
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error('Failed to fetch suggestions');

      const data = await response.json();
      const fetchedSuggestions = Array.isArray(data) ? data : data.suggestions || [];
      setSuggestions(fetchedSuggestions);
      onSuggestionsChange?.(fetchedSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setQuery(value);
    setHighlightedIndex(-1);
  };

  /**
   * Handle search submission
   */
  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setIsOpen(false);
      setSuggestions([]);
    }
  };

  /**
   * Handle Enter key press
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleSearch(suggestions[highlightedIndex]);
        } else {
          handleSearch();
        }
        break;

      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
        break;

      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;

      default:
        break;
    }
  };

  /**
   * Handle suggestion click
   */
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  /**
   * Handle trending search click
   */
  const handleTrendingClick = (trend: string) => {
    setQuery(trend);
    handleSearch(trend);
  };

  /**
   * Clear input
   */
  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  /**
   * Handle voice search
   */
  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          interimTranscript += transcript + ' ';
        }
      }
      if (interimTranscript) {
        const finalText = interimTranscript.trim();
        setQuery(finalText);
        handleSearch(finalText);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  /**
   * Handle clicks outside to close dropdown
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      {/* Main search input container */}
      <div className="relative flex items-center gap-2">
        {/* Search icon */}
        <div className="absolute left-4 pointer-events-none text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Search input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder={placeholder}
          aria-label="Search promises and manifestos"
          aria-autocomplete="list"
          aria-controls="suggestions-list"
          aria-expanded={isOpen}
          className="w-full pl-12 pr-16 py-3 border-2 border-gray-300 rounded-full 
                     focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                     placeholder-gray-400 text-gray-900 bg-gray-50
                     transition-all duration-200"
        />

        {/* Action buttons */}
        <div className="absolute right-2 flex items-center gap-2">
          {/* Clear button */}
          {query && (
            <button
              onClick={handleClear}
              aria-label="Clear search input"
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full
                        hover:bg-gray-100 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Voice search button */}
          {showVoiceSearch && (
            <button
              onClick={handleVoiceSearch}
              disabled={isListening}
              aria-label={isListening ? 'Listening...' : 'Search by voice'}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full
                        hover:bg-gray-100 transition-colors duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className={`w-5 h-5 transition-colors ${
                  isListening ? 'text-red-500' : ''
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 16.91c-1.48 1.46-3.51 2.36-5.7 2.36-2.19 0-4.23-.9-5.7-2.36m0 0a.999.999 0 0 0-1.41 1.41c1.84 1.84 4.35 2.98 7.11 2.98s5.27-1.14 7.11-2.98a.999.999 0 1 0-1.41-1.41M9 9h6v2H9z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          id="suggestions-list"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 
                     rounded-lg shadow-lg z-50 overflow-hidden"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion}-${index}`}
              role="option"
              aria-selected={index === highlightedIndex}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`px-4 py-3 cursor-pointer transition-colors duration-150
                          flex items-center gap-2 border-b border-gray-100 last:border-b-0
                          ${
                            index === highlightedIndex
                              ? 'bg-blue-50 text-blue-900'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
            >
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text-sm">{suggestion}</span>
            </div>
          ))}
        </div>
      )}

      {/* Trending searches section */}
      {showTrending && !isOpen && !query && trendingSearches.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">
            🔥 Trending Searches
          </p>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((trend) => (
              <button
                key={trend}
                onClick={() => handleTrendingClick(trend)}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full
                           hover:bg-blue-100 hover:text-blue-900 transition-colors duration-200
                           font-medium border border-gray-200 hover:border-blue-300"
                aria-label={`Search for ${trend}`}
              >
                {trend}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Voice listening indicator */}
      {isListening && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Listening... Speak your search query
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
