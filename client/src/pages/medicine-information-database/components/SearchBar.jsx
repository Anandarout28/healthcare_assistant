import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, searchTerm, setSearchTerm }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "Paracetamol",
    "Ibuprofen", 
    "Amoxicillin",
    "Metformin",
    "Aspirin"
  ]);
  const searchRef = useRef(null);

  const suggestions = [
    "Paracetamol 500mg",
    "Paracetamol tablets",
    "Panadol",
    "Ibuprofen 400mg",
    "Ibuprofen gel",
    "Advil",
    "Amoxicillin capsules",
    "Amoxicillin 250mg",
    "Metformin 500mg",
    "Metformin XR",
    "Aspirin 75mg",
    "Aspirin cardio"
  ];

  const filteredSuggestions = suggestions?.filter(suggestion =>
    suggestion?.toLowerCase()?.includes(searchTerm?.toLowerCase()) && 
    suggestion?.toLowerCase() !== searchTerm?.toLowerCase()
  )?.slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchTerm?.trim()) {
      onSearch(searchTerm);
      addToRecentSearches(searchTerm);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    addToRecentSearches(suggestion);
    setShowSuggestions(false);
  };

  const addToRecentSearches = (term) => {
    setRecentSearches(prev => {
      const filtered = prev?.filter(item => item?.toLowerCase() !== term?.toLowerCase());
      return [term, ...filtered]?.slice(0, 5);
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search medicines, drugs, or active ingredients..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e?.target?.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="pl-12 pr-16 h-12 text-base"
          />
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            Search
          </Button>
        </div>
      </form>
      {/* Search Suggestions Dropdown */}
      {showSuggestions && (searchTerm || recentSearches?.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg healthcare-shadow-lg z-50 max-h-80 overflow-y-auto">
          {/* Filtered Suggestions */}
          {searchTerm && filteredSuggestions?.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-text-secondary px-3 py-2">
                Suggestions
              </div>
              {filteredSuggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center px-3 py-2 text-sm text-left hover:bg-muted rounded-md healthcare-transition"
                >
                  <Icon name="Search" size={16} className="mr-3 text-text-secondary" />
                  <span className="text-text-primary">{suggestion}</span>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {!searchTerm && recentSearches?.length > 0 && (
            <div className="p-2">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs font-medium text-text-secondary">
                  Recent Searches
                </span>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-text-secondary hover:text-text-primary healthcare-transition"
                >
                  Clear
                </button>
              </div>
              {recentSearches?.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="w-full flex items-center px-3 py-2 text-sm text-left hover:bg-muted rounded-md healthcare-transition"
                >
                  <Icon name="Clock" size={16} className="mr-3 text-text-secondary" />
                  <span className="text-text-primary">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {searchTerm && filteredSuggestions?.length === 0 && (
            <div className="p-4 text-center text-text-secondary">
              <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No suggestions found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;