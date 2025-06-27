
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/LoginPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LogisticsCompanyDashboard from "./pages/LogisticsCompanyDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import AuthGuard from "./components/AuthGuard";

// Static Pages
import AboutUs from "./pages/static/AboutUs";
import ContactUs from "./pages/static/ContactUs";

// Logistics Company Dashboard Pages
import FleetManagement from "./pages/logistics/FleetManagement";
import JobsDeliveries from "./pages/logistics/JobsDeliveries";
import DriversManagement from "./pages/logistics/DriversManagement";
import Analytics from "./pages/logistics/Analytics";

// Driver Dashboard Pages
import AvailableJobs from "./pages/driver/AvailableJobs";
import MyDeliveries from "./pages/driver/MyDeliveries";
import Earnings from "./pages/driver/Earnings";
import Profile from "./pages/driver/Profile";

// Business Dashboard Pages (added to prevent 404s)
import BusinessDeliveries from "./pages/business/BusinessDeliveries";
import NewDelivery from "./pages/business/NewDelivery";
import Shipments from "./pages/business/Shipments";
import Invoices from "./pages/business/Invoices";
import PaymentMethods from "./pages/business/PaymentMethods";
import PaymentPage from "./pages/business/PaymentPage";
import FrequentRoutesPage from "./pages/business/FrequentRoutes";

const queryClient = new QueryClient();

import { AuthProvider } from "./contexts/AuthContext";

// Add these new imports
import TrackShipment from "./pages/business/TrackShipment";
import FileDamageClaim from "./pages/business/FileDamageClaim";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<PasswordResetPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
            
            {/* Settings Routes - Dashboard specific settings with clearer names */}
            <Route path="/logistics-settings" element={
              <AuthGuard userTypes={['logistics']}>
                <Settings type="logistics" />
              </AuthGuard>
            } />
            <Route path="/driver-settings" element={
              <AuthGuard userTypes={['driver']}>
                <Settings type="driver" />
              </AuthGuard>
            } />
            <Route path="/business-settings" element={
              <AuthGuard userTypes={['business']}>
                <Settings type="business" />
              </AuthGuard>
            } />
            
            {/* Legacy path for backward compatibility */}
            <Route path="/settings" element={
              <AuthGuard>
                <Settings type="logistics" />
              </AuthGuard>
            } />
            
            {/* Logistics Company Routes */}
            <Route path="/logistics-dashboard" element={
              <AuthGuard userTypes={['logistics']}>
                <LogisticsCompanyDashboard />
              </AuthGuard>
            } />
            <Route path="/fleet-management" element={
              <AuthGuard userTypes={['logistics']}>
                <FleetManagement />
              </AuthGuard>
            } />
            <Route path="/jobs-deliveries" element={
              <AuthGuard userTypes={['logistics']}>
                <JobsDeliveries />
              </AuthGuard>
            } />
            <Route path="/shipments" element={
              <AuthGuard userTypes={['logistics']}>
                <Shipments />
              </AuthGuard>
            } />
            <Route path="/drivers-management" element={
              <AuthGuard userTypes={['logistics']}>
                <DriversManagement />
              </AuthGuard>
            } />
            <Route path="/analytics" element={
              <AuthGuard userTypes={['logistics']}>
                <Analytics />
              </AuthGuard>
            } />
            
            {/* Driver Routes */}
            <Route path="/driver-dashboard" element={
              <AuthGuard userTypes={['driver']}>
                <DriverDashboard />
              </AuthGuard>
            } />
            <Route path="/available-jobs" element={
              <AuthGuard userTypes={['driver']}>
                <AvailableJobs />
              </AuthGuard>
            } />
            <Route path="/my-deliveries" element={
              <AuthGuard userTypes={['driver']}>
                <MyDeliveries />
              </AuthGuard>
            } />
            <Route path="/earnings" element={
              <AuthGuard userTypes={['driver']}>
                <Earnings />
              </AuthGuard>
            } />
            <Route path="/profile" element={
              <AuthGuard userTypes={['driver']}>
                <Profile />
              </AuthGuard>
            } />
            
            {/* Business Routes */}
            <Route path="/business-dashboard" element={
              <AuthGuard userTypes={['business']}>
                <BusinessDashboard />
              </AuthGuard>
            } />
            <Route path="/business-deliveries" element={
              <AuthGuard userTypes={['business']}>
                <BusinessDeliveries />
              </AuthGuard>
            } />
            <Route path="/new-delivery" element={
              <AuthGuard userTypes={['business']}>
                <NewDelivery />
              </AuthGuard>
            } />
            <Route path="/invoices" element={
              <AuthGuard userTypes={['business']}>
                <Invoices />
              </AuthGuard>
            } />
            <Route path="/payment-methods" element={
              <AuthGuard userTypes={['business']}>
                <PaymentMethods />
              </AuthGuard>
            } />
            <Route path="/payment" element={
              <AuthGuard userTypes={['business']}>
                <PaymentPage />
              </AuthGuard>
            } />
            
            {/* New Frequent Routes Page */}
            <Route 
              path="/frequent-routes" 
              element={
                <AuthGuard userTypes={['business']}>
                  <FrequentRoutesPage />
                </AuthGuard>
              } 
            />
            
            {/* Add these new routes */}
            <Route path="/track-shipment" element={
              <AuthGuard userTypes={['business']}>
                <TrackShipment />
              </AuthGuard>
            } />
            <Route path="/file-claim" element={
              <AuthGuard userTypes={['business']}>
                <FileDamageClaim />
              </AuthGuard>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
