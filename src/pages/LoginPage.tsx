
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import Logo from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { validateRequired, validateEmail, logError } from "@/utils/errorHandling";
import EmailVerificationBanner from "@/components/EmailVerificationBanner";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user && profile) {
      redirectToDashboard(profile.user_type);
    }
  }, [user, profile]);

  const redirectToDashboard = (userType: string | null) => {
    switch (userType) {
      case 'logistics':
        navigate('/logistics-dashboard');
        break;
      case 'driver':
        navigate('/driver-dashboard');
        break;
      case 'business':
        navigate('/business-dashboard');
        break;
      default:
        navigate('/business-dashboard'); // Default to business dashboard
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when input changes
  };

  const validateForm = () => {
    if (!validateRequired(formData.email, "Email")) return false;
    if (!validateEmail(formData.email)) return false;
    if (!validateRequired(formData.password, "Password")) return false;
    
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      });

      if (error) {
        console.error("Login error:", error.message);
        await logError(error);
        setError(error.message);
        toast.error("Login failed", {
          description: error.message || "Please check your credentials and try again"
        });
      } else if (data.user) {
        toast.success("Successfully logged in!");
        // Redirect will happen via useEffect when profile is loaded
      }
    } catch (error: any) {
      console.error("Unexpected login error:", error);
      if (error instanceof Error) {
        await logError(error);
      }
      setError("An unexpected error occurred. Please try again.");
      toast.error("Login failed", {
        description: "An unexpected error occurred. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Logo className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-neutral">Login</h1>
        </div>

        <EmailVerificationBanner />

        <Card>
          <CardHeader>
            <CardTitle>Account Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm text-primary hover:underline"
                    onClick={() => navigate("/forgot-password")}
                    disabled={isLoading}
                    type="button"
                  >
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-normal"
                  onClick={() => navigate("/onboarding")}
                  disabled={isLoading}
                >
                  Sign up here
                </Button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
