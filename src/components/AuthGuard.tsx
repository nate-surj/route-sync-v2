
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
  userTypes?: string[];
}

const AuthGuard = ({ children, userTypes = [] }: AuthGuardProps) => {
  const { user, profile, isLoading } = useAuth();

  useEffect(() => {
    // This helps debug authentication issues
    if (!isLoading && !user) {
      console.log("Auth guard: Not authenticated, redirecting to login");
    }
    
    if (!isLoading && user && profile && userTypes.length > 0) {
      if (!userTypes.includes(profile.user_type || '')) {
        console.log(`Auth guard: User type ${profile.user_type} not authorized for this page`);
      }
    }
    
    // Log account type for demo data visibility
    if (profile?.account_type === 'demo') {
      console.log("Demo account detected - demo data will be visible");
    }
  }, [user, profile, isLoading, userTypes]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user type is allowed
  if (userTypes.length > 0 && profile) {
    if (!userTypes.includes(profile.user_type || '')) {
      // Redirect to appropriate dashboard based on user type
      if (profile.user_type === 'logistics') {
        return <Navigate to="/logistics-dashboard" replace />;
      } else if (profile.user_type === 'driver') {
        return <Navigate to="/driver-dashboard" replace />;
      } else if (profile.user_type === 'business') {
        return <Navigate to="/business-dashboard" replace />;
      }
      
      // Fallback to home page if no matching user type
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;
