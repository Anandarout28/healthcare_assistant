import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-home',
      icon: 'LayoutDashboard',
      description: 'Health overview and insights'
    },
    {
      label: 'Scan Prescription',
      path: '/prescription-scanner',
      icon: 'ScanLine',
      description: 'Digitize prescriptions with OCR'
    },
    {
      label: 'Symptom Checker',
      path: '/symptom-checker-chat',
      icon: 'MessageSquare',
      description: 'AI-powered health assessment'
    },
    {
      label: 'Medical Reports',
      path: '/medical-reports-dashboard',
      icon: 'FileText',
      description: 'View and manage health reports'
    },
    {
      label: 'Find Healthcare',
      path: '/healthcare-facility-locator',
      icon: 'MapPin',
      description: 'Locate nearby healthcare facilities'
    }
  ];

  const moreItems = [
    {
      label: 'Medicine Info',
      path: '/medicine-information-database',
      icon: 'Pill',
      description: 'Comprehensive drug database'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000 healthcare-shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer healthcare-transition hover:opacity-80"
            onClick={() => handleNavigation('/dashboard-home')}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg mr-3">
              <Icon name="Heart" size={24} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-text-primary leading-tight">
                HealthCare
              </span>
              <span className="text-xs text-text-secondary leading-tight">
                Assistant
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  flex items-center px-4 py-2 rounded-lg text-sm font-medium healthcare-transition
                  min-w-[120px] justify-center
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }
                `}
                title={item?.description}
              >
                <Icon name={item?.icon} size={18} className="mr-2" />
                {item?.label}
              </button>
            ))}
            
            {/* More Dropdown */}
            <div className="relative group">
              <button className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted healthcare-transition min-w-[120px] justify-center">
                <Icon name="MoreHorizontal" size={18} className="mr-2" />
                More
              </button>
              
              <div className="absolute right-0 top-full mt-1 w-56 bg-popover border border-border rounded-lg healthcare-shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible healthcare-transition z-1050">
                {moreItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`
                      w-full flex items-center px-4 py-3 text-sm text-left healthcare-transition
                      ${isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                      }
                      first:rounded-t-lg last:rounded-b-lg
                    `}
                  >
                    <Icon name={item?.icon} size={18} className="mr-3" />
                    <div>
                      <div className="font-medium">{item?.label}</div>
                      <div className="text-xs opacity-75">{item?.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* User Avatar & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            {/* User Avatar */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Icon name="User" size={18} color="white" />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-1100 lg:hidden">
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-border">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg mr-3">
                  <Icon name="Heart" size={24} color="white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-text-primary leading-tight">
                    HealthCare
                  </span>
                  <span className="text-xs text-text-secondary leading-tight">
                    Assistant
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                aria-label="Close mobile menu"
              >
                <Icon name="X" size={24} />
              </Button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
              <div className="space-y-2 px-4">
                {[...navigationItems, ...moreItems]?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`
                      w-full flex items-center px-4 py-4 rounded-lg text-left healthcare-transition
                      min-h-[48px]
                      ${isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                      }
                    `}
                  >
                    <Icon name={item?.icon} size={24} className="mr-4" />
                    <div>
                      <div className="font-medium text-base">{item?.label}</div>
                      <div className="text-sm opacity-75 mt-1">{item?.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </nav>

            {/* Mobile User Section */}
            <div className="border-t border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="white" />
                </div>
                <div>
                  <div className="font-medium text-text-primary">Health User</div>
                  <div className="text-sm text-text-secondary">Manage your health</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;