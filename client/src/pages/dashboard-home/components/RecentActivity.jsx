import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "prescription_scan",
      title: "Prescription Scanned",
      description: "Amoxicillin 500mg - Take 3 times daily",
      timestamp: "2 hours ago",
      icon: "ScanLine",
      status: "completed"
    },
    {
      id: 2,
      type: "symptom_check",
      title: "Symptom Assessment",
      description: "Mild headache and fatigue - Low risk",
      timestamp: "1 day ago",
      icon: "MessageSquare",
      status: "completed"
    },
    {
      id: 3,
      type: "report_upload",
      title: "Blood Test Report",
      description: "Complete Blood Count (CBC) results uploaded",
      timestamp: "3 days ago",
      icon: "FileText",
      status: "completed"
    },
    {
      id: 4,
      type: "appointment",
      title: "Appointment Reminder",
      description: "Dr. Smith - General Checkup on Dec 28",
      timestamp: "5 days ago",
      icon: "Calendar",
      status: "upcoming"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'upcoming':
        return 'text-warning';
      case 'pending':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'prescription_scan':
        return 'bg-primary/10';
      case 'symptom_check':
        return 'bg-secondary/10';
      case 'report_upload':
        return 'bg-accent/10';
      case 'appointment':
        return 'bg-warning/10';
      default:
        return 'bg-muted';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'prescription_scan':
        return 'text-primary';
      case 'symptom_check':
        return 'text-secondary';
      case 'report_upload':
        return 'text-accent';
      case 'appointment':
        return 'text-warning';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-text-primary">Recent Activity</h2>
        <Button variant="ghost" size="sm">
          View All
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
      <div className="bg-surface border border-border rounded-xl healthcare-shadow-sm">
        {activities?.map((activity, index) => (
          <div
            key={activity?.id}
            className={`flex items-center space-x-4 p-4 hover:bg-muted healthcare-transition ${
              index !== activities?.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className={`flex-shrink-0 p-2 rounded-lg ${getIconBg(activity?.type)}`}>
              <Icon 
                name={activity?.icon} 
                size={20} 
                className={getIconColor(activity?.type)} 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-sm font-medium text-text-primary truncate">
                  {activity?.title}
                </h3>
                <Icon 
                  name="CheckCircle" 
                  size={14} 
                  className={getStatusColor(activity?.status)} 
                />
              </div>
              <p className="text-xs text-text-secondary truncate">
                {activity?.description}
              </p>
            </div>
            
            <div className="flex-shrink-0 text-xs text-text-secondary">
              {activity?.timestamp}
            </div>
          </div>
        ))}
        
        {activities?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Icon name="Activity" size={48} className="text-text-secondary mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No Recent Activity</h3>
            <p className="text-text-secondary text-center">
              Start using our healthcare services to see your activity here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;