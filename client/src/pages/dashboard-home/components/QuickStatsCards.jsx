import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCards = () => {
  const healthStats = [
    {
      id: 1,
      title: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "normal",
      icon: "Heart",
      trend: "stable",
      lastUpdated: "Today"
    },
    {
      id: 2,
      title: "Weight",
      value: "68.5",
      unit: "kg",
      status: "normal",
      icon: "Scale",
      trend: "down",
      lastUpdated: "3 days ago"
    },
    {
      id: 3,
      title: "Medications",
      value: "3",
      unit: "active",
      status: "reminder",
      icon: "Pill",
      trend: "stable",
      lastUpdated: "Today"
    },
    {
      id: 4,
      title: "Next Appointment",
      value: "Dec 28",
      unit: "2024",
      status: "upcoming",
      icon: "Calendar",
      trend: "scheduled",
      lastUpdated: "Scheduled"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'text-success';
      case 'reminder':
        return 'text-warning';
      case 'upcoming':
        return 'text-primary';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'normal':
        return 'bg-success/10';
      case 'reminder':
        return 'bg-warning/10';
      case 'upcoming':
        return 'bg-primary/10';
      default:
        return 'bg-muted';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      case 'scheduled':
        return 'Clock';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-text-primary mb-4">Health Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthStats?.map((stat) => (
          <div
            key={stat?.id}
            className="bg-surface border border-border rounded-lg p-4 healthcare-shadow-sm hover:healthcare-shadow-md healthcare-transition"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${getStatusBg(stat?.status)}`}>
                <Icon 
                  name={stat?.icon} 
                  size={20} 
                  className={getStatusColor(stat?.status)} 
                />
              </div>
              <Icon 
                name={getTrendIcon(stat?.trend)} 
                size={16} 
                className="text-text-secondary" 
              />
            </div>
            
            <div className="mb-2">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-text-primary">
                  {stat?.value}
                </span>
                <span className="text-sm text-text-secondary">
                  {stat?.unit}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-text-primary">
                {stat?.title}
              </h3>
            </div>
            
            <p className="text-xs text-text-secondary mt-1">
              {stat?.lastUpdated}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStatsCards;