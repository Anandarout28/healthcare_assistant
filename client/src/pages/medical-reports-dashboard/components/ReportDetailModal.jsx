import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportDetailModal = ({ isOpen, onClose, reportData, metricName }) => {
  if (!isOpen || !reportData) return null;

  const handleExportData = () => {
    const csvContent = reportData?.map(row => 
      Object.values(row)?.join(',')
    )?.join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${metricName}_data.csv`;
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1100 p-4">
      <div className="bg-card rounded-lg border border-border max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">{metricName} - Detailed Data</h2>
            <p className="text-sm text-text-secondary mt-1">Raw data from your medical reports</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close modal"
          >
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="text-sm text-text-secondary">
              Showing {reportData?.length} data points
            </div>
            <Button
              variant="outline"
              onClick={handleExportData}
              iconName="Download"
              iconPosition="left"
              size="sm"
            >
              Export CSV
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium text-text-primary">Date</th>
                  <th className="text-left p-3 font-medium text-text-primary">Value</th>
                  <th className="text-left p-3 font-medium text-text-primary">Unit</th>
                  <th className="text-left p-3 font-medium text-text-primary">Status</th>
                  <th className="text-left p-3 font-medium text-text-primary">Source</th>
                </tr>
              </thead>
              <tbody>
                {reportData?.map((row, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50">
                    <td className="p-3 text-text-primary">{row?.date}</td>
                    <td className="p-3 text-text-primary font-medium">{row?.value}</td>
                    <td className="p-3 text-text-secondary">{row?.unit}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        row?.status === 'Normal' ? 'bg-success/10 text-success' :
                        row?.status === 'Attention'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                      }`}>
                        {row?.status}
                      </span>
                    </td>
                    <td className="p-3 text-text-secondary">{row?.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-medium text-text-primary mb-2">Data Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Average:</span>
                <span className="ml-2 font-medium text-text-primary">
                  {(reportData?.reduce((sum, item) => sum + parseFloat(item?.value), 0) / reportData?.length)?.toFixed(1)}
                </span>
              </div>
              <div>
                <span className="text-text-secondary">Highest:</span>
                <span className="ml-2 font-medium text-text-primary">
                  {Math.max(...reportData?.map(item => parseFloat(item?.value)))}
                </span>
              </div>
              <div>
                <span className="text-text-secondary">Lowest:</span>
                <span className="ml-2 font-medium text-text-primary">
                  {Math.min(...reportData?.map(item => parseFloat(item?.value)))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailModal;