
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface BillingTabProps {
  onSave: () => void;
}

const BillingTab = ({ onSave }: BillingTabProps) => {
  const { toast } = useToast();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Billing Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">Payment Methods</h3>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <div className="w-10 h-6 bg-blue-600 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-xs text-neutral-light">Expires 12/24</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full mr-2">Default</span>
                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <div className="w-10 h-6 bg-red-600 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">
                  MC
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 5555</p>
                  <p className="text-xs text-neutral-light">Expires 08/25</p>
                </div>
              </div>
              <div className="flex items-center">
                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  Remove
                </Button>
              </div>
            </div>
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="flex items-center" 
                onClick={() => {
                  toast({
                    title: "Add Payment Method",
                    description: "Payment method form will open soon",
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">Billing Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="billingContact">Billing Contact Name</Label>
                <Input id="billingContact" defaultValue="Sarah Johnson" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="billingPhone">Billing Phone</Label>
                <Input id="billingPhone" defaultValue="+254 712 345 678" className="mt-1" />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={() => {
                  toast({
                    title: "Changes discarded",
                    description: "Your changes have been discarded",
                  });
                }}
              >
                Cancel
              </Button>
              <Button onClick={onSave}>Save Changes</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingTab;
