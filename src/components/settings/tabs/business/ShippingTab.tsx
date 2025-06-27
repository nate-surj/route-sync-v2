
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface ShippingTabProps {
  onSave: () => void;
}

const ShippingTab = ({ onSave }: ShippingTabProps) => {
  const { toast } = useToast();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Truck className="h-5 w-5 mr-2" />
          Shipping Preferences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-4">Default Shipping Address</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="shippingAddress">Address</Label>
                <Input id="shippingAddress" defaultValue="456 Commerce Avenue" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="shippingCity">City</Label>
                <Input id="shippingCity" defaultValue="Nairobi" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="shippingCountry">Country</Label>
                <Input id="shippingCountry" defaultValue="Kenya" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="shippingPostal">Postal Code</Label>
                <Input id="shippingPostal" defaultValue="00100" className="mt-1" />
              </div>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-4">Delivery Options</h3>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-medium">Expedited Shipping</h4>
                <p className="text-xs text-neutral-light">Use expedited shipping when available</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-medium">Saturday Delivery</h4>
                <p className="text-xs text-neutral-light">Allow deliveries on Saturday</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-medium">Signature Required</h4>
                <p className="text-xs text-neutral-light">Require signature for all deliveries</p>
              </div>
              <Switch defaultChecked={false} />
            </div>
          </div>
          
          <div className="flex justify-end">
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
      </CardContent>
    </Card>
  );
};

export default ShippingTab;
