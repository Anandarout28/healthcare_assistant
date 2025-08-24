import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = () => {
  const currentHour = new Date()?.getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const recentActivity = {
    lastScan: "2 days ago",
    nextReminder: "Blood pressure medication in 3 hours",
    lastSymptomCheck: "1 week ago"
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            {getGreeting()}, Sarah!
          </h1>
          <p className="text-primary-foreground/80 text-sm lg:text-base">
            Welcome back to your health dashboard
          </p>
        </div>
        <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-white/20 rounded-full">
          <Icon name="Heart" size={32} color="white" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Icon name="ScanLine" size={20} className="mr-2" />
            <span className="text-sm font-medium">Last Scan</span>
          </div>
          <p className="text-xs text-primary-foreground/80">{recentActivity?.lastScan}</p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Icon name="Clock" size={20} className="mr-2" />
            <span className="text-sm font-medium">Next Reminder</span>
          </div>
          <p className="text-xs text-primary-foreground/80">{recentActivity?.nextReminder}</p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Icon name="MessageSquare" size={20} className="mr-2" />
            <span className="text-sm font-medium">Symptom Check</span>
          </div>
          <p className="text-xs text-primary-foreground/80">{recentActivity?.lastSymptomCheck}</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;