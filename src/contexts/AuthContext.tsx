
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logError } from "@/utils/errorHandling";

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  user_type: 'logistics' | 'driver' | 'business' | null;
  company_name: string | null;
  fleet_size: number | null;
  vehicle_type: string | null;
  business_type: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  postal_code: string | null;
  account_type: 'demo' | 'regular' | null;
  email_verified: boolean | null;
  email_verification_sent_at: string | null;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  resendVerification: () => Promise<void>;
  isEmailVerified: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state change:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_OUT') {
          setProfile(null);
        } else if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && currentSession?.user) {
          // When signed in, fetch profile data
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession ? "Found session" : "No session");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // If user is logged in, fetch their profile
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  
  // Fetch user profile data
  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching user profile:', error);
        await logError(new Error(`Failed to fetch user profile: ${error.message}`));
        toast.error("Failed to load user profile", { 
          description: "Please refresh or try again later" 
        });
      } else if (data) {
        console.log("Profile fetched successfully:", data);
        setProfile(data as UserProfile);
      }
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
      if (error instanceof Error) {
        await logError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      if (error instanceof Error) {
        await logError(error);
      }
      toast.error("Error signing out", {
        description: "Please try again later",
      });
    }
  };

  const resendVerification = async () => {
    try {
      if (!user?.email) {
        toast.error("No email address found");
        return;
      }

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email
      });

      if (error) {
        throw error;
      }

      // Update verification sent timestamp
      await supabase
        .from('profiles')
        .update({ email_verification_sent_at: new Date().toISOString() })
        .eq('id', user.id);

      toast.success("Verification email sent", {
        description: "Please check your email for the verification link"
      });
    } catch (error) {
      console.error("Error resending verification:", error);
      if (error instanceof Error) {
        await logError(error);
        toast.error("Failed to send verification email", {
          description: error.message
        });
      }
    }
  };

  const isEmailVerified = user?.email_confirmed_at != null || profile?.email_verified === true;

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      profile, 
      isLoading, 
      signOut, 
      resendVerification,
      isEmailVerified
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
