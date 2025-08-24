import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, onLocationSelect, searchQuery, setSearchQuery }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const mockSuggestions = [
    { id: 1, name: "Downtown Medical Center", type: "hospital", address: "123 Main St, Downtown" },
    { id: 2, name: "City General Hospital", type: "hospital", address: "456 Oak Ave, City Center" },
    { id: 3, name: "QuickCare Clinic", type: "clinic", address: "789 Pine St, Midtown" },
    { id: 4, name: "HealthPlus Pharmacy", type: "pharmacy", address: "321 Elm St, Uptown" },
    { id: 5, name: "Emergency Care Center", type: "urgent_care", address: "654 Maple Dr, Westside" },
    { id: 6, name: "Family Health Clinic", type: "clinic", address: "987 Cedar Ln, Eastside" },
    { id: 7, name: "MedExpress Pharmacy", type: "pharmacy", address: "147 Birch Ave, Southside" },
    { id: 8, name: "Regional Medical Hospital", type: "hospital", address: "258 Spruce St, Northside" }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef?.current && !suggestionsRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);

    if (value?.length > 2) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const filtered = mockSuggestions?.filter(item =>
          item?.name?.toLowerCase()?.includes(value?.toLowerCase()) ||
          item?.address?.toLowerCase()?.includes(value?.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
        setIsLoading(false);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.name);
    setShowSuggestions(false);
    onLocationSelect(suggestion);
    onSearch(suggestion?.name);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleCurrentLocation = () => {
    setIsLoading(true);
    // Simulate getting current location
    setTimeout(() => {
      setSearchQuery("Current Location");
      onLocationSelect({ type: 'current_location' });
      setIsLoading(false);
    }, 1000);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'hospital':
        return 'Cross';
      case 'clinic':
        return 'Stethoscope';
      case 'pharmacy':
        return 'Pill';
      case 'urgent_care':
        return 'Zap';
      default:
        return 'MapPin';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'hospital':
        return 'text-red-500';
      case 'clinic':
        return 'text-blue-500';
      case 'pharmacy':
        return 'text-green-500';
      case 'urgent_care':
        return 'text-amber-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="relative w-full" ref={suggestionsRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search hospitals, clinics, pharmacies..."
            value={searchQuery}
            onChange={handleInputChange}
            className="pl-12 pr-12"
          />
          
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
              <Icon name="Loader" size={20} className="text-text-secondary animate-spin" />
            ) : (
              <Icon name="Search" size={20} className="text-text-secondary" />
            )}
          </div>

          <button
            type="button"
            onClick={handleCurrentLocation}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded healthcare-transition"
            title="Use current location"
          >
            <Icon name="Navigation" size={18} className="text-text-secondary" />
          </button>
        </div>
      </form>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg healthcare-shadow-lg z-50 max-h-80 overflow-y-auto">
          {suggestions?.map((suggestion) => (
            <button
              key={suggestion?.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full flex items-center px-4 py-3 text-left hover:bg-muted healthcare-transition border-b border-border last:border-b-0"
            >
              <div className={`mr-3 ${getTypeColor(suggestion?.type)}`}>
                <Icon name={getTypeIcon(suggestion?.type)} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-text-primary truncate">
                  {suggestion?.name}
                </div>
                <div className="text-sm text-text-secondary truncate">
                  {suggestion?.address}
                </div>
              </div>
              <div className="ml-2">
                <Icon name="ArrowUpRight" size={16} className="text-text-secondary" />
              </div>
            </button>
          ))}
        </div>
      )}
      {/* No Results */}
      {showSuggestions && suggestions?.length === 0 && searchQuery?.length > 2 && !isLoading && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg healthcare-shadow-lg z-50">
          <div className="px-4 py-6 text-center">
            <Icon name="Search" size={32} className="text-text-secondary mx-auto mb-2" />
            <p className="text-text-secondary">No facilities found</p>
            <p className="text-sm text-text-secondary mt-1">Try a different search term</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;