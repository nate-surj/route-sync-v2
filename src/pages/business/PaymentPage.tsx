
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PaymentPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to payment-methods page
    navigate("/payment-methods");
  }, [navigate]);
  
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-neutral">Redirecting to payment methods...</p>
      </div>
    </div>
  );
};

export default PaymentPage;
