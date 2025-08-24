import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SearchFilters = ({ filters, onFiltersChange, resultsCount }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const drugTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'tablet', label: 'Tablets' },
    { value: 'capsule', label: 'Capsules' },
    { value: 'syrup', label: 'Syrups' },
    { value: 'injection', label: 'Injections' },
    { value: 'cream', label: 'Creams & Ointments' },
    { value: 'drops', label: 'Drops' }
  ];

  const prescriptionStatusOptions = [
    { value: 'all', label: 'All Medicines' },
    { value: 'prescription', label: 'Prescription Only' },
    { value: 'otc', label: 'Over-the-Counter' }
  ];

  const manufacturerOptions = [
    { value: 'all', label: 'All Manufacturers' },
    { value: 'pfizer', label: 'Pfizer' },
    { value: 'gsk', label: 'GlaxoSmithKline' },
    { value: 'novartis', label: 'Novartis' },
    { value: 'roche', label: 'Roche' },
    { value: 'merck', label: 'Merck & Co.' },
    { value: 'abbott', label: 'Abbott' },
    { value: 'bayer', label: 'Bayer' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      drugType: 'all',
      prescriptionStatus: 'all',
      manufacturer: 'all'
    });
  };

  const hasActiveFilters = filters?.drugType !== 'all' || 
                          filters?.prescriptionStatus !== 'all' || 
                          filters?.manufacturer !== 'all';

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-text-secondary" />
          <h3 className="font-medium text-text-primary">Filters</h3>
          {resultsCount !== null && (
            <span className="text-sm text-text-secondary">
              ({resultsCount} results)
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Clear All
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={16}
            className="lg:hidden"
          >
            {isExpanded ? 'Hide' : 'Show'} Filters
          </Button>
        </div>
      </div>
      {/* Filter Controls */}
      <div className={`grid gap-4 ${isExpanded ? 'block' : 'hidden lg:grid'} lg:grid-cols-3`}>
        <Select
          label="Drug Type"
          options={drugTypeOptions}
          value={filters?.drugType}
          onChange={(value) => handleFilterChange('drugType', value)}
          className="w-full"
        />

        <Select
          label="Prescription Status"
          options={prescriptionStatusOptions}
          value={filters?.prescriptionStatus}
          onChange={(value) => handleFilterChange('prescriptionStatus', value)}
          className="w-full"
        />

        <Select
          label="Manufacturer"
          options={manufacturerOptions}
          value={filters?.manufacturer}
          onChange={(value) => handleFilterChange('manufacturer', value)}
          searchable
          className="w-full"
        />
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-text-secondary">Active filters:</span>
            
            {filters?.drugType !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                {drugTypeOptions?.find(opt => opt?.value === filters?.drugType)?.label}
                <button
                  onClick={() => handleFilterChange('drugType', 'all')}
                  className="ml-1 hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters?.prescriptionStatus !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                {prescriptionStatusOptions?.find(opt => opt?.value === filters?.prescriptionStatus)?.label}
                <button
                  onClick={() => handleFilterChange('prescriptionStatus', 'all')}
                  className="ml-1 hover:text-secondary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters?.manufacturer !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                {manufacturerOptions?.find(opt => opt?.value === filters?.manufacturer)?.label}
                <button
                  onClick={() => handleFilterChange('manufacturer', 'all')}
                  className="ml-1 hover:text-accent/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;