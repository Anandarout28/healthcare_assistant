import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const HealthTrendsChart = ({ title, data, metrics, timeRange }) => {
  const colors = ['#2563EB', '#059669', '#7C3AED', '#F59E0B', '#EF4444'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 healthcare-shadow-md">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-text-secondary">{entry?.dataKey}:</span>
              <span className="font-medium text-text-primary">
                {entry?.value} {entry?.payload?.unit || ''}
              </span>
            </div>
          ))}
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
          <p className="text-sm text-text-secondary">Last {timeRange}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <span className="text-sm font-medium text-text-secondary">Trends</span>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            
            {metrics?.map((metric, index) => (
              <Line
                key={metric?.key}
                type="monotone"
                dataKey={metric?.key}
                stroke={colors?.[index % colors?.length]}
                strokeWidth={2}
                dot={{ fill: colors?.[index % colors?.length], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: colors?.[index % colors?.length], strokeWidth: 2 }}
                name={metric?.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics?.map((metric, index) => {
          const latestValue = data?.[data?.length - 1]?.[metric?.key];
          const previousValue = data?.[data?.length - 2]?.[metric?.key];
          const change = latestValue && previousValue ? latestValue - previousValue : 0;
          const changePercentage = previousValue ? ((change / previousValue) * 100)?.toFixed(1) : 0;

          return (
            <div key={metric?.key} className="text-center p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: colors?.[index % colors?.length] }}
                />
                <span className="text-sm font-medium text-text-primary">{metric?.name}</span>
              </div>
              <div className="text-lg font-semibold text-text-primary">
                {latestValue} {metric?.unit}
              </div>
              <div className={`flex items-center justify-center space-x-1 text-xs ${
                change > 0 ? 'text-error' : change < 0 ? 'text-success' : 'text-text-secondary'
              }`}>
                <Icon 
                  name={change > 0 ? 'TrendingUp' : change < 0 ? 'TrendingDown' : 'Minus'} 
                  size={12} 
                />
                <span>{Math.abs(changePercentage)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HealthTrendsChart;