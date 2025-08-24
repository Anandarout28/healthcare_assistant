import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthSummaryCards = ({ summaryData }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'good':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'danger':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'text-success bg-success/10 border-success/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'danger':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryData?.map((item, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${getStatusColor(item?.status)}`}>
              <Icon name={item?.icon} size={20} />
            </div>
            <Icon 
              name={getStatusIcon(item?.status)} 
              size={16} 
              className={item?.status === 'good' ? 'text-success' : 
                        item?.status === 'warning' ? 'text-warning' : 
                        item?.status === 'danger' ? 'text-error' : 'text-text-secondary'} 
            />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-text-secondary">{item?.title}</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-text-primary">{item?.value}</span>
              <span className="text-sm text-text-secondary">{item?.unit}</span>
            </div>
            
            {item?.change && (
              <div className={`flex items-center space-x-1 text-xs ${
                item?.change > 0 ? 'text-error' : item?.change < 0 ? 'text-success' : 'text-text-secondary'
              }`}>
                <Icon 
                  name={item?.change > 0 ? 'TrendingUp' : item?.change < 0 ? 'TrendingDown' : 'Minus'} 
                  size={12} 
                />
                <span>{Math.abs(item?.change)}% from last reading</span>
              </div>
            )}
            
            <div className="text-xs text-text-secondary mt-2">
              Last updated: {item?.lastUpdated}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HealthSummaryCards;