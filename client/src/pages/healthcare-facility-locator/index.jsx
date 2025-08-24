import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';
import SessionStatus from '../../components/ui/SessionStatus';
import Icon from '../../components/AppIcon';

import MapContainer from './components/MapContainer';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import FacilityList from './components/FacilityList';

const HealthcareFacilityLocator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // 'map', 'list', 'split'

  // Mock facilities data
  const mockFacilities = [
    {
      id: 1,
      name: "Downtown Medical Center",
      type: "hospital",
      address: "123 Main St, Downtown, NY 10001",
      latitude: 40.7589,
      longitude: -73.9851,
      distance: "0.8 mi",
      rating: 4.5,
      reviewCount: 324,
      phone: "(555) 123-4567",
      website: "https://downtownmedical.com",
      isOpen: true,
      hasEmergency: true,
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop",
      services: ["Emergency Care", "Surgery", "Cardiology", "Pediatrics"],
      operatingHours: {
        monday: "24/7",
        tuesday: "24/7",
        wednesday: "24/7",
        thursday: "24/7",
        friday: "24/7",
        saturday: "24/7",
        sunday: "24/7"
      }
    },
    {
      id: 2,
      name: "City General Hospital",
      type: "hospital",
      address: "456 Oak Ave, City Center, NY 10002",
      latitude: 40.7505,
      longitude: -73.9934,
      distance: "1.2 mi",
      rating: 4.2,
      reviewCount: 189,
      phone: "(555) 234-5678",
      website: "https://citygeneral.com",
      isOpen: true,
      hasEmergency: true,
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=200&fit=crop",
      services: ["Emergency Care", "Maternity", "Oncology", "Neurology"],
      operatingHours: {
        monday: "24/7",
        tuesday: "24/7",
        wednesday: "24/7",
        thursday: "24/7",
        friday: "24/7",
        saturday: "24/7",
        sunday: "24/7"
      }
    },
    {
      id: 3,
      name: "QuickCare Clinic",
      type: "clinic",
      address: "789 Pine St, Midtown, NY 10003",
      latitude: 40.7614,
      longitude: -73.9776,
      distance: "0.5 mi",
      rating: 4.0,
      reviewCount: 156,
      phone: "(555) 345-6789",
      isOpen: true,
      hasEmergency: false,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=200&fit=crop",
      services: ["General Practice", "Vaccinations", "Health Checkups"],
      operatingHours: {
        monday: "8:00 AM - 6:00 PM",
        tuesday: "8:00 AM - 6:00 PM",
        wednesday: "8:00 AM - 6:00 PM",
        thursday: "8:00 AM - 6:00 PM",
        friday: "8:00 AM - 6:00 PM",
        saturday: "9:00 AM - 4:00 PM",
        sunday: "Closed"
      }
    },
    {
      id: 4,
      name: "HealthPlus Pharmacy",
      type: "pharmacy",
      address: "321 Elm St, Uptown, NY 10004",
      latitude: 40.7831,
      longitude: -73.9712,
      distance: "1.8 mi",
      rating: 4.3,
      reviewCount: 89,
      phone: "(555) 456-7890",
      isOpen: true,
      hasEmergency: false,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop",
      services: ["Prescription Filling", "Vaccinations", "Health Consultations"],
      operatingHours: {
        monday: "9:00 AM - 9:00 PM",
        tuesday: "9:00 AM - 9:00 PM",
        wednesday: "9:00 AM - 9:00 PM",
        thursday: "9:00 AM - 9:00 PM",
        friday: "9:00 AM - 9:00 PM",
        saturday: "9:00 AM - 7:00 PM",
        sunday: "10:00 AM - 6:00 PM"
      }
    },
    {
      id: 5,
      name: "Emergency Care Center",
      type: "urgent_care",
      address: "654 Maple Dr, Westside, NY 10005",
      latitude: 40.7282,
      longitude: -74.0776,
      distance: "2.1 mi",
      rating: 3.9,
      reviewCount: 203,
      phone: "(555) 567-8901",
      isOpen: true,
      hasEmergency: true,
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=200&fit=crop",
      services: ["Urgent Care", "X-Ray", "Lab Tests", "Minor Surgery"],
      operatingHours: {
        monday: "7:00 AM - 11:00 PM",
        tuesday: "7:00 AM - 11:00 PM",
        wednesday: "7:00 AM - 11:00 PM",
        thursday: "7:00 AM - 11:00 PM",
        friday: "7:00 AM - 11:00 PM",
        saturday: "8:00 AM - 10:00 PM",
        sunday: "8:00 AM - 10:00 PM"
      }
    },
    {
      id: 6,
      name: "Family Health Clinic",
      type: "clinic",
      address: "987 Cedar Ln, Eastside, NY 10006",
      latitude: 40.7505,
      longitude: -73.9442,
      distance: "1.5 mi",
      rating: 4.4,
      reviewCount: 127,
      phone: "(555) 678-9012",
      isOpen: false,
      hasEmergency: false,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
      services: ["Family Medicine", "Pediatrics", "Women\'s Health"],
      operatingHours: {
        monday: "8:00 AM - 5:00 PM",
        tuesday: "8:00 AM - 5:00 PM",
        wednesday: "8:00 AM - 5:00 PM",
        thursday: "8:00 AM - 5:00 PM",
        friday: "8:00 AM - 5:00 PM",
        saturday: "Closed",
        sunday: "Closed"
      }
    }
  ];

  const [facilities, setFacilities] = useState(mockFacilities);

  useEffect(() => {
    // Get user's current location
    setIsLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const location = {
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          };
          setUserLocation(location);
          setMapCenter(location);
          setIsLocationLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocationLoading(false);
        }
      );
    } else {
      setIsLocationLoading(false);
    }
  }, []);

  const filteredFacilities = facilities?.filter(facility => {
    if (activeFilters?.length === 0) return true;
    return activeFilters?.includes(facility?.type);
  });

  const facilityCount = {
    total: facilities?.length,
    hospital: facilities?.filter(f => f?.type === 'hospital')?.length,
    clinic: facilities?.filter(f => f?.type === 'clinic')?.length,
    pharmacy: facilities?.filter(f => f?.type === 'pharmacy')?.length,
    urgent_care: facilities?.filter(f => f?.type === 'urgent_care')?.length
  };

  const handleSearch = (query) => {
    setIsLoading(true);
    // Simulate search delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleLocationSelect = (location) => {
    if (location?.type === 'current_location') {
      if (userLocation) {
        setMapCenter(userLocation);
      }
    } else {
      // For facility selection, center map on facility
      const facility = facilities?.find(f => f?.id === location?.id);
      if (facility) {
        setMapCenter({ lat: facility?.latitude, lng: facility?.longitude });
        setSelectedFacility(facility);
      }
    }
  };

  const handleFacilitySelect = (facility) => {
    setSelectedFacility(facility);
    if (facility) {
      setMapCenter({ lat: facility?.latitude, lng: facility?.longitude });
    }
  };

  const handleGetDirections = (facility) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${facility?.latitude},${facility?.longitude}`;
    window.open(url, '_blank');
  };

  const handleCall = (facility) => {
    window.location.href = `tel:${facility?.phone}`;
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  Find Healthcare Facilities
                </h1>
                <p className="text-text-secondary">
                  Locate nearby hospitals, clinics, and pharmacies with real-time information
                </p>
              </div>

              {/* View Mode Toggle - Desktop Only */}
              <div className="hidden lg:flex items-center space-x-1 bg-muted rounded-lg p-1">
                <button
                  onClick={() => handleViewModeChange('map')}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium healthcare-transition
                    ${viewMode === 'map' ? 'bg-surface text-text-primary healthcare-shadow-sm' : 'text-text-secondary hover:text-text-primary'}
                  `}
                >
                  <Icon name="Map" size={16} className="mr-2" />
                  Map
                </button>
                <button
                  onClick={() => handleViewModeChange('split')}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium healthcare-transition
                    ${viewMode === 'split' ? 'bg-surface text-text-primary healthcare-shadow-sm' : 'text-text-secondary hover:text-text-primary'}
                  `}
                >
                  <Icon name="Columns" size={16} className="mr-2" />
                  Split
                </button>
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium healthcare-transition
                    ${viewMode === 'list' ? 'bg-surface text-text-primary healthcare-shadow-sm' : 'text-text-secondary hover:text-text-primary'}
                  `}
                >
                  <Icon name="List" size={16} className="mr-2" />
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <SearchBar
              onSearch={handleSearch}
              onLocationSelect={handleLocationSelect}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            
            <FilterChips
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
              facilityCount={facilityCount}
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Map Container */}
            <div className={`
              ${viewMode === 'list' ? 'hidden lg:hidden' : ''}
              ${viewMode === 'map' ? 'lg:col-span-12' : 'lg:col-span-7'}
              ${viewMode === 'split' ? 'lg:col-span-7' : ''}
              h-96 lg:h-[600px]
            `}>
              <MapContainer
                selectedFacility={selectedFacility}
                onFacilitySelect={handleFacilitySelect}
                userLocation={userLocation}
                facilities={filteredFacilities}
                mapCenter={mapCenter}
                onMapCenterChange={setMapCenter}
              />
            </div>

            {/* Facility List */}
            <div className={`
              ${viewMode === 'map' ? 'hidden lg:hidden' : ''}
              ${viewMode === 'list' ? 'lg:col-span-12' : 'lg:col-span-5'}
              ${viewMode === 'split' ? 'lg:col-span-5' : ''}
            `}>
              <div className="bg-surface border border-border rounded-lg p-4 h-96 lg:h-[600px] overflow-y-auto">
                <FacilityList
                  facilities={filteredFacilities}
                  selectedFacility={selectedFacility}
                  onFacilitySelect={handleFacilitySelect}
                  onGetDirections={handleGetDirections}
                  onCall={handleCall}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Mobile View Mode Toggle */}
          <div className="lg:hidden fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
            <div className="flex items-center space-x-1 bg-surface border border-border rounded-full p-1 healthcare-shadow-lg">
              <button
                onClick={() => handleViewModeChange('map')}
                className={`
                  flex items-center px-4 py-2 rounded-full text-sm font-medium healthcare-transition
                  ${viewMode === 'map' ? 'bg-primary text-primary-foreground' : 'text-text-secondary'}
                `}
              >
                <Icon name="Map" size={16} className="mr-2" />
                Map
              </button>
              <button
                onClick={() => handleViewModeChange('list')}
                className={`
                  flex items-center px-4 py-2 rounded-full text-sm font-medium healthcare-transition
                  ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-text-secondary'}
                `}
              >
                <Icon name="List" size={16} className="mr-2" />
                List
              </button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="mt-8 pt-4 border-t border-border">
            <SessionStatus
              isProcessing={isLoading || isLocationLoading}
              processingType={isLocationLoading ? 'search' : 'search'}
              sessionTimeRemaining={45}
            />
          </div>
        </div>
      </main>

      <QuickActions />
    </div>
  );
};

export default HealthcareFacilityLocator;