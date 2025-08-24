import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MedicineCard = ({ medicine, onSelect }) => {
  const [imageError, setImageError] = useState(false);

  const getPrescriptionBadge = () => {
    if (medicine?.prescriptionRequired) {
      return (
        <span className="inline-flex items-center px-2 py-1 bg-warning/10 text-warning text-xs font-medium rounded-full">
          <Icon name="FileText" size={12} className="mr-1" />
          Prescription Required
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
        <Icon name="ShoppingCart" size={12} className="mr-1" />
        Over-the-Counter
      </span>
    );
  };

  const getStrengthDisplay = () => {
    if (medicine?.strengths && medicine?.strengths?.length > 0) {
      return medicine?.strengths?.join(', ');
    }
    return medicine?.strength || 'Various strengths';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:border-primary/30 healthcare-transition cursor-pointer group">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Medicine Image */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-lg overflow-hidden">
            {!imageError ? (
              <Image
                src={medicine?.image}
                alt={`${medicine?.name} packaging`}
                className="w-full h-full object-cover group-hover:scale-105 healthcare-transition"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon name="Pill" size={24} className="text-text-secondary" />
              </div>
            )}
          </div>
        </div>

        {/* Medicine Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary text-lg group-hover:text-primary healthcare-transition">
                {medicine?.name}
              </h3>
              {medicine?.genericName && medicine?.genericName !== medicine?.name && (
                <p className="text-sm text-text-secondary">
                  Generic: {medicine?.genericName}
                </p>
              )}
            </div>
            {getPrescriptionBadge()}
          </div>

          <div className="space-y-2 mb-3">
            <div className="flex items-center text-sm text-text-secondary">
              <Icon name="Zap" size={16} className="mr-2" />
              <span>Strength: {getStrengthDisplay()}</span>
            </div>
            
            <div className="flex items-center text-sm text-text-secondary">
              <Icon name="Package" size={16} className="mr-2" />
              <span>Form: {medicine?.form}</span>
            </div>
            
            {medicine?.manufacturer && (
              <div className="flex items-center text-sm text-text-secondary">
                <Icon name="Building" size={16} className="mr-2" />
                <span>Manufacturer: {medicine?.manufacturer}</span>
              </div>
            )}
          </div>

          {/* Primary Uses */}
          {medicine?.primaryUses && medicine?.primaryUses?.length > 0 && (
            <div className="mb-3">
              <p className="text-sm text-text-secondary mb-1">Primary uses:</p>
              <div className="flex flex-wrap gap-1">
                {medicine?.primaryUses?.slice(0, 3)?.map((use, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 bg-muted text-text-secondary text-xs rounded"
                  >
                    {use}
                  </span>
                ))}
                {medicine?.primaryUses?.length > 3 && (
                  <span className="inline-block px-2 py-1 bg-muted text-text-secondary text-xs rounded">
                    +{medicine?.primaryUses?.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => onSelect(medicine)}
              iconName="Eye"
              iconPosition="left"
              iconSize={16}
            >
              View Details
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Add to List
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Share"
              iconSize={16}
              className="sm:ml-auto"
            >
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;