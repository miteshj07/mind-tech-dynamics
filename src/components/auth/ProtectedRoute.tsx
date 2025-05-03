
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAdmin, isLoading } = useAuth();
  const location = useLocation();

  // If still checking authentication status, show loading spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If not admin, redirect to login page
  if (!isAdmin) {
    // Save the location they were trying to go to
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  // If they are an admin, render the child components
  return <>{children}</>;
};

export default ProtectedRoute;
