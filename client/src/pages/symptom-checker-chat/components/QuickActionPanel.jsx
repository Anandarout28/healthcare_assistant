import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionPanel = ({ currentAssessment, onSaveAssessment }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      label: 'Save Assessment',
      icon: 'Bookmark',
      action: () => onSaveAssessment && onSaveAssessment(),
      variant: 'default',
      description: 'Save this conversation for future reference'
    },
    {
      label: 'Find Healthcare',
      icon: 'MapPin',
      action: () => navigate('/healthcare-facility-locator'),
      variant: 'outline',
      description: 'Locate nearby hospitals and clinics'
    },
    {
      label: 'View Reports',
      icon: 'FileText',
      action: () => navigate('/medical-reports-dashboard'),
      variant: 'outline',
      description: 'Check your medical history and reports'
    },
    {
      label: 'Medicine Info',
      icon: 'Pill',
      action: () => navigate('/medicine-information-database'),
      variant: 'outline',
      description: 'Look up medication information'
    }
  ];

  const emergencyActions = [
    {
      label: 'Emergency Services',
      icon: 'Phone',
      action: () => window.open('tel:911'),
      variant: 'destructive',
      description: 'Call emergency services immediately'
    },
    {
      label: 'Poison Control',
      icon: 'AlertTriangle',
      action: () => window.open('tel:1-800-222-1222'),
      variant: 'warning',
      description: 'Contact poison control center'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Emergency Actions */}
      <div className="bg-error/5 border border-error/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="AlertTriangle" size={20} className="text-error" />
          <h3 className="font-semibold text-error">Emergency Actions</h3>
        </div>
        <p className="text-xs text-text-secondary mb-4">
          If you're experiencing a medical emergency, seek immediate professional help.
        </p>
        <div className="space-y-2">
          {emergencyActions?.map((action, index) => (
            <Button
              key={index}
              variant={action?.variant}
              size="sm"
              fullWidth
              onClick={action?.action}
              iconName={action?.icon}
              iconPosition="left"
              className="justify-start"
            >
              <div className="text-left">
                <div className="font-medium">{action?.label}</div>
                <div className="text-xs opacity-75">{action?.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Zap" size={20} className="text-primary" />
          <h3 className="font-semibold text-text-primary">Quick Actions</h3>
        </div>
        <div className="space-y-2">
          {quickActions?.map((action, index) => (
            <Button
              key={index}
              variant={action?.variant}
              size="sm"
              fullWidth
              onClick={action?.action}
              iconName={action?.icon}
              iconPosition="left"
              className="justify-start"
            >
              <div className="text-left">
                <div className="font-medium">{action?.label}</div>
                <div className="text-xs opacity-75">{action?.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Health Tips */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Heart" size={20} className="text-success" />
          <h3 className="font-semibold text-success">Health Tips</h3>
        </div>
        <div className="space-y-3 text-sm text-text-secondary">
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <p>Stay hydrated by drinking plenty of water throughout the day</p>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <p>Get adequate sleep (7-9 hours) for optimal immune function</p>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <p>Regular exercise can help prevent many health conditions</p>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <p>Maintain a balanced diet rich in fruits and vegetables</p>
          </div>
        </div>
      </div>
      {/* Assessment Summary */}
      {currentAssessment && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Activity" size={20} className="text-primary" />
            <h3 className="font-semibold text-primary">Current Assessment</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Messages:</span>
              <span className="font-medium text-text-primary">{currentAssessment?.messageCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Duration:</span>
              <span className="font-medium text-text-primary">{currentAssessment?.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Conditions Discussed:</span>
              <span className="font-medium text-text-primary">{currentAssessment?.conditionsCount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActionPanel;