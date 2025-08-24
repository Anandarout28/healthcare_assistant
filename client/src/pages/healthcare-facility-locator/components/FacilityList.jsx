import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import FacilityCard from './FacilityCard';

const FacilityList = ({ 
  facilities, 
  selectedFacility, 
  onFacilitySelect, 
  onGetDirections, 
  onCall,
  isLoading 
}) => {
  const [sortBy, setSortBy] = useState('distance');

  const sortOptions = [
    { value: 'distance', label: 'Distance', icon: 'Navigation' },
    { value: 'rating', label: 'Rating', icon: 'Star' },
    { value: 'name', label: 'Name', icon: 'AlphabeticalSort' }
  ];

  const sortedFacilities = [...facilities]?.sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return parseFloat(a?.distance) - parseFloat(b?.distance);
      case 'rating':
        return b?.rating - a?.rating;
      case 'name':
        return a?.name?.localeCompare(b?.name);
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)]?.map((_, index) => (
          <div key={index} className="bg-surface border border-border rounded-lg p-4 animate-pulse">
            <div className="h-32 bg-muted rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (facilities?.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="MapPin" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">No facilities found</h3>
        <p className="text-text-secondary mb-4">
          Try adjusting your search criteria or location
        </p>
        <Button variant="outline">
          <Icon name="Search" size={16} className="mr-2" />
          Search again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="ArrowUpDown" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">Sort by:</span>
        </div>
        
        <div className="flex space-x-1">
          {sortOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setSortBy(option?.value)}
              className={`
                flex items-center px-3 py-1.5 rounded-md text-sm font-medium healthcare-transition
                ${sortBy === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }
              `}
            >
              <Icon name={option?.icon} size={14} className="mr-1" />
              {option?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Results Count */}
      <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">
            {facilities?.length} facilities found
          </span>
        </div>
        
        <div className="text-xs text-text-secondary">
          Sorted by {sortOptions?.find(opt => opt?.value === sortBy)?.label?.toLowerCase()}
        </div>
      </div>
      {/* Facility Cards */}
      <div className="space-y-4">
        {sortedFacilities?.map((facility) => (
          <FacilityCard
            key={facility?.id}
            facility={facility}
            isSelected={selectedFacility?.id === facility?.id}
            onSelect={onFacilitySelect}
            onGetDirections={onGetDirections}
            onCall={onCall}
          />
        ))}
      </div>
      {/* Load More Button (if needed) */}
      {facilities?.length >= 10 && (
        <div className="text-center pt-4">
          <Button variant="outline">
            <Icon name="MoreHorizontal" size={16} className="mr-2" />
            Load more facilities
          </Button>
        </div>
      )}
    </div>
  );
};

export default FacilityList;