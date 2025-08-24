import React from 'react';
import Icon from '../../../components/AppIcon';
import MedicineCard from './MedicineCard';

const SearchResults = ({ 
  medicines, 
  loading, 
  searchTerm, 
  onMedicineSelect, 
  resultsCount 
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin mb-4">
          <Icon name="Loader" size={32} className="text-primary" />
        </div>
        <p className="text-text-secondary">Searching medicines...</p>
      </div>
    );
  }

  if (!searchTerm) {
    return (
      <div className="text-center py-12">
        <Icon name="Search" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
        <h3 className="text-lg font-medium text-text-primary mb-2">
          Search for Medicines
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">
          Enter a medicine name, active ingredient, or condition to find detailed 
          information about medications.
        </p>
      </div>
    );
  }

  if (medicines?.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="SearchX" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
        <h3 className="text-lg font-medium text-text-primary mb-2">
          No medicines found
        </h3>
        <p className="text-text-secondary max-w-md mx-auto mb-4">
          We couldn't find any medicines matching "{searchTerm}". 
          Try searching with different terms or check your spelling.
        </p>
        <div className="text-sm text-text-secondary">
          <p className="mb-2">Search suggestions:</p>
          <ul className="space-y-1">
            <li>• Try generic names (e.g., "acetaminophen" instead of "Tylenol")</li>
            <li>• Use medical conditions (e.g., "headache", "fever")</li>
            <li>• Check spelling and try partial matches</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">
            Search Results
          </h2>
          <p className="text-text-secondary">
            Found {resultsCount} medicine{resultsCount !== 1 ? 's' : ''} for "{searchTerm}"
          </p>
        </div>
        
        {/* Sort Options */}
        <div className="hidden sm:flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Sort by:</span>
          <select className="text-sm border border-border rounded px-2 py-1 bg-surface text-text-primary">
            <option value="relevance">Relevance</option>
            <option value="name">Name A-Z</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="prescription">Prescription Status</option>
          </select>
        </div>
      </div>
      {/* Results Grid */}
      <div className="space-y-4">
        {medicines?.map((medicine) => (
          <MedicineCard
            key={medicine?.id}
            medicine={medicine}
            onSelect={onMedicineSelect}
          />
        ))}
      </div>
      {/* Load More Button (if needed) */}
      {medicines?.length >= 10 && (
        <div className="text-center mt-8">
          <button className="inline-flex items-center px-6 py-3 bg-surface border border-border rounded-lg text-text-secondary hover:text-text-primary hover:border-primary/30 healthcare-transition">
            <Icon name="ChevronDown" size={16} className="mr-2" />
            Load More Results
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;