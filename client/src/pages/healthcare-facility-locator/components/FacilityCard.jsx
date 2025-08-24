import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const FacilityCard = ({ facility, onSelect, onGetDirections, onCall, isSelected }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'hospital':
        return { icon: 'Cross', color: 'text-red-500', bg: 'bg-red-50' };
      case 'clinic':
        return { icon: 'Stethoscope', color: 'text-blue-500', bg: 'bg-blue-50' };
      case 'pharmacy':
        return { icon: 'Pill', color: 'text-green-500', bg: 'bg-green-50' };
      case 'urgent_care':
        return { icon: 'Zap', color: 'text-amber-500', bg: 'bg-amber-50' };
      default:
        return { icon: 'MapPin', color: 'text-gray-500', bg: 'bg-gray-50' };
    }
  };

  const typeInfo = getTypeIcon(facility?.type);

  const formatOperatingHours = (hours) => {
    if (!hours) return 'Hours not available';
    const today = new Date()?.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayHours = hours?.[days?.[today]?.toLowerCase()];
    return todayHours || 'Closed today';
  };

  const getStatusColor = (isOpen) => {
    return isOpen ? 'text-success' : 'text-error';
  };

  return (
    <div 
      className={`
        bg-surface border rounded-lg healthcare-shadow-sm healthcare-transition cursor-pointer
        ${isSelected ? 'border-primary ring-2 ring-primary ring-opacity-20' : 'border-border hover:border-primary hover:healthcare-shadow-md'}
      `}
      onClick={() => onSelect(facility)}
    >
      {/* Facility Image */}
      <div className="relative h-32 overflow-hidden rounded-t-lg">
        <Image
          src={facility?.image}
          alt={facility?.name}
          className="w-full h-full object-cover"
        />
        
        {/* Type Badge */}
        <div className={`absolute top-3 left-3 flex items-center px-2 py-1 rounded-full ${typeInfo?.bg} backdrop-blur-sm`}>
          <Icon name={typeInfo?.icon} size={14} className={`mr-1 ${typeInfo?.color}`} />
          <span className={`text-xs font-medium ${typeInfo?.color} capitalize`}>
            {facility?.type?.replace('_', ' ')}
          </span>
        </div>

        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full bg-surface backdrop-blur-sm border`}>
          <span className={`text-xs font-medium ${getStatusColor(facility?.isOpen)}`}>
            {facility?.isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>
      {/* Facility Info */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary truncate">
              {facility?.name}
            </h3>
            <p className="text-sm text-text-secondary truncate">
              {facility?.address}
            </p>
          </div>
        </div>

        {/* Rating and Distance */}
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning fill-current" />
            <span className="text-sm font-medium">{facility?.rating}</span>
            <span className="text-sm text-text-secondary">({facility?.reviewCount})</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">{facility?.distance}</span>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Clock" size={14} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">
            {formatOperatingHours(facility?.operatingHours)}
          </span>
        </div>

        {/* Services */}
        {facility?.services && facility?.services?.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {facility?.services?.slice(0, 3)?.map((service, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-xs text-text-secondary rounded"
                >
                  {service}
                </span>
              ))}
              {facility?.services?.length > 3 && (
                <span className="px-2 py-1 bg-muted text-xs text-text-secondary rounded">
                  +{facility?.services?.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={(e) => {
              e?.stopPropagation();
              onGetDirections(facility);
            }}
            className="flex-1"
          >
            <Icon name="Navigation" size={16} className="mr-2" />
            Directions
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e?.stopPropagation();
              onCall(facility);
            }}
          >
            <Icon name="Phone" size={16} className="mr-2" />
            Call
          </Button>
        </div>

        {/* Additional Info for Selected Card */}
        {isSelected && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Phone:</span>
                <span className="text-text-primary font-medium">{facility?.phone}</span>
              </div>
              
              {facility?.website && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Website:</span>
                  <a 
                    href={facility?.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                    onClick={(e) => e?.stopPropagation()}
                  >
                    Visit site
                  </a>
                </div>
              )}
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Emergency:</span>
                <span className={`font-medium ${facility?.hasEmergency ? 'text-success' : 'text-text-secondary'}`}>
                  {facility?.hasEmergency ? 'Available' : 'Not available'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilityCard;