import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMap = {
    '/dashboard-home': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/prescription-scanner': { label: 'Prescription Scanner', icon: 'ScanLine' },
    '/symptom-checker-chat': { label: 'Symptom Checker', icon: 'MessageSquare' },
    '/medical-reports-dashboard': { label: 'Medical Reports', icon: 'FileText' },
    '/healthcare-facility-locator': { label: 'Find Healthcare', icon: 'MapPin' },
    '/medicine-information-database': { label: 'Medicine Information', icon: 'Pill' }
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/dashboard-home', icon: 'Home' }];

    if (location?.pathname !== '/dashboard-home') {
      const currentPath = `/${pathSegments?.join('/')}`;
      const currentPage = pathMap?.[currentPath];
      
      if (currentPage) {
        breadcrumbs?.push({
          label: currentPage?.label,
          path: currentPath,
          icon: currentPage?.icon,
          isActive: true
        });
      }
    } else {
      breadcrumbs[0].isActive = true;
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (breadcrumbs?.length <= 1 && breadcrumbs?.[0]?.isActive) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary py-3" aria-label="Breadcrumb">
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={16} className="text-border" />
          )}
          
          {crumb?.isActive ? (
            <span className="flex items-center text-text-primary font-medium">
              <Icon name={crumb?.icon} size={16} className="mr-2" />
              {crumb?.label}
            </span>
          ) : (
            <button
              onClick={() => handleNavigation(crumb?.path)}
              className="flex items-center hover:text-text-primary healthcare-transition"
            >
              <Icon name={crumb?.icon} size={16} className="mr-2" />
              {crumb?.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;