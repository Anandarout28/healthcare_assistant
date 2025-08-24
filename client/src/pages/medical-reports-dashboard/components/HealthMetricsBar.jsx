import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const HealthMetricsBar = ({ title, data, dataKey, unit, thresholds }) => {
  const getBarColor = (value) => {
    if (thresholds) {
      if (value >= thresholds?.good?.min && value <= thresholds?.good?.max) {
        return '#10B981'; // success
      } else if (value >= thresholds?.warning?.min && value <= thresholds?.warning?.max) {
        return '#F59E0B'; // warning
      } else {
        return '#EF4444'; // error
      }
    }
    return '#2563EB'; // primary
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const value = payload?.[0]?.value;
      const status = thresholds ? 
        (value >= thresholds?.good?.min && value <= thresholds?.good?.max) ? 'Normal' :
        (value >= thresholds?.warning?.min && value <= thresholds?.warning?.max) ? 'Attention': 'Concerning' :'Normal';

      return (
        <div className="bg-popover border border-border rounded-lg p-3 healthcare-shadow-md">
          <p className="font-medium text-text-primary mb-1">{label}</p>
          <div className="flex items-center space-x-2">
            <span className="text-text-secondary">Value:</span>
            <span className="font-semibold text-text-primary">{value} {unit}</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-text-secondary">Status:</span>
            <span className={`font-medium ${
              status === 'Normal' ? 'text-success' : 
              status === 'Attention' ? 'text-warning' : 'text-error'
            }`}>
              {status}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          <p className="text-sm text-text-secondary">Recent measurements</p>
        </div>
        <Icon name="BarChart3" size={24} className="text-primary" />
      </div>
      <div className="h-64 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="date" 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{ value: unit, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={dataKey} radius={[4, 4, 0, 0]}>
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry?.[dataKey])} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {thresholds && (
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-success/10 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span className="text-sm font-medium text-success">Normal</span>
            </div>
            <div className="text-xs text-text-secondary">
              {thresholds?.good?.min} - {thresholds?.good?.max} {unit}
            </div>
          </div>
          
          <div className="p-3 bg-warning/10 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span className="text-sm font-medium text-warning">Attention</span>
            </div>
            <div className="text-xs text-text-secondary">
              {thresholds?.warning?.min} - {thresholds?.warning?.max} {unit}
            </div>
          </div>
          
          <div className="p-3 bg-error/10 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <div className="w-3 h-3 bg-error rounded-full" />
              <span className="text-sm font-medium text-error">Concerning</span>
            </div>
            <div className="text-xs text-text-secondary">
              Outside normal range
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthMetricsBar;