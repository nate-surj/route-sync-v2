
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface VehicleTabProps {
  onSave: () => void;
}

const VehicleTab = ({ onSave }: VehicleTabProps) => {
  const { toast } = useToast();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Truck className="h-5 w-5 mr-2" />
          Vehicle Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vehicleModel">Vehicle Model</Label>
              <Input id="vehicleModel" defaultValue="Toyota Hilux" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="licensePlate">License Plate</Label>
              <Input id="licensePlate" defaultValue="KBZ 123A" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="vehicleYear">Vehicle Year</Label>
              <Input id="vehicleYear" defaultValue="2021" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="vehicleColor">Vehicle Color</Label>
              <Input id="vehicleColor" defaultValue="White" className="mt-1" />
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium flex items-center mb-4">
              <Settings className="h-4 w-4 mr-2" />
              Maintenance Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lastService">Last Service Date</Label>
                <Input id="lastService" type="date" defaultValue="2023-05-15" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="nextService">Next Service Due</Label>
                <Input id="nextService" type="date" defaultValue="2023-11-15" className="mt-1" readOnly />
              </div>
              <div>
                <Label htmlFor="mileage">Current Mileage</Label>
                <Input id="mileage" defaultValue="45,230" className="mt-1" />
              </div>
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

export default VehicleTab;
