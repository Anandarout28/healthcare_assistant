import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ReportFilters = ({ 
  selectedTimeRange, 
  onTimeRangeChange, 
  selectedMetrics, 
  onMetricsChange,
  onExport,
  onShare 
}) => {
  const timeRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' },
    { value: 'all', label: 'All Time' }
  ];

  const metricOptions = [
    { value: 'bloodPressure', label: 'Blood Pressure' },
    { value: 'heartRate', label: 'Heart Rate' },
    { value: 'cholesterol', label: 'Cholesterol' },
    { value: 'bloodSugar', label: 'Blood Sugar' },
    { value: 'weight', label: 'Weight' },
    { value: 'bmi', label: 'BMI' },
    { value: 'temperature', label: 'Temperature' },
    { value: 'oxygenSaturation', label: 'Oxygen Saturation' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="min-w-[200px]">
            <Select
              label="Time Range"
              options={timeRangeOptions}
              value={selectedTimeRange}
              onChange={onTimeRangeChange}
              className="w-full"
            />
          </div>
          
          <div className="min-w-[250px]">
            <Select
              label="Health Metrics"
              options={metricOptions}
              value={selectedMetrics}
              onChange={onMetricsChange}
              multiple
              searchable
              placeholder="Select metrics to display"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Button
            variant="outline"
            onClick={onShare}
            iconName="Share2"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Share Report
          </Button>
          
          <Button
            variant="outline"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Export Data
          </Button>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} />
            <span>Last updated: Dec 24, 2024 at 10:30 AM</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={16} />
            <span>12 reports analyzed</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} />
            <span>Tracking {selectedMetrics?.length} metrics</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;