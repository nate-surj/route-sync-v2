import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { toast } from "@/hooks/use-toast";
import { Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const addJobFormSchema = z.object({
  customerName: z.string().min(2, { message: "Customer name must be at least 2 characters." }),
  customerPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format." }),
  customerEmail: z.string().email({ message: "Invalid email address." }).optional().or(z.literal("")),
  pickupAddress: z.string().min(5, { message: "Pickup address must be at least 5 characters." }),
  deliveryAddress: z.string().min(5, { message: "Delivery address must be at least 5 characters." }),
  pickupDate: z.string().min(1, { message: "Pickup date is required." }),
  pickupTime: z.string().min(1, { message: "Pickup time is required." }),
  deliveryDate: z.string().optional(),
  deliveryTime: z.string().optional(),
  packageType: z.string().min(1, { message: "Package type must be selected." }),
  weightKg: z.string().min(1, { message: "Weight is required." }),
  dimensionsLength: z.string().optional(),
  dimensionsWidth: z.string().optional(),
  dimensionsHeight: z.string().optional(),
  specialInstructions: z.string().optional(),
  vehicleType: z.string().min(1, { message: "Vehicle type must be selected." }),
  paymentAmount: z.string().min(1, { message: "Payment amount is required." }),
});

export type AddJobFormValues = z.infer<typeof addJobFormSchema>;

interface AddJobFormProps {
  onSubmitSuccess: () => void;
  setOpen: (open: boolean) => void;
}

// Package type options
const packageTypeOptions = [
  { value: "documents", label: "Documents" },
  { value: "electronics", label: "Electronics" },
  { value: "food_items", label: "Food Items" },
  { value: "clothing", label: "Clothing" },
  { value: "furniture", label: "Furniture" },
  { value: "medical_supplies", label: "Medical Supplies" },
  { value: "industrial_parts", label: "Industrial Parts" },
  { value: "fragile_items", label: "Fragile Items" },
  { value: "bulk_goods", label: "Bulk Goods" },
  { value: "other", label: "Other" },
];

// Vehicle type options
const vehicleTypeOptions = [
  { value: "motorcycle", label: "Motorcycle" },
  { value: "van_1t", label: "Van (1 Ton)" },
  { value: "van_2_5t", label: "Van (2.5 Ton)" },
  { value: "truck_5t", label: "Truck (5 Ton)" },
  { value: "truck_7t", label: "Truck (7 Ton)" },
  { value: "truck_10t", label: "Truck (10 Ton)" },
  { value: "truck_15t", label: "Truck (15 Ton)" },
  { value: "truck_20t", label: "Truck (20+ Ton)" },
  { value: "refrigerated", label: "Refrigerated Vehicle" },
];

export function AddJobForm({ onSubmitSuccess, setOpen }: AddJobFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<AddJobFormValues>({
    resolver: zodResolver(addJobFormSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      pickupAddress: "",
      deliveryAddress: "",
      pickupDate: "",
      pickupTime: "",
      deliveryDate: "",
      deliveryTime: "",
      packageType: "",
      weightKg: "",
      dimensionsLength: "",
      dimensionsWidth: "",
      dimensionsHeight: "",
      specialInstructions: "",
      vehicleType: "",
      paymentAmount: "",
    },
  });

  const onSubmit = async (data: AddJobFormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Job creation data:", data);

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to create a job.",
          variant: "destructive",
        });
        return;
      }

      // Insert the new job into the database with type assertion
      const { data: jobData, error } = await supabase
        .from('logistics_jobs')
        .insert({
          logistics_company_id: user.id,
          customer_name: data.customerName,
          customer_phone: data.customerPhone,
          customer_email: data.customerEmail || null,
          pickup_address: data.pickupAddress,
          delivery_address: data.deliveryAddress,
          pickup_date: data.pickupDate,
          pickup_time: data.pickupTime,
          delivery_date: data.deliveryDate || null,
          delivery_time: data.deliveryTime || null,
          package_type: data.packageType,
          weight_kg: data.weightKg ? parseFloat(data.weightKg) : null,
          dimensions_length: data.dimensionsLength ? parseFloat(data.dimensionsLength) : null,
          dimensions_width: data.dimensionsWidth ? parseFloat(data.dimensionsWidth) : null,
          dimensions_height: data.dimensionsHeight ? parseFloat(data.dimensionsHeight) : null,
          special_instructions: data.specialInstructions || null,
          vehicle_type: data.vehicleType,
          payment_amount: data.paymentAmount ? parseFloat(data.paymentAmount) : null,
          status: 'pending',
          job_id: '' // Will be auto-generated by trigger
        } as any)
        .select();

      if (error) {
        console.error("Error creating job:", error);
        toast({
          title: "Error",
          description: "Failed to create job. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Job Created",
        description: `Job has been successfully created for ${data.customerName}.`,
      });
      
      onSubmitSuccess();
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. TechCorp Kenya Ltd" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="customerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Phone</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. +254712345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="customerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Email (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. contact@techcorp.co.ke" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="pickupAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Address</FormLabel>
                <FormControl>
                  <Input placeholder="Full pickup address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="deliveryAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Address</FormLabel>
                <FormControl>
                  <Input placeholder="Full delivery address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
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

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Date (Optional)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="deliveryTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Time (Optional)</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="packageType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Package Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {packageTypeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
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
            name="weightKg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 25.5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="dimensionsLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Length (cm)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dimensionsWidth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width (cm)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="50" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dimensionsHeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="vehicleType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Vehicle Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vehicle Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vehicleTypeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
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
          name="paymentAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Amount (KES)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 5000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="specialInstructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Instructions (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any special handling instructions..."
                  rows={3}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary-dark text-white"
            disabled={isSubmitting}
          >
            <Package className="h-4 w-4 mr-2" />
            {isSubmitting ? "Creating..." : "Create Job"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
