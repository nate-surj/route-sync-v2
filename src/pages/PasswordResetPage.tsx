
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import Logo from "@/components/Logo";
import { toast } from "sonner";
import { validateRequired, validateEmail, logError } from "@/utils/errorHandling";
import { ArrowLeft } from "lucide-react";

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRequired(email, "Email")) return;
    if (!validateEmail(email)) return;
    
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error("Password reset error:", error);
        await logError(error);
        toast.error("Password reset failed", {
          description: error.message
        });
      } else {
        setEmailSent(true);
        toast.success("Password reset email sent", {
          description: "Check your email for the reset link"
        });
      }
    } catch (error: any) {
      console.error("Unexpected password reset error:", error);
      if (error instanceof Error) {
        await logError(error);
      }
      toast.error("Password reset failed", {
        description: "An unexpected error occurred. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Logo className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-neutral">Check Your Email</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Email Sent</CardTitle>
              <CardDescription>
                We've sent a password reset link to {email}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Click the link in your email to reset your password. The link will expire in 24 hours.
              </p>
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or try again.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                variant="outline"
                onClick={() => setEmailSent(false)}
                className="w-full"
              >
                Send Another Email
              </Button>
              <Button 
                variant="link" 
                onClick={() => navigate("/login")}
                className="w-full"
              >
                Back to Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Logo className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-neutral">Reset Password</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Forgot your password?</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
              <Button 
                variant="link" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => navigate("/login")}
                disabled={isLoading}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PasswordResetPage;
