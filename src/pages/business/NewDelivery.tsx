
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { MapPin, Package, TruckIcon } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import LocationAutocomplete from "@/components/LocationAutocomplete";

const formSchema = z.object({
  pickupAddress: z.string().min(5, "Pickup address must be at least 5 characters"),
  pickupDate: z.string().min(1, "Please select a pickup date"),
  pickupTime: z.string().min(1, "Please select a pickup time"),
  deliveryAddress: z.string().min(5, "Delivery address must be at least 5 characters"),
  packageType: z.string().min(1, "Please select a package type"),
  weight: z.string().min(1, "Please enter the weight"),
  length: z.string(),
  width: z.string(),
  height: z.string(),
  specialInstructions: z.string(),
  vehicleType: z.string().min(1, "Please select a vehicle type"),
});

const NewDelivery = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupAddress: "",
      pickupDate: "",
      pickupTime: "",
      deliveryAddress: "",
      packageType: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      specialInstructions: "",
      vehicleType: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication error",
          description: "You must be logged in to create a delivery request.",
          variant: "destructive",
        });
        return;
      }
      
      // Insert the new job into the database
      const { data, error } = await supabase
        .from('jobs')
        .insert({
          customer_id: user.id,
          pickup_address: values.pickupAddress,
          pickup_date: values.pickupDate,
          pickup_time: values.pickupTime,
          delivery_address: values.deliveryAddress,
          package_type: values.packageType,
          weight: parseFloat(values.weight) || 0,
          length: values.length ? parseFloat(values.length) : null,
          width: values.width ? parseFloat(values.width) : null,
          height: values.height ? parseFloat(values.height) : null,
          special_instructions: values.specialInstructions,
          vehicle_type: values.vehicleType,
        })
        .select();
      
      if (error) {
        console.error("Error submitting delivery request:", error);
        toast({
          title: "Error",
          description: "Failed to submit your delivery request. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      // Clear the form
      form.reset({
        pickupAddress: "",
        pickupDate: "",
        pickupTime: "",
        deliveryAddress: "",
        packageType: "",
        weight: "",
        length: "",
        width: "",
        height: "",
        specialInstructions: "",
        vehicleType: "",
      });
      
      // Show success toast
      toast({
        title: "Delivery request created",
        description: "Your delivery request has been submitted successfully.",
      });
      
      // Option to redirect or stay on page to add another request
      // navigate("/business/deliveries");
      
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Unexpected error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <DashboardSidebar type="business" />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <PageHeader 
              title="Create New Delivery" 
              description="Schedule a new delivery for your business"
              showBackButton
            />
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-cream">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center mb-4">
                        <div className="h-8 w-8 rounded-full bg-primary-light/20 flex items-center justify-center text-primary mr-2">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <h3 className="text-lg font-medium">Pickup Information</h3>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="pickupAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pickup Address</FormLabel>
                            <FormControl>
                              <LocationAutocomplete
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Enter pickup address"
                                id="pickupAddress"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="pickupDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pickup Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="pickupTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pickup Time</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center mb-4">
                        <div className="h-8 w-8 rounded-full bg-secondary-light/20 flex items-center justify-center text-secondary mr-2">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <h3 className="text-lg font-medium">Delivery Information</h3>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="deliveryAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Address</FormLabel>
                            <FormControl>
                              <LocationAutocomplete
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Enter delivery address"
                                id="deliveryAddress"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <div className="flex items-center mb-4">
                      <div className="h-8 w-8 rounded-full bg-primary-light/20 flex items-center justify-center text-primary mr-2">
                        <Package className="h-4 w-4" />
                      </div>
                      <h3 className="text-lg font-medium">Package Details</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="packageType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Package Type</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select package type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="box">Box</SelectItem>
                                  <SelectItem value="envelope">Envelope</SelectItem>
                                  <SelectItem value="pallet">Pallet</SelectItem>
                                  <SelectItem value="furniture">Furniture</SelectItem>
                                  <SelectItem value="electronics">Electronics</SelectItem>
                                  <SelectItem value="fragile">Fragile Items</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight (kg)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" step="0.1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="length"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Length (cm)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="width"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Width (cm)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="height"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Height (cm)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="specialInstructions"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Special Instructions</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Any special handling requirements" rows={3} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <div className="flex items-center mb-4">
                      <div className="h-8 w-8 rounded-full bg-secondary-light/20 flex items-center justify-center text-secondary mr-2">
                        <TruckIcon className="h-4 w-4" />
                      </div>
                      <h3 className="text-lg font-medium">Vehicle Requirements</h3>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem className="max-w-md">
                          <FormLabel>Vehicle Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select vehicle type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="motorcycle">Motorcycle</SelectItem>
                              <SelectItem value="car">Car</SelectItem>
                              <SelectItem value="van">Van</SelectItem>
                              <SelectItem value="small_truck">Small Truck (3 ton)</SelectItem>
                              <SelectItem value="medium_truck">Medium Truck (7 ton)</SelectItem>
                              <SelectItem value="large_truck">Large Truck (10+ ton)</SelectItem>
                              <SelectItem value="refrigerated">Refrigerated Vehicle</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose the appropriate vehicle type for your delivery
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <Button 
                      variant="outline" 
                      type="button"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary-dark text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Delivery Request"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default NewDelivery;
