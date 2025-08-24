import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PrescriptionScanner from './pages/prescription-scanner';
import SymptomCheckerChat from './pages/symptom-checker-chat';
import MedicineInformationDatabase from './pages/medicine-information-database';
import HealthcareFacilityLocator from './pages/healthcare-facility-locator';
import DashboardHome from './pages/dashboard-home';
import MedicalReportsDashboard from './pages/medical-reports-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DashboardHome />} />
        <Route path="/prescription-scanner" element={<PrescriptionScanner />} />
        <Route path="/symptom-checker-chat" element={<SymptomCheckerChat />} />
        <Route path="/medicine-information-database" element={<MedicineInformationDatabase />} />
        <Route path="/healthcare-facility-locator" element={<HealthcareFacilityLocator />} />
        <Route path="/dashboard-home" element={<DashboardHome />} />
        <Route path="/medical-reports-dashboard" element={<MedicalReportsDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
