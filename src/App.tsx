
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ShipFitDetails from "./pages/ShipFitDetails";
import MaintenanceOperations from "./pages/MaintenanceOperations";
import DefectsAndRoutine from "./pages/DefectsAndRoutine";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/MainLayout";

const queryClient = new QueryClient();

// Auth protection wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    // Show loading indicator
    return <div className="min-h-screen flex items-center justify-center bg-navy-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600"></div>
    </div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/sfd" element={
            <ProtectedRoute>
              <MainLayout>
                <ShipFitDetails />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/maintop" element={
            <ProtectedRoute>
              <MainLayout>
                <MaintenanceOperations />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/dart" element={
            <ProtectedRoute>
              <MainLayout>
                <DefectsAndRoutine />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          {/* Add placeholder routes for other modules */}
          <Route path="/srar" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">Ship Readiness and Assessment Report (SRAR)</h1>
                  <p>This module is under development.</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/storedem" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">Stores and Demands Management</h1>
                  <p>This module is under development.</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/candef" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">Casualty and Emergency Management</h1>
                  <p>This module is under development.</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/fuss" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">Fleet Usage and Support System</h1>
                  <p>This module is under development.</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          {/* Global Masters routes */}
          <Route path="/masters/:masterId" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">Global Master</h1>
                  <p>This master data module is under development.</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          {/* Reports route */}
          <Route path="/reports" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">Reports</h1>
                  <p>The reporting module is under development.</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          {/* User Management route */}
          <Route path="/users" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">User Management</h1>
                  <p>The user management module is under development.</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          {/* Settings route */}
          <Route path="/settings" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">Settings</h1>
                  <p>The settings module is under development.</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          {/* Catch all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
