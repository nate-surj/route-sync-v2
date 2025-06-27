
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface NotificationsTabProps {
  type: "logistics" | "driver" | "business";
  onSave: () => void;
}

const NotificationsTab = ({ type, onSave }: NotificationsTabProps) => {
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Notification Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Enable Notifications</h3>
              <p className="text-sm text-neutral-light">Receive notifications about system updates and alerts</p>
            </div>
            <Switch 
              checked={notificationsEnabled} 
              onCheckedChange={setNotificationsEnabled} 
            />
          </div>
          
          {notificationsEnabled && (
            <>
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">Notification Channels</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    <p className="text-xs text-neutral-light">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">SMS Notifications</h4>
                    <p className="text-xs text-neutral-light">Receive notifications via SMS</p>
                  </div>
                  <Switch 
                    checked={smsNotifications} 
                    onCheckedChange={setSmsNotifications} 
                  />
                </div>
              </div>
              
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">
                  {type === "logistics" ? "Company" : type === "driver" ? "Driver" : "Business"} Notifications
                </h3>
                
                {type === "logistics" && <LogisticsNotifications />}
                {type === "driver" && <DriverNotifications />}
                {type === "business" && <BusinessNotifications />}
              </div>
            </>
          )}
          
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

const LogisticsNotifications = () => (
  <>
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium">Fleet Updates</h4>
        <p className="text-xs text-neutral-light">Maintenance alerts and vehicle status</p>
      </div>
      <Switch defaultChecked />
    </div>
    
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium">Driver Updates</h4>
        <p className="text-xs text-neutral-light">Location and status changes for drivers</p>
      </div>
      <Switch defaultChecked />
    </div>
    
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium">Delivery Alerts</h4>
        <p className="text-xs text-neutral-light">Status changes for deliveries</p>
      </div>
      <Switch defaultChecked />
    </div>
  </>
);

const DriverNotifications = () => (
  <>
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium">New Job Alerts</h4>
        <p className="text-xs text-neutral-light">Get notified when new jobs are available</p>
      </div>
      <Switch defaultChecked />
    </div>
    
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium">Schedule Changes</h4>
        <p className="text-xs text-neutral-light">Get notified of changes to your delivery schedule</p>
      </div>
      <Switch defaultChecked />
    </div>
    
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium">Payment Notifications</h4>
        <p className="text-xs text-neutral-light">Receive updates about your earnings and payments</p>
      </div>
      <Switch defaultChecked />
    </div>
  </>
);

const BusinessNotifications = () => (
  <>
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium">Delivery Updates</h4>
        <p className="text-xs text-neutral-light">Status changes for your shipments</p>
      </div>
      <Switch defaultChecked />
    </div>
    
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium">Order Confirmations</h4>
        <p className="text-xs text-neutral-light">Get notified when your orders are confirmed</p>
      </div>
      <Switch defaultChecked />
    </div>
    
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium">Billing Alerts</h4>
        <p className="text-xs text-neutral-light">Receive updates about invoices and payments</p>
      </div>
      <Switch defaultChecked />
    </div>
  </>
);

export default NotificationsTab;
