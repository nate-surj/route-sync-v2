
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import UserTypeSelection from "@/components/onboarding/UserTypeSelection";
import RegistrationForm from "@/components/onboarding/RegistrationForm";
import { validateRequired, validateEmail, validatePhone, logError } from "@/utils/errorHandling";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();
  const queryParams = new URLSearchParams(location.search);
  const defaultType = queryParams.get("type") || "";
  
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<string>(defaultType);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
    fleetSize: "",
    vehicleType: "",
    businessType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && profile) {
      const redirectMap = {
        logistics: "/logistics-dashboard",
        driver: "/driver-dashboard",
        business: "/business-dashboard"
      };
      navigate(redirectMap[profile.user_type as keyof typeof redirectMap] || "/");
    }

    if (defaultType) {
      setUserType(defaultType);
      setStep(2);
    }
  }, [defaultType, user, profile, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleUserTypeSelect = (type: string) => {
    setUserType(type);
    setStep(2);
  };

  const validateForm = () => {
    // Validate required fields
    if (!validateRequired(formData.name.trim(), "Full name")) return false;
    if (formData.name.trim().length < 2) {
      toast.error("Full name must be at least 2 characters long");
      return false;
    }
    
    if (!validateRequired(formData.email, "Email")) return false;
    if (!validateEmail(formData.email)) return false;
    
    if (!validateRequired(formData.password, "Password")) return false;
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    
    if (!validateRequired(formData.phone, "Phone number")) return false;
    if (!validatePhone(formData.phone)) return false;
    
    // User type specific validations
    if (userType === 'logistics') {
      if (!validateRequired(formData.companyName, "Company name")) return false;
      if (!validateRequired(formData.fleetSize, "Fleet size")) return false;
      
      const fleetSizeNum = parseInt(formData.fleetSize);
      if (isNaN(fleetSizeNum) || fleetSizeNum <= 0) {
        toast.error("Fleet size must be a valid number greater than 0");
        return false;
      }
    } else if (userType === 'driver') {
      if (!validateRequired(formData.vehicleType, "Vehicle type")) return false;
    } else if (userType === 'business') {
      if (!validateRequired(formData.companyName, "Company name")) return false;
      if (!validateRequired(formData.businessType, "Business type")) return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    try {
      // Build metadata
      const metadata: Record<string, any> = {
        full_name: formData.name.trim(),
        user_type: userType,
        phone: formData.phone.trim(),
      };

      // Add user type specific fields
      if (userType === 'logistics') {
        metadata.company_name = formData.companyName.trim();
        metadata.fleet_size = parseInt(formData.fleetSize);
      } else if (userType === 'driver') {
        metadata.vehicle_type = formData.vehicleType;
      } else if (userType === 'business') {
        metadata.business_type = formData.businessType;
        metadata.company_name = formData.companyName.trim();
      }

      console.log("Registering with metadata:", metadata);

      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        options: {
          data: metadata
        }
      });

      if (error) {
        console.error("Registration error:", error);
        await logError(error);
        setError(error.message);
        toast.error("Registration failed", {
          description: error.message
        });
      } else {
        toast.success("Registration successful!", {
          description: "Please check your email to verify your account."
        });
        
        // Redirect to the appropriate dashboard
        const redirectMap = {
          logistics: "/logistics-dashboard",
          driver: "/driver-dashboard",
          business: "/business-dashboard"
        };
        navigate(redirectMap[userType as keyof typeof redirectMap] || "/");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      if (error instanceof Error) {
        await logError(error);
      }
      setError("An unexpected error occurred during registration");
      toast.error("Registration failed", {
        description: "Please try again later"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center bg-cream py-12">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm mb-6">
              {error}
            </div>
          )}
          
          {step === 1 ? (
            <UserTypeSelection onUserTypeSelect={handleUserTypeSelect} />
          ) : (
            <RegistrationForm
              userType={userType}
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              onBack={() => setStep(1)}
              onVehicleTypeChange={(value) => setFormData(prev => ({ ...prev, vehicleType: value }))}
              onBusinessTypeChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}
            />
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OnboardingPage;
