
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface LocationTabProps {
  onSave: () => void;
}

const LocationTab = ({ onSave }: LocationTabProps) => {
  const { toast } = useToast();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Location Services
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Location Tracking</h3>
              <p className="text-sm text-neutral-light">Allow the app to track your location while on duty</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Background Location</h3>
              <p className="text-sm text-neutral-light">Allow location tracking when app is in background</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Location Updates Frequency</h3>
              <p className="text-sm text-neutral-light">How often should your location be updated</p>
            </div>
            <select className="p-2 border rounded-md">
              <option>Real-time</option>
              <option>Every minute</option>
              <option>Every 5 minutes</option>
              <option>Every 15 minutes</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Off-Duty Tracking</h3>
              <p className="text-sm text-neutral-light">Track location when you're not on active delivery</p>
            </div>
            <Switch defaultChecked={false} />
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-4">Privacy Settings</h3>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-medium">Share Location with Customers</h4>
                <p className="text-xs text-neutral-light">Let customers see your real-time location during delivery</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-medium">Location History</h4>
                <p className="text-xs text-neutral-light">Store your location history for review</p>
              </div>
              <Switch defaultChecked />
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

export default LocationTab;
