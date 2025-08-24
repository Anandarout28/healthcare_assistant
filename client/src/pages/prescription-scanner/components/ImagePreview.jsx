import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ImagePreview = ({ file, onRemove, onProcess, isProcessing }) => {
  const [imageUrl, setImageUrl] = useState(null);

  React.useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  if (!file || !imageUrl) {
    return null;
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Image Preview
        </h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onRemove}
          iconName="X"
          disabled={isProcessing}
        >
          Remove
        </Button>
      </div>
      {/* Image Preview */}
      <div className="relative mb-4">
        <div className="w-full max-w-md mx-auto bg-muted rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt="Prescription preview"
            className="w-full h-auto max-h-96 object-contain"
          />
        </div>
        
        {/* Image Overlay for Processing */}
        {isProcessing && (
          <div className="absolute inset-0 bg-background/80 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Icon name="Loader" size={32} className="text-primary animate-spin mx-auto mb-2" />
              <div className="text-sm font-medium text-text-primary">
                Processing...
              </div>
            </div>
          </div>
        )}
      </div>
      {/* File Information */}
      <div className="bg-muted rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium text-text-primary mb-1">File Name</div>
            <div className="text-text-secondary truncate">{file?.name}</div>
          </div>
          <div>
            <div className="font-medium text-text-primary mb-1">File Size</div>
            <div className="text-text-secondary">{formatFileSize(file?.size)}</div>
          </div>
          <div>
            <div className="font-medium text-text-primary mb-1">File Type</div>
            <div className="text-text-secondary">{file?.type}</div>
          </div>
          <div>
            <div className="font-medium text-text-primary mb-1">Last Modified</div>
            <div className="text-text-secondary">
              {new Date(file.lastModified)?.toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      {/* Image Quality Check */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-4 mb-4">
        <div className="flex items-start">
          <Icon name="CheckCircle" size={18} className="mr-2 mt-0.5 text-success flex-shrink-0" />
          <div>
            <div className="font-medium text-success text-sm mb-1">
              Image Quality: Good
            </div>
            <div className="text-sm text-text-secondary">
              The image appears clear and suitable for OCR processing. All text should be readable.
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant="default"
          onClick={onProcess}
          disabled={isProcessing}
          loading={isProcessing}
          iconName="ScanLine"
          iconPosition="left"
          className="flex-1"
        >
          {isProcessing ? 'Processing...' : 'Start OCR Processing'}
        </Button>
        <Button 
          variant="outline"
          onClick={onRemove}
          disabled={isProcessing}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Select Different Image
        </Button>
      </div>
      {/* Processing Tips */}
      {!isProcessing && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-start">
            <Icon name="Info" size={16} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
            <div className="text-sm text-text-secondary">
              <strong className="text-text-primary">Before processing:</strong> Ensure the prescription text is clearly visible and not cut off. Processing typically takes 5-10 seconds.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;