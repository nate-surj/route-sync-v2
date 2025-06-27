
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const { profile, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    company_name: profile?.company_name || '',
    address: profile?.address || '',
    city: profile?.city || '',
    country: profile?.country || 'Kenya',
    postal_code: profile?.postal_code || '',
    fleet_size: profile?.fleet_size?.toString() || '',
    vehicle_type: profile?.vehicle_type || '',
    business_type: profile?.business_type || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!user?.id) {
      toast.error('User not found');
      return;
    }

    setIsLoading(true);
    try {
      const updateData: any = {
        full_name: formData.full_name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        postal_code: formData.postal_code,
        updated_at: new Date().toISOString()
      };

      // Add type-specific fields
      if (profile?.user_type === 'logistics' || profile?.user_type === 'business') {
        updateData.company_name = formData.company_name;
      }

      if (profile?.user_type === 'logistics' && formData.fleet_size) {
        updateData.fleet_size = parseInt(formData.fleet_size);
      }

      if (profile?.user_type === 'driver') {
        updateData.vehicle_type = formData.vehicle_type;
      }

      if (profile?.user_type === 'business') {
        updateData.business_type = formData.business_type;
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile updated successfully');
      onClose();
      
      // Reload the page to refresh the profile data
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          {(profile?.user_type === 'logistics' || profile?.user_type === 'business') && (
            <div>
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => handleInputChange('company_name', e.target.value)}
                placeholder="Enter company name"
              />
            </div>
          )}

          {profile?.user_type === 'logistics' && (
            <div>
              <Label htmlFor="fleet_size">Fleet Size</Label>
              <Input
                id="fleet_size"
                type="number"
                value={formData.fleet_size}
                onChange={(e) => handleInputChange('fleet_size', e.target.value)}
                placeholder="Number of vehicles"
              />
            </div>
          )}

          {profile?.user_type === 'driver' && (
            <div>
              <Label htmlFor="vehicle_type">Vehicle Type</Label>
              <Input
                id="vehicle_type"
                value={formData.vehicle_type}
                onChange={(e) => handleInputChange('vehicle_type', e.target.value)}
                placeholder="e.g., Van, Truck, Motorcycle"
              />
            </div>
          )}

          {profile?.user_type === 'business' && (
            <div>
              <Label htmlFor="business_type">Business Type</Label>
              <Input
                id="business_type"
                value={formData.business_type}
                onChange={(e) => handleInputChange('business_type', e.target.value)}
                placeholder="e.g., Retail, Manufacturing, Healthcare"
              />
            </div>
          )}

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter your address"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="City"
              />
            </div>
            <div>
              <Label htmlFor="postal_code">Postal Code</Label>
              <Input
                id="postal_code"
                value={formData.postal_code}
                onChange={(e) => handleInputChange('postal_code', e.target.value)}
                placeholder="Postal code"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              placeholder="Country"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
