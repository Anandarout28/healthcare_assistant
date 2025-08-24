import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const PrescriptionResults = ({ results, onEdit, onSave, onRetry }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedMedicine, setEditedMedicine] = useState({});

  const handleEditStart = (index, medicine) => {
    setEditingIndex(index);
    setEditedMedicine({ ...medicine });
  };

  const handleEditSave = (index) => {
    onEdit(index, editedMedicine);
    setEditingIndex(null);
    setEditedMedicine({});
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditedMedicine({});
  };

  const handleInputChange = (field, value) => {
    setEditedMedicine(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!results || results?.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6 text-center">
        <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="AlertTriangle" size={32} className="text-warning" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          No Prescription Data Found
        </h3>
        <p className="text-text-secondary mb-4">
          We couldn't extract prescription information from the image. Please try again with a clearer image.
        </p>
        <Button 
          variant="default" 
          onClick={onRetry}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Prescription Results
            </h3>
            <p className="text-text-secondary">
              {results?.length} medicine{results?.length !== 1 ? 's' : ''} found. Review and edit if needed.
            </p>
          </div>
          <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="Check" size={24} className="text-success" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="default" 
            onClick={onSave}
            iconName="Save"
            iconPosition="left"
            className="flex-1 sm:flex-none"
          >
            Save to Profile
          </Button>
          <Button 
            variant="outline" 
            onClick={onRetry}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Scan New Prescription
          </Button>
        </div>
      </div>
      {/* Medicine Cards */}
      <div className="space-y-4">
        {results?.map((medicine, index) => (
          <div key={index} className="bg-surface border border-border rounded-xl p-6">
            {editingIndex === index ? (
              // Edit Mode
              (<div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-text-primary">
                    Edit Medicine Details
                  </h4>
                  <div className="flex space-x-2">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleEditSave(index)}
                      iconName="Check"
                    >
                      Save
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleEditCancel}
                      iconName="X"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Medicine Name"
                    type="text"
                    value={editedMedicine?.name || ''}
                    onChange={(e) => handleInputChange('name', e?.target?.value)}
                    placeholder="Enter medicine name"
                  />
                  <Input
                    label="Dosage"
                    type="text"
                    value={editedMedicine?.dosage || ''}
                    onChange={(e) => handleInputChange('dosage', e?.target?.value)}
                    placeholder="e.g., 500mg"
                  />
                  <Input
                    label="Frequency"
                    type="text"
                    value={editedMedicine?.frequency || ''}
                    onChange={(e) => handleInputChange('frequency', e?.target?.value)}
                    placeholder="e.g., Twice daily"
                  />
                  <Input
                    label="Duration"
                    type="text"
                    value={editedMedicine?.duration || ''}
                    onChange={(e) => handleInputChange('duration', e?.target?.value)}
                    placeholder="e.g., 7 days"
                  />
                </div>
                <Input
                  label="Special Instructions"
                  type="text"
                  value={editedMedicine?.instructions || ''}
                  onChange={(e) => handleInputChange('instructions', e?.target?.value)}
                  placeholder="e.g., Take after meals"
                />
              </div>)
            ) : (
              // View Mode
              (<div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Image
                        src={medicine?.image || `https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop`}
                        alt={medicine?.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-text-primary mb-1">
                        {medicine?.name}
                      </h4>
                      <div className="text-sm text-text-secondary space-y-1">
                        <div className="flex items-center">
                          <Icon name="Pill" size={14} className="mr-2" />
                          Dosage: {medicine?.dosage}
                        </div>
                        <div className="flex items-center">
                          <Icon name="Clock" size={14} className="mr-2" />
                          Frequency: {medicine?.frequency}
                        </div>
                        {medicine?.duration && (
                          <div className="flex items-center">
                            <Icon name="Calendar" size={14} className="mr-2" />
                            Duration: {medicine?.duration}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditStart(index, medicine)}
                    iconName="Edit"
                  >
                    Edit
                  </Button>
                </div>
                {medicine?.instructions && (
                  <div className="bg-muted rounded-lg p-3 mb-4">
                    <div className="flex items-start">
                      <Icon name="Info" size={16} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <div>
                        <div className="font-medium text-text-primary text-sm mb-1">
                          Special Instructions
                        </div>
                        <div className="text-sm text-text-secondary">
                          {medicine?.instructions}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    iconName="Bell"
                    iconPosition="left"
                  >
                    Set Reminder
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add to List
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    iconName="Search"
                    iconPosition="left"
                  >
                    Medicine Info
                  </Button>
                </div>
              </div>)
            )}
          </div>
        ))}
      </div>
      {/* Confidence Score */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Icon name="Target" size={18} className="mr-2 text-primary" />
            <span className="font-medium text-text-primary">OCR Confidence</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-24 bg-border rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full" 
                style={{ width: '87%' }}
              />
            </div>
            <span className="text-sm font-medium text-text-primary">87%</span>
          </div>
        </div>
        <p className="text-sm text-text-secondary mt-2">
          High confidence score. Please review the extracted information for accuracy.
        </p>
      </div>
    </div>
  );
};

export default PrescriptionResults;