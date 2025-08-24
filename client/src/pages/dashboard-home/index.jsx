import React from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';
import SessionStatus from '../../components/ui/SessionStatus';
import WelcomeSection from './components/WelcomeSection';
import QuickStatsCards from './components/QuickStatsCards';
import ModuleCards from './components/ModuleCards';
import HealthTipsCarousel from './components/HealthTipsCarousel';
import RecentActivity from './components/RecentActivity';
import PlatformNews from './components/PlatformNews';

const DashboardHome = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <QuickActions />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb />
          
          <div className="space-y-8">
            <WelcomeSection />
            <QuickStatsCards />
            <ModuleCards />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>
              <div className="lg:col-span-1">
                <HealthTipsCarousel />
              </div>
            </div>
            
            <PlatformNews />
          </div>
        </div>
        
        <footer className="bg-surface border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <SessionStatus 
                isProcessing={false}
                hasUnsavedChanges={false}
                sessionTimeRemaining={45}
              />
              <div className="text-sm text-text-secondary">
                © {new Date()?.getFullYear()} HealthCare Assistant. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default DashboardHome;