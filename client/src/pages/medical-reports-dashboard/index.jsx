import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';
import SessionStatus from '../../components/ui/SessionStatus';
import FileUploadSection from './components/FileUploadSection';
import HealthSummaryCards from './components/HealthSummaryCards';
import HealthMetricsGauge from './components/HealthMetricsGauge';
import HealthTrendsChart from './components/HealthTrendsChart';
import HealthMetricsBar from './components/HealthMetricsBar';
import ReportFilters from './components/ReportFilters';
import ReportDetailModal from './components/ReportDetailModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MedicalReportsDashboard = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');
  const [selectedMetrics, setSelectedMetrics] = useState(['bloodPressure', 'heartRate', 'cholesterol']);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedReportData, setSelectedReportData] = useState(null);
  const [selectedMetricName, setSelectedMetricName] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock data for health summary
  const summaryData = [
    {
      title: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "good",
      icon: "Heart",
      change: -2.5,
      lastUpdated: "Dec 20, 2024"
    },
    {
      title: "Heart Rate",
      value: "72",
      unit: "bpm",
      status: "good",
      icon: "Activity",
      change: 1.2,
      lastUpdated: "Dec 22, 2024"
    },
    {
      title: "Cholesterol",
      value: "195",
      unit: "mg/dL",
      status: "warning",
      icon: "Droplet",
      change: 3.8,
      lastUpdated: "Dec 18, 2024"
    },
    {
      title: "Blood Sugar",
      value: "98",
      unit: "mg/dL",
      status: "good",
      icon: "Zap",
      change: -1.5,
      lastUpdated: "Dec 23, 2024"
    }
  ];

  // Mock data for trends chart
  const trendsData = [
    { date: "Dec 1", bloodPressureSystolic: 118, heartRate: 68, cholesterol: 190, bloodSugar: 95 },
    { date: "Dec 5", bloodPressureSystolic: 122, heartRate: 70, cholesterol: 192, bloodSugar: 98 },
    { date: "Dec 10", bloodPressureSystolic: 119, heartRate: 69, cholesterol: 188, bloodSugar: 94 },
    { date: "Dec 15", bloodPressureSystolic: 121, heartRate: 71, cholesterol: 194, bloodSugar: 97 },
    { date: "Dec 20", bloodPressureSystolic: 120, heartRate: 72, cholesterol: 195, bloodSugar: 98 }
  ];

  const trendsMetrics = [
    { key: 'bloodPressureSystolic', name: 'Systolic BP', unit: 'mmHg' },
    { key: 'heartRate', name: 'Heart Rate', unit: 'bpm' },
    { key: 'cholesterol', name: 'Cholesterol', unit: 'mg/dL' },
    { key: 'bloodSugar', name: 'Blood Sugar', unit: 'mg/dL' }
  ];

  // Mock data for bar chart
  const barChartData = [
    { date: "Dec 1", value: 118 },
    { date: "Dec 5", value: 122 },
    { date: "Dec 10", value: 119 },
    { date: "Dec 15", value: 121 },
    { date: "Dec 20", value: 120 }
  ];

  const bloodPressureThresholds = {
    good: { min: 90, max: 120 },
    warning: { min: 121, max: 139 },
    danger: { min: 140, max: 200 }
  };

  // Mock detailed report data
  const mockDetailedData = [
    { date: "Dec 20, 2024", value: "120", unit: "mmHg", status: "Normal", source: "Home Monitor" },
    { date: "Dec 18, 2024", value: "118", unit: "mmHg", status: "Normal", source: "Clinic Visit" },
    { date: "Dec 15, 2024", value: "121", unit: "mmHg", status: "Attention", source: "Home Monitor" },
    { date: "Dec 10, 2024", value: "119", unit: "mmHg", status: "Normal", source: "Lab Report" },
    { date: "Dec 5, 2024", value: "122", unit: "mmHg", status: "Attention", source: "Home Monitor" }
  ];

  const handleFileUpload = (files) => {
    setIsProcessing(true);
    setHasUnsavedChanges(true);
    
    // Simulate file processing
    setTimeout(() => {
      setIsProcessing(false);
      setHasUnsavedChanges(false);
      console.log('Files processed:', files);
    }, 3000);
  };

  const handleExport = () => {
    // Simulate export functionality
    const exportData = {
      timeRange: selectedTimeRange,
      metrics: selectedMetrics,
      data: trendsData
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'health_report_export.json';
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  const handleShare = () => {
    // Simulate share functionality
    if (navigator.share) {
      navigator.share({
        title: 'My Health Report',
        text: 'Check out my latest health metrics and trends',
        url: window.location?.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard?.writeText(window.location?.href);
      alert('Report link copied to clipboard!');
    }
  };

  const handleViewDetails = (metricName) => {
    setSelectedMetricName(metricName);
    setSelectedReportData(mockDetailedData);
    setShowDetailModal(true);
  };

  useEffect(() => {
    // Simulate data loading based on filters
    console.log('Filters changed:', { selectedTimeRange, selectedMetrics });
  }, [selectedTimeRange, selectedMetrics]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <Breadcrumb />
              <h1 className="text-3xl font-bold text-text-primary mt-2">Medical Reports Dashboard</h1>
              <p className="text-text-secondary mt-1">
                Track your health metrics and visualize trends over time
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <SessionStatus 
                isProcessing={isProcessing}
                processingType="upload"
                hasUnsavedChanges={hasUnsavedChanges}
                sessionTimeRemaining={45}
              />
            </div>
          </div>

          <FileUploadSection 
            onFileUpload={handleFileUpload}
            isProcessing={isProcessing}
          />

          <ReportFilters
            selectedTimeRange={selectedTimeRange}
            onTimeRangeChange={setSelectedTimeRange}
            selectedMetrics={selectedMetrics}
            onMetricsChange={setSelectedMetrics}
            onExport={handleExport}
            onShare={handleShare}
          />

          <HealthSummaryCards summaryData={summaryData} />

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            <HealthMetricsGauge
              title="Blood Pressure"
              value={120}
              unit="mmHg"
              min={80}
              max={180}
              optimal={120}
              status="good"
              icon="Heart"
            />
            
            <HealthMetricsGauge
              title="Heart Rate"
              value={72}
              unit="bpm"
              min={40}
              max={120}
              optimal={70}
              status="good"
              icon="Activity"
            />
            
            <HealthMetricsGauge
              title="Cholesterol"
              value={195}
              unit="mg/dL"
              min={100}
              max={300}
              optimal={180}
              status="warning"
              icon="Droplet"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            <HealthTrendsChart
              title="Health Trends Over Time"
              data={trendsData}
              metrics={trendsMetrics}
              timeRange={selectedTimeRange}
            />
            
            <HealthMetricsBar
              title="Blood Pressure History"
              data={barChartData}
              dataKey="value"
              unit="mmHg"
              thresholds={bloodPressureThresholds}
            />
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-text-primary">Quick Actions</h2>
              <Icon name="Zap" size={24} className="text-primary" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                onClick={() => handleViewDetails('Blood Pressure')}
                iconName="Eye"
                iconPosition="left"
                className="w-full justify-start"
              >
                View Detailed Data
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.print()}
                iconName="Printer"
                iconPosition="left"
                className="w-full justify-start"
              >
                Print Report
              </Button>
              
              <Button
                variant="outline"
                onClick={handleShare}
                iconName="Share2"
                iconPosition="left"
                className="w-full justify-start"
              >
                Share with Doctor
              </Button>
              
              <Button
                variant="outline"
                onClick={() => console.log('Schedule appointment')}
                iconName="Calendar"
                iconPosition="left"
                className="w-full justify-start"
              >
                Schedule Checkup
              </Button>
            </div>
          </div>
        </div>
      </main>

      <QuickActions />
      
      <ReportDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        reportData={selectedReportData}
        metricName={selectedMetricName}
      />
    </div>
  );
};

export default MedicalReportsDashboard;