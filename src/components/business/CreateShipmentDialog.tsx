
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Package, Truck, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const shipmentFormSchema = z.object({
  origin: z.string().min(3, "Origin must be at least 3 characters"),
  destination: z.string().min(3, "Destination must be at least 3 characters"),
  departureDate: z.date({
    required_error: "Departure date is required",
  }),
  arrivalDate: z.date({
    required_error: "Arrival date is required",
  }),
  items: z.number().min(1, "Must have at least 1 item"),
  weight: z.string().min(1, "Weight is required"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
  packageType: z.string().min(1, "Package type is required"),
  specialInstructions: z.string().optional(),
  senderName: z.string().min(2, "Sender name is required"),
  senderPhone: z.string().min(10, "Valid phone number is required"),
  senderAddress: z.string().min(5, "Complete sender address is required"),
  recipientName: z.string().min(2, "Recipient name is required"),
  recipientPhone: z.string().min(10, "Valid phone number is required"),
  recipientAddress: z.string().min(5, "Complete recipient address is required"),
});

type ShipmentFormValues = z.infer<typeof shipmentFormSchema>;

interface CreateShipmentDialogProps {
  onShipmentCreated?: () => void;
  children?: React.ReactNode;
}

const CreateShipmentDialog = ({ onShipmentCreated, children }: CreateShipmentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<ShipmentFormValues>({
    resolver: zodResolver(shipmentFormSchema),
    defaultValues: {
      items: 1,
      specialInstructions: "",
    },
  });

  const generateShipmentId = () => {
    const prefix = "SH";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `${prefix}-${timestamp}${random}`;
  };

  const onSubmit = async (values: ShipmentFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a shipment",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const shipmentId = generateShipmentId();
      
      // Create shipment in the shipments table
      const { error: shipmentError } = await supabase
        .from('shipments')
        .insert({
          shipment_id: shipmentId,
          user_id: user.id,
          origin: values.origin,
          destination: values.destination,
          departure_date: values.departureDate.toISOString().split('T')[0],
          arrival_date: values.arrivalDate.toISOString().split('T')[0],
          status: 'scheduled',
          items: values.items,
          weight: values.weight,
          vehicle: values.vehicleType,
        });

      if (shipmentError) throw shipmentError;

      // Also create entry in shipment_tracking table for detailed tracking
      const { error: trackingError } = await supabase
        .from('shipment_tracking')
        .insert({
          tracking_id: shipmentId,
          customer_id: user.id,
          sender_name: values.senderName,
          sender_phone: values.senderPhone,
          sender_address: values.senderAddress,
          recipient_name: values.recipientName,
          recipient_phone: values.recipientPhone,
          recipient_address: values.recipientAddress,
          package_type: values.packageType,
          weight_kg: parseFloat(values.weight.replace(/[^0-9.]/g, '')) || 0,
          special_instructions: values.specialInstructions,
          current_status: 'pending',
          estimated_delivery_date: values.arrivalDate.toISOString().split('T')[0],
          package_condition: 'good',
        });

      if (trackingError) throw trackingError;

      toast({
        title: "Shipment created successfully",
        description: `Shipment ${shipmentId} has been scheduled`,
      });

      form.reset();
      setOpen(false);
      onShipmentCreated?.();
    } catch (error) {
      console.error("Error creating shipment:", error);
      toast({
        title: "Error creating shipment",
        description: "There was a problem creating your shipment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const vehicleTypes = [
    "1T Van",
    "2T Van", 
    "5T Truck",
    "7T Truck",
    "10T Truck",
    "15T Truck",
    "20T Truck",
    "Pickup Truck",
    "Trailer"
  ];

  const packageTypes = [
    "Electronics",
    "Furniture",
    "Clothing",
    "Food & Beverages",
    "Medical Supplies",
    "Agricultural Produce",
    "Automotive Parts",
    "Industrial Equipment",
    "Documents",
    "Other"
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Package className="h-4 w-4 mr-2" />
            Create New Shipment
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Create New Shipment
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new shipment request
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Route Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Route Information
                </h3>
                
                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origin</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Nairobi, Kenya" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Mombasa, Kenya" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="departureDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Departure Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="arrivalDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Arrival Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Package Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Package Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="items"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Items</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Weight</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 50kg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="packageType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select package type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {packageTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Vehicle Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {vehicleTypes.map((vehicle) => (
                            <SelectItem key={vehicle} value={vehicle}>
                              <div className="flex items-center gap-2">
                                <Truck className="h-4 w-4" />
                                {vehicle}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Sender Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sender Information</h3>
                
                <FormField
                  control={form.control}
                  name="senderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="senderPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+254 700 000 000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="senderAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender Address</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Complete pickup address including building, street, area"
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Recipient Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recipient Information</h3>
                
                <FormField
                  control={form.control}
                  name="recipientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+254 700 000 000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipientAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Address</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Complete delivery address including building, street, area"
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Special Instructions */}
            <FormField
              control={form.control}
              name="specialInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Instructions (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any special handling instructions, delivery preferences, or notes"
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Include any special requirements like fragile handling, time restrictions, etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Package className="h-4 w-4 mr-2 animate-spin" />
                    Creating Shipment...
                  </>
                ) : (
                  <>
                    <Package className="h-4 w-4 mr-2" />
                    Create Shipment
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateShipmentDialog;
