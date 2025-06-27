
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Smartphone, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface PaymentProcessorProps {
  invoiceId: string;
  amount: number;
  isOpen: boolean;
  onClose: () => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0
  }).format(amount);
};

const PaymentProcessor = ({ invoiceId, amount, isOpen, onClose }: PaymentProcessorProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const navigate = useNavigate();

  // Sample payment methods (in real app, this would come from the payment methods page)
  const paymentMethods = [
    {
      id: "pm-1",
      name: "Visa ending in 4242",
      type: "credit_card",
      isDefault: true
    },
    {
      id: "pm-2", 
      name: "M-Pesa",
      type: "mobile_money",
      phoneNumber: "+254 712 345678",
      isDefault: false
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful",
        description: `Invoice ${invoiceId} has been paid successfully.`,
      });
      
      onClose();
      
      // Refresh the page to update invoice status
      window.location.reload();
    } catch (error) {
      toast({
        title: "Payment Failed", 
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddPaymentMethod = () => {
    onClose();
    navigate("/payment-methods");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pay Invoice {invoiceId}</DialogTitle>
          <DialogDescription>
            Complete payment for {formatCurrency(amount)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-blue-50 p-3 rounded-lg flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800">Payment Amount</h4>
              <p className="text-sm text-blue-600">
                You are about to pay {formatCurrency(amount)} for invoice {invoiceId}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Select Payment Method</h4>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedMethod === method.id
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary-light/10 flex items-center justify-center">
                        {method.type === 'credit_card' ? (
                          <CreditCard className="h-4 w-4 text-primary" />
                        ) : (
                          <Smartphone className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{method.name}</p>
                        {method.phoneNumber && (
                          <p className="text-sm text-gray-500">{method.phoneNumber}</p>
                        )}
                      </div>
                    </div>
                    {method.isDefault && (
                      <Badge className="bg-blue-100 text-blue-800">Default</Badge>
                    )}
                  </div>
                </div>
              ))}
              
              <Button
                variant="outline"
                className="w-full"
                onClick={handleAddPaymentMethod}
              >
                + Add New Payment Method
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button 
            onClick={handlePayment} 
            disabled={isProcessing || !selectedMethod}
            className="bg-green-600 hover:bg-green-700"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ${formatCurrency(amount)}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentProcessor;
