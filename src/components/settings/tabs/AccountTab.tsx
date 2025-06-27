
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import EditProfileModal from "@/components/profile/EditProfileModal";

interface AccountTabProps {
  type: "logistics" | "driver" | "business";
  onSave: () => void;
}

const AccountTab = ({ type, onSave }: AccountTabProps) => {
  const { toast } = useToast();
  const { profile } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCancel = () => {
    toast({
      title: "Changes discarded",
      description: "Your changes have been discarded",
    });
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  value={profile?.full_name || ''} 
                  className="mt-1 bg-neutral/5" 
                  readOnly 
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={profile?.email || ''} 
                  className="mt-1 bg-neutral/5" 
                  readOnly 
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={profile?.phone || ''} 
                  className="mt-1 bg-neutral/5" 
                  readOnly 
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input 
                  id="role" 
                  value={
                    type === "logistics" ? "Fleet Manager" : 
                    type === "driver" ? "Delivery Driver" : 
                    "Account Manager"
                  } 
                  className="mt-1 bg-neutral/5" 
                  readOnly 
                />
              </div>
            </div>

            {(type === "logistics" || type === "business") && profile?.company_name && (
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input 
                  id="company" 
                  value={profile.company_name} 
                  className="mt-1 bg-neutral/5" 
                  readOnly 
                />
              </div>
            )}

            {type === "driver" && profile?.vehicle_type && (
              <div>
                <Label htmlFor="vehicle">Vehicle Type</Label>
                <Input 
                  id="vehicle" 
                  value={profile.vehicle_type} 
                  className="mt-1 bg-neutral/5" 
                  readOnly 
                />
              </div>
            )}
            
            <div className="flex justify-end">
              <Button variant="outline" className="mr-2" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleEditProfile}>Edit Profile</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
    </>
  );
};

export default AccountTab;
