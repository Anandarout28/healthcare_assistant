import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthMetricsGauge = ({ title, value, unit, min, max, optimal, status, icon }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const optimalPercentage = ((optimal - min) / (max - min)) * 100;
  
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'danger':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getGaugeColor = () => {
    switch (status) {
      case 'good':
        return '#10B981';
      case 'warning':
        return '#F59E0B';
      case 'danger':
        return '#EF4444';
      default:
        return '#64748B';
    }
  };

  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <Icon name={icon} size={24} className="text-primary" />
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 mb-4">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              stroke="#E2E8F0"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            
            {/* Optimal range indicator */}
            <circle
              stroke="#10B981"
              fill="transparent"
              strokeWidth={4}
              strokeOpacity={0.3}
              r={normalizedRadius - 4}
              cx={radius}
              cy={radius}
              style={{
                strokeDasharray: `${(optimalPercentage / 100) * circumference} ${circumference}`,
                strokeDashoffset: 0,
              }}
            />
            
            {/* Progress circle */}
            <circle
              stroke={getGaugeColor()}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              style={{
                strokeDasharray,
                strokeDashoffset,
                transition: 'stroke-dashoffset 0.5s ease-in-out',
              }}
            />
          </svg>
          
          {/* Center value */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-text-primary">{value}</span>
            <span className="text-sm text-text-secondary">{unit}</span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className={`flex items-center justify-center space-x-2 ${getStatusColor()}`}>
            <Icon 
              name={status === 'good' ? 'CheckCircle' : status === 'warning' ? 'AlertTriangle' : 'XCircle'} 
              size={16} 
            />
            <span className="font-medium capitalize">{status}</span>
          </div>
          
          <div className="text-xs text-text-secondary">
            Range: {min} - {max} {unit}
          </div>
          <div className="text-xs text-success">
            Optimal: {optimal} {unit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthMetricsGauge;