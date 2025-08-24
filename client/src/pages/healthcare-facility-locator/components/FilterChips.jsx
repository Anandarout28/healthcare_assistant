import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onFilterChange, facilityCount }) => {
  const filterOptions = [
    {
      id: 'all',
      label: 'All',
      icon: 'MapPin',
      color: 'text-text-primary',
      bgColor: 'bg-muted'
    },
    {
      id: 'hospital',
      label: 'Hospitals',
      icon: 'Cross',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'clinic',
      label: 'Clinics',
      icon: 'Stethoscope',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'pharmacy',
      label: 'Pharmacies',
      icon: 'Pill',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'urgent_care',
      label: 'Urgent Care',
      icon: 'Zap',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  const handleFilterClick = (filterId) => {
    if (filterId === 'all') {
      onFilterChange([]);
    } else {
      const newFilters = activeFilters?.includes(filterId)
        ? activeFilters?.filter(f => f !== filterId)
        : [...activeFilters, filterId];
      onFilterChange(newFilters);
    }
  };

  const isActive = (filterId) => {
    if (filterId === 'all') {
      return activeFilters?.length === 0;
    }
    return activeFilters?.includes(filterId);
  };

  const getActiveCount = (filterId) => {
    if (filterId === 'all') {
      return facilityCount?.total || 0;
    }
    return facilityCount?.[filterId] || 0;
  };

  return (
    <div className="w-full">
      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filterOptions?.map((filter) => {
          const active = isActive(filter?.id);
          const count = getActiveCount(filter?.id);
          
          return (
            <button
              key={filter?.id}
              onClick={() => handleFilterClick(filter?.id)}
              className={`
                flex items-center px-3 py-2 rounded-full text-sm font-medium healthcare-transition
                border min-h-[40px]
                ${active
                  ? `${filter?.bgColor} ${filter?.color} border-current`
                  : 'bg-surface text-text-secondary border-border hover:bg-muted hover:text-text-primary'
                }
              `}
            >
              <Icon 
                name={filter?.icon} 
                size={16} 
                className="mr-2" 
              />
              <span>{filter?.label}</span>
              {count > 0 && (
                <span className={`
                  ml-2 px-2 py-0.5 rounded-full text-xs font-semibold
                  ${active 
                    ? 'bg-white bg-opacity-80 text-current' :'bg-muted text-text-secondary'
                  }
                `}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {/* Active Filters Summary */}
      {activeFilters?.length > 0 && (
        <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {activeFilters?.length} filter{activeFilters?.length !== 1 ? 's' : ''} active
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange([])}
            className="text-text-secondary hover:text-text-primary"
          >
            Clear all
          </Button>
        </div>
      )}
      {/* Results Count */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">
            {facilityCount?.total || 0} facilities found
          </span>
        </div>
        
        <div className="flex items-center space-x-1 text-xs text-text-secondary">
          <Icon name="Navigation" size={12} />
          <span>Sorted by distance</span>
        </div>
      </div>
    </div>
  );
};

export default FilterChips;