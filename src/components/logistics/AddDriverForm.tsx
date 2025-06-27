
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

const addDriverFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format." }),
  licenseNumber: z.string().min(5, { message: "Valid driver's license number is required." }),
  licenseClass: z.string().min(1, { message: "License class must be selected." }),
  experience: z.string().min(1, { message: "Experience must be selected." }),
  emergencyContact: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Valid emergency contact number is required." }),
});

export type AddDriverFormValues = z.infer<typeof addDriverFormSchema>;

interface AddDriverFormProps {
  onSubmitSuccess: (data: AddDriverFormValues) => void;
  setOpen: (open: boolean) => void;
}

// License class options for commercial drivers
const licenseClassOptions = [
  { value: "Class C", label: "Class C (Light Commercial)" },
  { value: "Class B", label: "Class B (Heavy Commercial)" },
  { value: "Class A", label: "Class A (Commercial + Trailer)" },
  { value: "Class E", label: "Class E (Special Equipment)" },
];

// Experience options
const experienceOptions = [
  { value: "0-1 years", label: "0-1 Year" },
  { value: "1-2 years", label: "1-2 Years" },
  { value: "2-5 years", label: "2-5 Years" },
  { value: "5-10 years", label: "5-10 Years" },
  { value: "10+ years", label: "10+ Years" },
];

export function AddDriverForm({ onSubmitSuccess, setOpen }: AddDriverFormProps) {
  const form = useForm<AddDriverFormValues>({
    resolver: zodResolver(addDriverFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      licenseNumber: "",
      licenseClass: "",
      experience: "",
      emergencyContact: "",
    },
  });

  const onSubmit = (data: AddDriverFormValues) => {
    console.log("Driver registration data:", data);
    onSubmitSuccess(data);
    toast({
      title: "Driver Added",
      description: `${data.name} has been successfully registered.`,
    });
    setOpen(false);
    form.reset(); 
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. John Mwangi Kariuki" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g. +254712345678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver's License Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g. DL123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="licenseClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License Class</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select License Class" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {licenseClassOptions.map(option => (
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
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driving Experience</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Experience Level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {experienceOptions.map(option => (
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
          name="emergencyContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Contact</FormLabel>
              <FormControl>
                <Input placeholder="e.g. +254723456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 pt-2">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary-dark text-white">
            <Plus className="h-4 w-4 mr-2" />
            Register Driver
          </Button>
        </div>
      </form>
    </Form>
  );
}
