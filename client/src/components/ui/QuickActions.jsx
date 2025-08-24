import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActions = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getContextualActions = () => {
    const currentPath = location?.pathname;
    
    switch (currentPath) {
      case '/prescription-scanner':
        return [
          {
            label: 'View Reports',
            icon: 'FileText',
            path: '/medical-reports-dashboard',
            description: 'Check your medical reports'
          },
          {
            label: 'Medicine Info',
            icon: 'Pill',
            path: '/medicine-information-database',
            description: 'Look up medication details'
          }
        ];
      
      case '/symptom-checker-chat':
        return [
          {
            label: 'Find Healthcare',
            icon: 'MapPin',
            path: '/healthcare-facility-locator',
            description: 'Locate nearby facilities'
          },
          {
            label: 'View Reports',
            icon: 'FileText',
            path: '/medical-reports-dashboard',
            description: 'Check your medical history'
          }
        ];
      
      case '/medical-reports-dashboard':
        return [
          {
            label: 'Scan Prescription',
            icon: 'ScanLine',
            path: '/prescription-scanner',
            description: 'Add new prescription'
          },
          {
            label: 'Symptom Checker',
            icon: 'MessageSquare',
            path: '/symptom-checker-chat',
            description: 'Assess symptoms'
          }
        ];
      
      case '/healthcare-facility-locator':
        return [
          {
            label: 'Symptom Checker',
            icon: 'MessageSquare',
            path: '/symptom-checker-chat',
            description: 'Check symptoms first'
          },
          {
            label: 'View Reports',
            icon: 'FileText',
            path: '/medical-reports-dashboard',
            description: 'Bring your medical history'
          }
        ];
      
      case '/medicine-information-database':
        return [
          {
            label: 'Scan Prescription',
            icon: 'ScanLine',
            path: '/prescription-scanner',
            description: 'Digitize your prescription'
          },
          {
            label: 'View Reports',
            icon: 'FileText',
            path: '/medical-reports-dashboard',
            description: 'Check medication history'
          }
        ];
      
      default:
        return [
          {
            label: 'Scan Prescription',
            icon: 'ScanLine',
            path: '/prescription-scanner',
            description: 'Quick prescription scan'
          },
          {
            label: 'Symptom Checker',
            icon: 'MessageSquare',
            path: '/symptom-checker-chat',
            description: 'AI health assessment'
          }
        ];
    }
  };

  const actions = getContextualActions();

  const handleActionClick = (path) => {
    navigate(path);
    setIsExpanded(false);
  };

  if (actions?.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop Quick Actions */}
      <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 z-1050">
        <div className="bg-surface border border-border rounded-lg healthcare-shadow-md p-2 space-y-2">
          <div className="text-xs font-medium text-text-secondary px-2 py-1">
            Quick Actions
          </div>
          {actions?.map((action) => (
            <button
              key={action?.path}
              onClick={() => handleActionClick(action?.path)}
              className="w-full flex items-center px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted rounded-md healthcare-transition"
              title={action?.description}
            >
              <Icon name={action?.icon} size={16} className="mr-2" />
              {action?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Mobile Quick Actions */}
      <div className="lg:hidden fixed bottom-6 right-4 z-1050">
        {isExpanded && (
          <div className="mb-4 bg-surface border border-border rounded-lg healthcare-shadow-lg p-3 min-w-[200px]">
            <div className="text-xs font-medium text-text-secondary mb-2">
              Quick Actions
            </div>
            <div className="space-y-2">
              {actions?.map((action) => (
                <button
                  key={action?.path}
                  onClick={() => handleActionClick(action?.path)}
                  className="w-full flex items-center px-3 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-muted rounded-md healthcare-transition min-h-[44px]"
                >
                  <Icon name={action?.icon} size={18} className="mr-3" />
                  <div className="text-left">
                    <div className="font-medium">{action?.label}</div>
                    <div className="text-xs opacity-75">{action?.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-full healthcare-shadow-lg"
          aria-label="Toggle quick actions"
        >
          <Icon name={isExpanded ? "X" : "Zap"} size={24} />
        </Button>
      </div>
    </>
  );
};

export default QuickActions;