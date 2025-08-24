import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModuleCards = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: 1,
      title: "Prescription Scanner",
      description: "Digitize prescriptions with AI-powered OCR technology",
      icon: "ScanLine",
      path: "/prescription-scanner",
      color: "bg-primary",
      quickAction: "Scan Now",
      stats: "12 scans this month"
    },
    {
      id: 2,
      title: "Symptom Checker",
      description: "Get AI-powered health assessments and guidance",
      icon: "MessageSquare",
      path: "/symptom-checker-chat",
      color: "bg-secondary",
      quickAction: "Check Symptoms",
      stats: "3 consultations this week"
    },
    {
      id: 3,
      title: "Medical Reports",
      description: "View and manage your health reports and history",
      icon: "FileText",
      path: "/medical-reports-dashboard",
      color: "bg-accent",
      quickAction: "View Reports",
      stats: "8 reports uploaded"
    },
    {
      id: 4,
      title: "Find Healthcare",
      description: "Locate nearby hospitals, clinics, and pharmacies",
      icon: "MapPin",
      path: "/healthcare-facility-locator",
      color: "bg-success",
      quickAction: "Find Nearby",
      stats: "15 facilities nearby"
    },
    {
      id: 5,
      title: "Medicine Information",
      description: "Comprehensive database of medications and drugs",
      icon: "Pill",
      path: "/medicine-information-database",
      color: "bg-warning",
      quickAction: "Search Medicine",
      stats: "50,000+ medicines"
    }
  ];

  const handleModuleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-text-primary mb-4">Healthcare Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules?.map((module) => (
          <div
            key={module.id}
            className="bg-surface border border-border rounded-xl p-6 healthcare-shadow-sm hover:healthcare-shadow-md healthcare-transition cursor-pointer group"
            onClick={() => handleModuleClick(module.path)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${module.color} group-hover:scale-110 healthcare-transition`}>
                <Icon name={module.icon} size={24} color="white" />
              </div>
              <Icon 
                name="ArrowRight" 
                size={20} 
                className="text-text-secondary group-hover:text-primary group-hover:translate-x-1 healthcare-transition" 
              />
            </div>
            
            <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary healthcare-transition">
              {module.title}
            </h3>
            
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
              {module.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded-full">
                {module.stats}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 healthcare-transition"
                onClick={(e) => {
                  e?.stopPropagation();
                  handleModuleClick(module.path);
                }}
              >
                {module.quickAction}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleCards;