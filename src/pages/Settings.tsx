
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsTabs from "@/components/settings/SettingsTabs";
import EditProfileModal from "@/components/profile/EditProfileModal";
import ChangePasswordModal from "@/components/profile/ChangePasswordModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, TrendingUp, User } from "lucide-react";

interface SettingsProps {
  type?: "logistics" | "driver" | "business";
}

const Settings = ({ type = "logistics" }: SettingsProps) => {
  const { toast } = useToast();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings updated",
      description: "Your settings have been successfully updated",
    });
  };

  const handleProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleLocationClick = () => {
    toast({ 
      title: "Location", 
      description: "Location services settings will be available soon" 
    });
  };

  const handleEarningsClick = () => {
    toast({ 
      title: "Earnings", 
      description: "Earnings and payment settings will be available soon" 
    });
  };

  const handleChangePasswordClick = () => {
    setIsChangePasswordOpen(true);
  };

  // Get the appropriate settings title based on user type
  const getSettingsTitle = () => {
    switch (type) {
      case "driver":
        return "Driver Settings";
      case "business":
        return "Business Settings";
      case "logistics":
        return "Logistics Company Settings";
      default:
        return "Settings";
    }
  };

  // Driver dashboard has a simplified layout with focused content
  if (type === "driver") {
    return (
      <div className="h-screen flex overflow-hidden bg-cream">
        <DashboardSidebar type={type} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <SettingsHeader type={type} />
          
          <main className="flex-1 overflow-y-auto bg-cream">
            <div className="p-6">
              <PageHeader 
                title={getSettingsTitle()}
                description="Manage your driver profile, vehicle details, and app preferences"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="col-span-2 md:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Quick Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-4">
                        <button 
                          onClick={handleProfileClick}
                          className="p-4 bg-white border rounded-lg hover:bg-slate-50 transition-colors flex items-center"
                        >
                          <User className="h-5 w-5 mr-3 text-primary" />
                          <div className="text-left">
                            <h3 className="font-medium">Profile Settings</h3>
                            <p className="text-sm text-neutral-light">Update your personal information</p>
                          </div>
                        </button>
                        
                        <button 
                          onClick={handleLocationClick}
                          className="p-4 bg-white border rounded-lg hover:bg-slate-50 transition-colors flex items-center"
                        >
                          <MapPin className="h-5 w-5 mr-3 text-primary" />
                          <div className="text-left">
                            <h3 className="font-medium">Location Services</h3>
                            <p className="text-sm text-neutral-light">Configure how your location is shared</p>
                          </div>
                        </button>
                        
                        <button 
                          onClick={handleEarningsClick}
                          className="p-4 bg-white border rounded-lg hover:bg-slate-50 transition-colors flex items-center"
                        >
                          <TrendingUp className="h-5 w-5 mr-3 text-primary" />
                          <div className="text-left">
                            <h3 className="font-medium">Earnings & Payments</h3>
                            <p className="text-sm text-neutral-light">Manage payment methods and view history</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="col-span-2 md:col-span-1">
                  <SettingsTabs type={type} onSave={handleSaveSettings} simplified={true} />
                </div>
              </div>
            </div>
          </main>
        </div>

        <EditProfileModal 
          isOpen={isEditProfileOpen} 
          onClose={() => setIsEditProfileOpen(false)} 
        />
        <ChangePasswordModal 
          isOpen={isChangePasswordOpen} 
          onClose={() => setIsChangePasswordOpen(false)} 
        />
      </div>
    );
  }
  
  // Business dashboard has a wider layout focused on business operations
  else if (type === "business") {
    return (
      <div className="h-screen flex overflow-hidden bg-cream">
        <DashboardSidebar type={type} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <SettingsHeader type={type} />
          
          <main className="flex-1 overflow-y-auto bg-cream">
            <div className="p-6">
              <PageHeader 
                title={getSettingsTitle()}
                description="Manage your business account, shipping preferences, and payment options"
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <SettingsTabs type={type} onSave={handleSaveSettings} />
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-sm text-neutral-light">Account Type</span>
                          <span className="font-medium">Business</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-sm text-neutral-light">Status</span>
                          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Active
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-sm text-neutral-light">Plan</span>
                          <span className="font-medium">Premium</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-light">Next Billing</span>
                          <span className="font-medium">May 15, 2023</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Profile Updated</p>
                            <p className="text-xs text-neutral-light">2 days ago</p>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Billing Method Changed</p>
                            <p className="text-xs text-neutral-light">5 days ago</p>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New Address Added</p>
                            <p className="text-xs text-neutral-light">1 week ago</p>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>

        <EditProfileModal 
          isOpen={isEditProfileOpen} 
          onClose={() => setIsEditProfileOpen(false)} 
        />
        <ChangePasswordModal 
          isOpen={isChangePasswordOpen} 
          onClose={() => setIsChangePasswordOpen(false)} 
        />
      </div>
    );
  }
  
  // Default logistics dashboard layout
  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <DashboardSidebar type={type} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <SettingsHeader type={type} />
        
        <main className="flex-1 overflow-y-auto bg-cream">
          <div className="p-6">
            <PageHeader 
              title={getSettingsTitle()}
              description={`Manage your ${
                type === "logistics" ? "company" : 
                type === "driver" ? "driver" : 
                "business"} settings and preferences`
              }
            />
            
            <SettingsTabs type={type} onSave={handleSaveSettings} />
          </div>
        </main>
      </div>

      <EditProfileModal 
        isOpen={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)} 
      />
      <ChangePasswordModal 
        isOpen={isChangePasswordOpen} 
        onClose={() => setIsChangePasswordOpen(false)} 
      />
    </div>
  );
};

export default Settings;
