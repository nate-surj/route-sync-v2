import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Shield, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { validateRequired, logError } from "@/utils/errorHandling";

interface SecurityTabProps {
  onSave: () => void;
}

const SecurityTab = ({ onSave }: SecurityTabProps) => {
  const { toast: useToastHook } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRequired(passwordData.currentPassword, "Current Password")) return;
    if (!validateRequired(passwordData.newPassword, "New Password")) return;
    if (!validateRequired(passwordData.confirmPassword, "Confirm Password")) return;
    
    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    
    setIsLoading(true);

    try {
      // First verify current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || "",
        password: passwordData.currentPassword,
      });

      if (signInError) {
        toast.error("Current password is incorrect");
        setIsLoading(false);
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (updateError) {
        console.error("Password update error:", updateError);
        await logError(updateError);
        toast.error("Failed to update password", {
          description: updateError.message
        });
      } else {
        toast.success("Password updated successfully");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        onSave();
      }
    } catch (error: any) {
      console.error("Unexpected password update error:", error);
      if (error instanceof Error) {
        await logError(error);
      }
      toast.error("Failed to update password", {
        description: "An unexpected error occurred"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) {
      toast.error("No email address found");
      return;
    }

    setIsResetLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error("Password reset error:", error);
        await logError(error);
        toast.error("Failed to send reset email", {
          description: error.message
        });
      } else {
        toast.success("Password reset email sent", {
          description: "Check your email for the reset link"
        });
      }
    } catch (error: any) {
      console.error("Unexpected password reset error:", error);
      if (error instanceof Error) {
        await logError(error);
      }
      toast.error("Failed to send reset email", {
        description: "An unexpected error occurred"
      });
    } finally {
      setIsResetLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="h-5 w-5 mr-2" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input 
                  id="currentPassword" 
                  name="currentPassword"
                  type="password" 
                  className="mt-1"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword" 
                  name="newPassword"
                  type="password" 
                  className="mt-1"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password" 
                  className="mt-1"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setPasswordData({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                })}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="h-5 w-5 mr-2" />
            Password Reset
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Forgot your password? Send yourself a password reset email to create a new password.
            </p>
            <Button 
              variant="outline"
              onClick={handlePasswordReset}
              disabled={isResetLoading}
              className="w-full"
            >
              {isResetLoading ? "Sending..." : "Send Password Reset Email"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Enable Two-Factor Authentication</h4>
                <p className="text-xs text-neutral-light">Add an extra layer of security to your account</p>
              </div>
              <Switch 
                defaultChecked={false} 
                onCheckedChange={(checked) => {
                  if (checked) {
                    useToastHook({
                      title: "2FA Setup Required",
                      description: "Follow the setup process to enable two-factor authentication",
                    });
                  }
                }} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTab;
