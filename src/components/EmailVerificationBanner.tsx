
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Mail, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

const EmailVerificationBanner = () => {
  const { user, isEmailVerified, resendVerification } = useAuth();
  const [isHidden, setIsHidden] = useState(false);
  const [isResending, setIsResending] = useState(false);

  if (!user || isEmailVerified || isHidden) {
    return null;
  }

  const handleResend = async () => {
    setIsResending(true);
    await resendVerification();
    setIsResending(false);
  };

  return (
    <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800 mb-4">
      <Mail className="h-4 w-4" />
      <div className="flex items-center justify-between w-full">
        <AlertDescription className="flex-1">
          Please verify your email address to access all features. Check your inbox for a verification link.
        </AlertDescription>
        <div className="flex items-center space-x-2 ml-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending ? "Sending..." : "Resend"}
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsHidden(true)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Alert>
  );
};

export default EmailVerificationBanner;
