
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ErrorLogData {
  errorMessage: string;
  errorStack?: string;
  pageUrl?: string;
  userAgent?: string;
  userId?: string;
}

export const logError = async (error: Error, additionalData?: Partial<ErrorLogData>) => {
  const errorData: ErrorLogData = {
    errorMessage: error.message,
    errorStack: error.stack,
    pageUrl: window.location.href,
    userAgent: navigator.userAgent,
    ...additionalData
  };

  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    await supabase.from('error_logs').insert({
      user_id: user?.id || null,
      error_message: errorData.errorMessage,
      error_stack: errorData.errorStack,
      page_url: errorData.pageUrl,
      user_agent: errorData.userAgent
    });
  } catch (logError) {
    console.error('Failed to log error:', logError);
  }
};

export const handleAsyncError = async (
  asyncFunction: () => Promise<any>,
  errorMessage: string = "An error occurred",
  showToast: boolean = true
) => {
  try {
    return await asyncFunction();
  } catch (error) {
    console.error(errorMessage, error);
    
    if (error instanceof Error) {
      await logError(error);
      
      if (showToast) {
        toast.error(errorMessage, {
          description: error.message
        });
      }
    }
    
    throw error;
  }
};

export const validateRequired = (value: any, fieldName: string): boolean => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    toast.error(`${fieldName} is required`);
    return false;
  }
  return true;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address");
    return false;
  }
  return true;
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    toast.error("Please enter a valid phone number");
    return false;
  }
  return true;
};

export const validateWeight = (weight: number): boolean => {
  if (weight <= 0) {
    toast.error("Weight must be greater than 0");
    return false;
  }
  return true;
};

export const validateFutureDate = (date: string): boolean => {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    toast.error("Date must be in the future");
    return false;
  }
  return true;
};
