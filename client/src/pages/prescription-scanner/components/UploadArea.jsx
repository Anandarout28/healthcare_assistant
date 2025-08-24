import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadArea = ({ onFileSelect, isProcessing, selectedFile }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = e?.dataTransfer?.files;
    if (files?.length > 0) {
      const file = files?.[0];
      if (file?.type?.startsWith('image/')) {
        onFileSelect(file);
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef?.current?.click();
  };

  const handleCameraClick = () => {
    cameraInputRef?.current?.click();
  };

  if (selectedFile && !isProcessing) {
    return (
      <div className="bg-surface border-2 border-border rounded-xl p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Check" size={32} className="text-success" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Image Selected Successfully
          </h3>
          <p className="text-text-secondary mb-4">
            {selectedFile?.name}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              variant="outline" 
              onClick={() => onFileSelect(null)}
              iconName="X"
              iconPosition="left"
            >
              Remove Image
            </Button>
            <Button 
              variant="default"
              onClick={handleUploadClick}
              iconName="Upload"
              iconPosition="left"
            >
              Select Different Image
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-xl p-8 text-center healthcare-transition cursor-pointer
          ${isDragOver 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
          }
          ${isProcessing ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
      >
        <div className="space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="FileImage" size={40} className="text-primary" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Upload Prescription Image
            </h3>
            <p className="text-text-secondary mb-4">
              Drag and drop your prescription image here, or click to browse
            </p>
            <div className="text-sm text-text-secondary">
              Supported formats: JPG, PNG, HEIC • Max size: 10MB
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              variant="default"
              iconName="Upload"
              iconPosition="left"
              disabled={isProcessing}
            >
              Browse Files
            </Button>
            <Button 
              variant="outline"
              iconName="Camera"
              iconPosition="left"
              onClick={(e) => {
                e?.stopPropagation();
                handleCameraClick();
              }}
              disabled={isProcessing}
            >
              Take Photo
            </Button>
          </div>
        </div>
      </div>
      {/* Upload Tips */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="Lightbulb" size={18} className="mr-2 text-warning" />
          Tips for Better Results
        </h4>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start">
            <Icon name="Check" size={16} className="mr-2 mt-0.5 text-success flex-shrink-0" />
            Ensure good lighting and avoid shadows
          </li>
          <li className="flex items-start">
            <Icon name="Check" size={16} className="mr-2 mt-0.5 text-success flex-shrink-0" />
            Keep the prescription flat and fully visible
          </li>
          <li className="flex items-start">
            <Icon name="Check" size={16} className="mr-2 mt-0.5 text-success flex-shrink-0" />
            Avoid blurry or tilted images
          </li>
          <li className="flex items-start">
            <Icon name="Check" size={16} className="mr-2 mt-0.5 text-success flex-shrink-0" />
            Include all prescription details in the frame
          </li>
        </ul>
      </div>
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default UploadArea;