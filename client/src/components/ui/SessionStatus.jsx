import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const SessionStatus = ({ 
  isProcessing = false, 
  processingType = '', 
  hasUnsavedChanges = false,
  sessionTimeRemaining = null 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getProcessingMessage = () => {
    switch (processingType) {
      case 'ocr':
        return 'Processing prescription...';
      case 'chat':
        return 'AI analyzing symptoms...';
      case 'upload':
        return 'Uploading report...';
      case 'search':
        return 'Searching facilities...';
      default:
        return 'Processing...';
    }
  };

  const getProcessingIcon = () => {
    switch (processingType) {
      case 'ocr':
        return 'ScanLine';
      case 'chat':
        return 'MessageSquare';
      case 'upload':
        return 'Upload';
      case 'search':
        return 'Search';
      default:
        return 'Loader';
    }
  };

  return (
    <div className="flex items-center space-x-4 text-sm">
      {/* Processing Status */}
      {isProcessing && (
        <div className="flex items-center space-x-2 text-warning">
          <Icon 
            name={getProcessingIcon()} 
            size={16} 
            className="animate-pulse" 
          />
          <span className="hidden sm:inline font-medium">
            {getProcessingMessage()}
          </span>
        </div>
      )}

      {/* Unsaved Changes Indicator */}
      {hasUnsavedChanges && !isProcessing && (
        <div className="flex items-center space-x-2 text-warning">
          <Icon name="AlertCircle" size={16} />
          <span className="hidden sm:inline font-medium">
            Unsaved changes
          </span>
        </div>
      )}

      {/* Session Security Indicator */}
      {!isProcessing && !hasUnsavedChanges && (
        <div className="flex items-center space-x-2 text-success">
          <Icon name="Shield" size={16} />
          <span className="hidden sm:inline font-medium">
            Secure session
          </span>
        </div>
      )}

      {/* Session Time Remaining */}
      {sessionTimeRemaining && (
        <div className="flex items-center space-x-2 text-text-secondary">
          <Icon name="Clock" size={16} />
          <span className="hidden md:inline">
            Session: {sessionTimeRemaining}m
          </span>
        </div>
      )}

      {/* Current Time */}
      <div className="flex items-center space-x-2 text-text-secondary">
        <Icon name="Clock" size={16} className="sm:hidden" />
        <span className="font-mono text-xs">
          {formatTime(currentTime)}
        </span>
      </div>
    </div>
  );
};

export default SessionStatus;