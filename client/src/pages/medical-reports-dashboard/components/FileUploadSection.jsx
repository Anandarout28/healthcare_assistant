import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadSection = ({ onFileUpload, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

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
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files?.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      return validTypes?.includes(file?.type) && file?.size <= 10 * 1024 * 1024; // 10MB limit
    });

    if (validFiles?.length > 0) {
      onFileUpload(validFiles);
    }
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-text-primary">Upload Medical Reports</h2>
        <Icon name="Upload" size={24} className="text-primary" />
      </div>

      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center healthcare-transition
          ${isDragOver 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }
          ${isProcessing ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon 
              name={isProcessing ? "Loader" : "FileText"} 
              size={32} 
              className={`text-primary ${isProcessing ? 'animate-spin' : ''}`} 
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-text-primary">
              {isProcessing ? 'Processing Reports...' : 'Drop your medical reports here'}
            </h3>
            <p className="text-text-secondary">
              {isProcessing 
                ? 'Please wait while we analyze your documents'
                : 'or click to browse files'
              }
            </p>
          </div>

          {!isProcessing && (
            <div className="flex flex-wrap justify-center gap-2 text-sm text-text-secondary">
              <span className="bg-muted px-2 py-1 rounded">PDF</span>
              <span className="bg-muted px-2 py-1 rounded">JPG</span>
              <span className="bg-muted px-2 py-1 rounded">PNG</span>
              <span className="text-xs">Max 10MB each</span>
            </div>
          )}

          {!isProcessing && (
            <Button variant="outline" className="mt-4">
              <Icon name="Plus" size={16} className="mr-2" />
              Select Files
            </Button>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex items-center space-x-4 text-sm text-text-secondary">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span>HIPAA Compliant</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={16} className="text-success" />
          <span>End-to-End Encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default FileUploadSection;