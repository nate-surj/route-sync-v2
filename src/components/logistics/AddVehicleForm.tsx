
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Truck, ArrowLeft, Fuel } from "lucide-react";

interface AddVehicleFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AddVehicleForm = ({ onSuccess, onCancel }: AddVehicleFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    registration_number: "",
    vin_number: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    vehicle_type: "",
    fuel_type: "diesel",
    fuel_efficiency: "",
    max_payload_kg: "",
    cargo_volume_m3: "",
    length_m: "",
    width_m: "",
    height_m: "",
    current_mileage_km: "",
    vehicle_condition: "good",
    current_location: "",
    insurance_provider: "",
    insurance_policy_number: "",
    insurance_expiry_date: "",
    commercial_permit_number: "",
    condition_notes: "",
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to add vehicles",
          variant: "destructive",
        });
        return;
      }

      // Prepare vehicle data for insertion
      const vehicleData = {
        company_id: user.id,
        registration_number: formData.registration_number,
        vin_number: formData.vin_number || null,
        make: formData.make,
        model: formData.model,
        year: formData.year,
        vehicle_type: formData.vehicle_type,
        fuel_type: formData.fuel_type,
        fuel_efficiency: formData.fuel_efficiency ? parseFloat(formData.fuel_efficiency.toString()) : null,
        max_payload_kg: formData.max_payload_kg ? parseFloat(formData.max_payload_kg.toString()) : 0,
        cargo_volume_m3: formData.cargo_volume_m3 ? parseFloat(formData.cargo_volume_m3.toString()) : null,
        length_m: formData.length_m ? parseFloat(formData.length_m.toString()) : null,
        width_m: formData.width_m ? parseFloat(formData.width_m.toString()) : null,
        height_m: formData.height_m ? parseFloat(formData.height_m.toString()) : null,
        current_mileage_km: formData.current_mileage_km ? parseInt(formData.current_mileage_km.toString()) : 0,
        vehicle_condition: formData.vehicle_condition,
        current_location: formData.current_location || null,
        insurance_provider: formData.insurance_provider || null,
        insurance_policy_number: formData.insurance_policy_number || null,
        insurance_expiry_date: formData.insurance_expiry_date || null,
        commercial_permit_number: formData.commercial_permit_number || null,
        condition_notes: formData.condition_notes || null,
        operational_status: 'available'
      };

      console.log('Submitting vehicle data:', vehicleData);

      // Insert vehicle data using type assertion
      const { data, error } = await (supabase as any)
        .from('fleet_vehicles')
        .insert(vehicleData)
        .select()
        .single();

      if (error) {
        console.error('Error adding vehicle:', error);
        toast({
          title: "Error Adding Vehicle",
          description: error.message || "Failed to add vehicle to database",
          variant: "destructive",
        });
        return;
      }

      console.log('Vehicle added successfully:', data);

      toast({
        title: "Vehicle Added Successfully",
        description: `Vehicle ${data.id} has been added to your fleet`,
      });

      // Reset form
      setFormData({
        registration_number: "",
        vin_number: "",
        make: "",
        model: "",
        year: new Date().getFullYear(),
        vehicle_type: "",
        fuel_type: "diesel",
        fuel_efficiency: "",
        max_payload_kg: "",
        cargo_volume_m3: "",
        length_m: "",
        width_m: "",
        height_m: "",
        current_mileage_km: "",
        vehicle_condition: "good",
        current_location: "",
        insurance_provider: "",
        insurance_policy_number: "",
        insurance_expiry_date: "",
        commercial_permit_number: "",
        condition_notes: "",
      });

      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        {onCancel && (
          <Button variant="ghost" onClick={onCancel} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
        <div className="flex items-center">
          <Truck className="h-6 w-6 mr-2" />
          <h1 className="text-2xl font-bold">Add New Vehicle</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="registration_number">Registration Number *</Label>
              <Input
                id="registration_number"
                value={formData.registration_number}
                onChange={(e) => handleInputChange('registration_number', e.target.value)}
                placeholder="e.g. KCA 123A"
                required
              />
            </div>
            <div>
              <Label htmlFor="vin_number">VIN Number</Label>
              <Input
                id="vin_number"
                value={formData.vin_number}
                onChange={(e) => handleInputChange('vin_number', e.target.value)}
                placeholder="Vehicle Identification Number"
              />
            </div>
            <div>
              <Label htmlFor="make">Make *</Label>
              <Input
                id="make"
                value={formData.make}
                onChange={(e) => handleInputChange('make', e.target.value)}
                placeholder="e.g. Isuzu, Mercedes, Toyota"
                required
              />
            </div>
            <div>
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                placeholder="e.g. FRR, Sprinter, Hilux"
                required
              />
            </div>
            <div>
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                min="1990"
                max={new Date().getFullYear() + 2}
                required
              />
            </div>
            <div>
              <Label htmlFor="vehicle_type">Vehicle Type *</Label>
              <Select value={formData.vehicle_type} onValueChange={(value) => handleInputChange('vehicle_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="truck_5t">Truck (5T)</SelectItem>
                  <SelectItem value="truck_7t">Truck (7T)</SelectItem>
                  <SelectItem value="truck_10t">Truck (10T)</SelectItem>
                  <SelectItem value="truck_15t">Truck (15T)</SelectItem>
                  <SelectItem value="truck_20t">Truck (20T)</SelectItem>
                  <SelectItem value="van_1t">Van (1T)</SelectItem>
                  <SelectItem value="van_2_5t">Van (2.5T)</SelectItem>
                  <SelectItem value="pickup">Pickup</SelectItem>
                  <SelectItem value="trailer">Trailer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fuel_type">Fuel Type</Label>
              <Select value={formData.fuel_type} onValueChange={(value) => handleInputChange('fuel_type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fuel_efficiency" className="flex items-center">
                <Fuel className="h-4 w-4 mr-2" />
                Fuel Efficiency (km/L)
              </Label>
              <Input
                id="fuel_efficiency"
                type="number"
                value={formData.fuel_efficiency}
                onChange={(e) => handleInputChange('fuel_efficiency', e.target.value)}
                placeholder="e.g. 8.5"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="current_location">Current Location</Label>
              <Input
                id="current_location"
                value={formData.current_location}
                onChange={(e) => handleInputChange('current_location', e.target.value)}
                placeholder="e.g. Nairobi Depot"
              />
            </div>
          </CardContent>
        </Card>

        {/* Capacity & Dimensions */}
        <Card>
          <CardHeader>
            <CardTitle>Capacity & Dimensions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="max_payload_kg">Max Payload (kg) *</Label>
              <Input
                id="max_payload_kg"
                type="number"
                value={formData.max_payload_kg}
                onChange={(e) => handleInputChange('max_payload_kg', e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <Label htmlFor="cargo_volume_m3">Cargo Volume (m³)</Label>
              <Input
                id="cargo_volume_m3"
                type="number"
                value={formData.cargo_volume_m3}
                onChange={(e) => handleInputChange('cargo_volume_m3', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="length_m">Length (m)</Label>
              <Input
                id="length_m"
                type="number"
                value={formData.length_m}
                onChange={(e) => handleInputChange('length_m', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="width_m">Width (m)</Label>
              <Input
                id="width_m"
                type="number"
                value={formData.width_m}
                onChange={(e) => handleInputChange('width_m', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="height_m">Height (m)</Label>
              <Input
                id="height_m"
                type="number"
                value={formData.height_m}
                onChange={(e) => handleInputChange('height_m', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="current_mileage_km">Current Mileage (km)</Label>
              <Input
                id="current_mileage_km"
                type="number"
                value={formData.current_mileage_km}
                onChange={(e) => handleInputChange('current_mileage_km', e.target.value)}
                min="0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Condition */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Condition</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="vehicle_condition">Overall Condition</Label>
              <Select value={formData.vehicle_condition} onValueChange={(value) => handleInputChange('vehicle_condition', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                  <SelectItem value="needs_repair">Needs Repair</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="condition_notes">Condition Notes</Label>
              <Textarea
                id="condition_notes"
                value={formData.condition_notes}
                onChange={(e) => handleInputChange('condition_notes', e.target.value)}
                placeholder="Any additional notes about the vehicle condition"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Insurance & Documentation */}
        <Card>
          <CardHeader>
            <CardTitle>Insurance & Documentation</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="insurance_provider">Insurance Provider</Label>
              <Input
                id="insurance_provider"
                value={formData.insurance_provider}
                onChange={(e) => handleInputChange('insurance_provider', e.target.value)}
                placeholder="e.g. Jubilee Insurance"
              />
            </div>
            <div>
              <Label htmlFor="insurance_policy_number">Policy Number</Label>
              <Input
                id="insurance_policy_number"
                value={formData.insurance_policy_number}
                onChange={(e) => handleInputChange('insurance_policy_number', e.target.value)}
                placeholder="Insurance policy number"
              />
            </div>
            <div>
              <Label htmlFor="insurance_expiry_date">Insurance Expiry Date</Label>
              <Input
                id="insurance_expiry_date"
                type="date"
                value={formData.insurance_expiry_date}
                onChange={(e) => handleInputChange('insurance_expiry_date', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="commercial_permit_number">Commercial Permit Number</Label>
              <Input
                id="commercial_permit_number"
                value={formData.commercial_permit_number}
                onChange={(e) => handleInputChange('commercial_permit_number', e.target.value)}
                placeholder="Commercial vehicle permit number"
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? "Adding Vehicle..." : "Add Vehicle"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicleForm;
