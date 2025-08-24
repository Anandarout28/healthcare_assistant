import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MedicineDetails = ({ medicine, onBack }) => {
  const [activeTab, setActiveTab] = useState('uses');
  const [imageZoomed, setImageZoomed] = useState(false);

  const tabs = [
    { id: 'uses', label: 'Uses', icon: 'Target' },
    { id: 'sideEffects', label: 'Side Effects', icon: 'AlertTriangle' },
    { id: 'dosage', label: 'Dosage', icon: 'Clock' },
    { id: 'warnings', label: 'Warnings', icon: 'Shield' }
  ];

  const renderUsesContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-text-primary mb-3">Primary Conditions Treated</h4>
        <div className="grid gap-3">
          {medicine?.detailedUses?.map((use, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h5 className="font-medium text-text-primary">{use?.condition}</h5>
                <p className="text-sm text-text-secondary mt-1">{use?.description}</p>
                {use?.effectiveness && (
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-text-secondary mr-2">Effectiveness:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5]?.map((star) => (
                        <Icon
                          key={star}
                          name="Star"
                          size={12}
                          className={star <= use?.effectiveness ? 'text-warning fill-current' : 'text-border'}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-text-primary mb-3">How It Works</h4>
        <p className="text-text-secondary leading-relaxed">{medicine?.mechanism}</p>
      </div>
    </div>
  );

  const renderSideEffectsContent = () => (
    <div className="space-y-6">
      {medicine?.sideEffects?.map((category, index) => (
        <div key={index}>
          <div className="flex items-center mb-3">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              category?.severity === 'common' ? 'bg-success' :
              category?.severity === 'uncommon' ? 'bg-warning' : 'bg-error'
            }`}></div>
            <h4 className="font-semibold text-text-primary capitalize">
              {category?.severity} Side Effects
            </h4>
          </div>
          <div className="grid gap-2">
            {category?.effects?.map((effect, effectIndex) => (
              <div key={effectIndex} className="flex items-center space-x-2 text-sm">
                <Icon name="Minus" size={12} className="text-text-secondary" />
                <span className="text-text-secondary">{effect}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-error/5 border border-error/20 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="AlertTriangle" size={20} className="text-error flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-medium text-error mb-1">Seek Immediate Medical Attention</h5>
            <p className="text-sm text-text-secondary">
              Contact your doctor immediately if you experience severe allergic reactions, 
              difficulty breathing, or any symptoms that concern you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDosageContent = () => (
    <div className="space-y-6">
      {medicine?.dosageInfo?.map((dosage, index) => (
        <div key={index} className="border border-border rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Icon name="Users" size={18} className="text-primary mr-2" />
            <h4 className="font-semibold text-text-primary">{dosage?.ageGroup}</h4>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-text-primary mb-2">Standard Dose</h5>
              <p className="text-text-secondary">{dosage?.standardDose}</p>
            </div>
            <div>
              <h5 className="font-medium text-text-primary mb-2">Frequency</h5>
              <p className="text-text-secondary">{dosage?.frequency}</p>
            </div>
          </div>
          
          {dosage?.instructions && (
            <div className="mt-3 pt-3 border-t border-border">
              <h5 className="font-medium text-text-primary mb-2">Instructions</h5>
              <ul className="space-y-1">
                {dosage?.instructions?.map((instruction, instrIndex) => (
                  <li key={instrIndex} className="flex items-start space-x-2 text-sm">
                    <Icon name="Check" size={12} className="text-success flex-shrink-0 mt-1" />
                    <span className="text-text-secondary">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-medium text-warning mb-1">Important Dosage Notes</h5>
            <p className="text-sm text-text-secondary">
              Always follow your doctor's prescribed dosage. Do not exceed the recommended dose 
              without medical supervision. Consult your healthcare provider for personalized dosing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWarningsContent = () => (
    <div className="space-y-6">
      {medicine?.warnings?.contraindications && (
        <div className="bg-error/5 border border-error/20 rounded-lg p-4">
          <div className="flex items-start space-x-2 mb-3">
            <Icon name="XCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
            <h4 className="font-semibold text-error">Contraindications</h4>
          </div>
          <ul className="space-y-2">
            {medicine?.warnings?.contraindications?.map((item, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <Icon name="Minus" size={12} className="text-error flex-shrink-0 mt-1" />
                <span className="text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {medicine?.warnings?.drugInteractions && (
        <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-2 mb-3">
            <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <h4 className="font-semibold text-warning">Drug Interactions</h4>
          </div>
          <div className="grid gap-3">
            {medicine?.warnings?.drugInteractions?.map((interaction, index) => (
              <div key={index} className="border border-warning/30 rounded p-3">
                <h5 className="font-medium text-text-primary mb-1">{interaction?.drug}</h5>
                <p className="text-sm text-text-secondary">{interaction?.effect}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {medicine?.warnings?.precautions && (
        <div>
          <h4 className="font-semibold text-text-primary mb-3 flex items-center">
            <Icon name="Shield" size={18} className="mr-2" />
            General Precautions
          </h4>
          <ul className="space-y-2">
            {medicine?.warnings?.precautions?.map((precaution, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <Icon name="Check" size={12} className="text-primary flex-shrink-0 mt-1" />
                <span className="text-text-secondary">{precaution}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'uses':
        return renderUsesContent();
      case 'sideEffects':
        return renderSideEffectsContent();
      case 'dosage':
        return renderDosageContent();
      case 'warnings':
        return renderWarningsContent();
      default:
        return renderUsesContent();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          iconName="ArrowLeft"
          iconPosition="left"
          iconSize={16}
          className="mr-4"
        >
          Back to Search
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-text-primary">{medicine?.name}</h1>
          {medicine?.genericName && medicine?.genericName !== medicine?.name && (
            <p className="text-text-secondary">Generic: {medicine?.genericName}</p>
          )}
        </div>
      </div>
      {/* Medicine Overview */}
      <div className="bg-surface border border-border rounded-lg p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Medicine Image */}
          <div className="md:col-span-1">
            <div className="relative">
              <div 
                className={`bg-muted rounded-lg overflow-hidden cursor-pointer ${
                  imageZoomed ? 'fixed inset-4 z-50 bg-background/95 flex items-center justify-center' : 'aspect-square'
                }`}
                onClick={() => setImageZoomed(!imageZoomed)}
              >
                <Image
                  src={medicine?.image}
                  alt={`${medicine?.name} packaging`}
                  className={`object-cover healthcare-transition ${
                    imageZoomed ? 'max-w-full max-h-full' : 'w-full h-full hover:scale-105'
                  }`}
                />
                {imageZoomed && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e?.stopPropagation();
                      setImageZoomed(false);
                    }}
                    className="absolute top-4 right-4 bg-background/80"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                )}
              </div>
              {!imageZoomed && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-background/50 healthcare-transition">
                  <Icon name="ZoomIn" size={24} className="text-text-primary" />
                </div>
              )}
            </div>
          </div>

          {/* Medicine Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-text-primary mb-2">Basic Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Form:</span>
                    <span className="text-text-primary">{medicine?.form}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Strength:</span>
                    <span className="text-text-primary">{medicine?.strength}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Manufacturer:</span>
                    <span className="text-text-primary">{medicine?.manufacturer}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-text-primary mb-2">Prescription Status</h3>
                <div className="space-y-2">
                  {medicine?.prescriptionRequired ? (
                    <span className="inline-flex items-center px-3 py-1 bg-warning/10 text-warning text-sm font-medium rounded-full">
                      <Icon name="FileText" size={14} className="mr-1" />
                      Prescription Required
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 bg-success/10 text-success text-sm font-medium rounded-full">
                      <Icon name="ShoppingCart" size={14} className="mr-1" />
                      Over-the-Counter
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Add to My Medicines
              </Button>
              <Button
                variant="outline"
                iconName="Bell"
                iconPosition="left"
                iconSize={16}
              >
                Set Reminder
              </Button>
              <Button
                variant="ghost"
                iconName="Share"
                iconPosition="left"
                iconSize={16}
              >
                Share with Doctor
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap healthcare-transition min-w-0 ${
                  activeTab === tab?.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={tab?.icon} size={16} className="mr-2" />
                {tab?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;