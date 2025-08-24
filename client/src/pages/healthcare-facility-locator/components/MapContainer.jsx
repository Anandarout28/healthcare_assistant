import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapContainer = ({ 
  selectedFacility, 
  onFacilitySelect, 
  userLocation, 
  facilities, 
  mapCenter, 
  onMapCenterChange 
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(14);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLocationClick = () => {
    if (userLocation) {
      onMapCenterChange(userLocation);
      setCurrentZoom(16);
    }
  };

  const handleZoomIn = () => {
    setCurrentZoom(prev => Math.min(prev + 1, 20));
  };

  const handleZoomOut = () => {
    setCurrentZoom(prev => Math.max(prev - 1, 8));
  };

  const handleFacilityMarkerClick = (facility) => {
    onFacilitySelect(facility);
    onMapCenterChange({ lat: facility?.latitude, lng: facility?.longitude });
  };

  const getMarkerIcon = (type) => {
    switch (type) {
      case 'hospital':
        return { icon: 'Cross', color: '#EF4444', bgColor: '#FEE2E2' };
      case 'clinic':
        return { icon: 'Stethoscope', color: '#3B82F6', bgColor: '#DBEAFE' };
      case 'pharmacy':
        return { icon: 'Pill', color: '#10B981', bgColor: '#D1FAE5' };
      case 'urgent_care':
        return { icon: 'Zap', color: '#F59E0B', bgColor: '#FEF3C7' };
      default:
        return { icon: 'MapPin', color: '#6B7280', bgColor: '#F3F4F6' };
    }
  };

  if (!mapLoaded) {
    return (
      <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Icon name="Loader" size={32} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-text-secondary">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      {/* Google Maps Iframe */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Healthcare Facilities Map"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${currentZoom}&output=embed`}
        className="absolute inset-0"
      />
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="bg-surface healthcare-shadow-md"
          aria-label="Zoom in"
        >
          <Icon name="Plus" size={20} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="bg-surface healthcare-shadow-md"
          aria-label="Zoom out"
        >
          <Icon name="Minus" size={20} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleLocationClick}
          className="bg-surface healthcare-shadow-md"
          aria-label="Current location"
        >
          <Icon name="Navigation" size={20} />
        </Button>
      </div>
      {/* Facility Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {facilities?.map((facility) => {
          const marker = getMarkerIcon(facility?.type);
          // Calculate position based on lat/lng (simplified positioning)
          const x = ((facility?.longitude - mapCenter?.lng) * 100000) + 50;
          const y = ((mapCenter?.lat - facility?.latitude) * 100000) + 50;
          
          if (x < 0 || x > 100 || y < 0 || y > 100) return null;

          return (
            <div
              key={facility?.id}
              className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2 healthcare-transition hover:scale-110"
              style={{ 
                left: `${x}%`, 
                top: `${y}%`,
                zIndex: selectedFacility?.id === facility?.id ? 20 : 10
              }}
              onClick={() => handleFacilityMarkerClick(facility)}
            >
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center healthcare-shadow-md
                  ${selectedFacility?.id === facility?.id ? 'ring-2 ring-primary' : ''}
                `}
                style={{ backgroundColor: marker?.bgColor }}
              >
                <Icon name={marker?.icon} size={20} color={marker?.color} />
              </div>
            </div>
          );
        })}

        {/* User Location Marker */}
        {userLocation && (
          <div
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: `${((userLocation?.lng - mapCenter?.lng) * 100000) + 50}%`, 
              top: `${((mapCenter?.lat - userLocation?.lat) * 100000) + 50}%`,
              zIndex: 15
            }}
          >
            <div className="relative">
              <div className="w-4 h-4 bg-primary rounded-full border-2 border-white healthcare-shadow-md" />
              <div className="absolute inset-0 w-8 h-8 bg-primary opacity-20 rounded-full animate-pulse -translate-x-2 -translate-y-2" />
            </div>
          </div>
        )}
      </div>
      {/* Selected Facility Popup */}
      {selectedFacility && (
        <div className="absolute bottom-4 left-4 right-4 bg-surface border border-border rounded-lg healthcare-shadow-lg p-4 z-20">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary">{selectedFacility?.name}</h3>
              <p className="text-sm text-text-secondary">{selectedFacility?.address}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onFacilitySelect(null)}
              className="ml-2"
              aria-label="Close popup"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="text-sm font-medium">{selectedFacility?.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">{selectedFacility?.distance}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">
                {selectedFacility?.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="default" size="sm" className="flex-1">
              <Icon name="Navigation" size={16} className="mr-2" />
              Directions
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Phone" size={16} className="mr-2" />
              Call
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapContainer;