import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingIndicator = ({ isProcessing, progress = 0 }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const processingSteps = [
    {
      id: 1,
      label: "Analyzing Image",
      description: "Detecting text and prescription elements",
      icon: "ScanLine"
    },
    {
      id: 2,
      label: "Extracting Text",
      description: "Converting image to readable text using OCR",
      icon: "FileText"
    },
    {
      id: 3,
      label: "Processing Data",
      description: "Identifying medicines, dosages, and instructions",
      icon: "Pill"
    },
    {
      id: 4,
      label: "Finalizing Results",
      description: "Structuring prescription information",
      icon: "Check"
    }
  ];

  useEffect(() => {
    if (isProcessing) {
      const stepDuration = 2000; // 2 seconds per step
      const totalSteps = processingSteps?.length;
      
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < totalSteps - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, stepDuration);

      // Animate progress bar
      const progressInterval = setInterval(() => {
        setAnimatedProgress(prev => {
          if (prev < progress) {
            return Math.min(prev + 2, progress);
          }
          return prev;
        });
      }, 50);

      return () => {
        clearInterval(interval);
        clearInterval(progressInterval);
      };
    } else {
      setCurrentStep(0);
      setAnimatedProgress(0);
    }
  }, [isProcessing, progress]);

  if (!isProcessing) {
    return null;
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon 
            name="Loader" 
            size={32} 
            className="text-primary animate-spin" 
          />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Processing Your Prescription
        </h3>
        <p className="text-text-secondary">
          Please wait while we analyze your prescription image
        </p>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-text-secondary mb-2">
          <span>Progress</span>
          <span>{Math.round(animatedProgress)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full healthcare-transition-slow"
            style={{ width: `${animatedProgress}%` }}
          />
        </div>
      </div>
      {/* Processing Steps */}
      <div className="space-y-4">
        {processingSteps?.map((step, index) => (
          <div 
            key={step?.id}
            className={`
              flex items-start space-x-4 p-3 rounded-lg healthcare-transition
              ${index === currentStep 
                ? 'bg-primary/5 border border-primary/20' 
                : index < currentStep 
                  ? 'bg-success/5' :'bg-muted/50'
              }
            `}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
              ${index === currentStep 
                ? 'bg-primary text-white' 
                : index < currentStep 
                  ? 'bg-success text-white' :'bg-border text-text-secondary'
              }
            `}>
              {index < currentStep ? (
                <Icon name="Check" size={16} />
              ) : index === currentStep ? (
                <Icon name={step?.icon} size={16} className="animate-pulse" />
              ) : (
                <Icon name={step?.icon} size={16} />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className={`
                font-medium
                ${index === currentStep 
                  ? 'text-primary' 
                  : index < currentStep 
                    ? 'text-success' :'text-text-secondary'
                }
              `}>
                {step?.label}
              </div>
              <div className="text-sm text-text-secondary mt-1">
                {step?.description}
              </div>
            </div>

            {index === currentStep && (
              <div className="flex-shrink-0">
                <Icon name="Loader" size={16} className="text-primary animate-spin" />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Processing Time Estimate */}
      <div className="mt-6 text-center">
        <div className="text-sm text-text-secondary">
          Estimated time remaining: {Math.max(0, 8 - currentStep * 2)} seconds
        </div>
      </div>
    </div>
  );
};

export default ProcessingIndicator;