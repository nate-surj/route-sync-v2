import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Bike, Truck } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  companyName: string;
  fleetSize: string;
  vehicleType: string;
  businessType: string;
}

interface RegistrationFormProps {
  userType: string;
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  onBack: () => void;
  onVehicleTypeChange?: (value: string) => void;
  onBusinessTypeChange?: (value: string) => void;
}

const RegistrationForm = ({
  userType,
  formData,
  onInputChange,
  onSubmit,
  isSubmitting,
  onBack,
  onVehicleTypeChange,
  onBusinessTypeChange
}: RegistrationFormProps) => {
  const getTitle = () => {
    switch (userType) {
      case "logistics":
        return "Logistics Company Registration";
      case "driver":
        return "Driver Registration";
      case "business":
        return "Business Registration";
      default:
        return "Registration";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{getTitle()}</CardTitle>
        <CardDescription>Please provide your details to complete your registration.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={onInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Choose a secure password"
                value={formData.password}
                onChange={onInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+254 7XX XXX XXX"
                value={formData.phone}
                onChange={onInputChange}
                required
              />
            </div>
            
            {
            userType === "logistics" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={onInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fleetSize">Fleet Size <span className="text-red-500">*</span></Label>
                  <Input
                    id="fleetSize"
                    name="fleetSize"
                    type="number"
                    placeholder="Number of vehicles"
                    min="1"
                    value={formData.fleetSize}
                    onChange={onInputChange}
                    required
                  />
                </div>
              </>
            )
          }

            
            {
            userType === "driver" && (
              <div className="space-y-2 md:col-span-2">
                <Label>Vehicle Type <span className="text-red-500">*</span></Label>
                <RadioGroup
                  value={formData.vehicleType}
                  onValueChange={onVehicleTypeChange}
                  className="grid grid-cols-3 gap-4"
                >
                  <Label
                    htmlFor="vehicle-motorbike"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem value="motorbike" id="vehicle-motorbike" className="sr-only" />
                    <Bike className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Motorbike</span>
                  </Label>
                  
                  <Label
                    htmlFor="vehicle-van"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem value="van" id="vehicle-van" className="sr-only" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3 h-6 w-6">
                      <path d="M10 2h4"></path>
                      <path d="M12 14v-4"></path>
                      <path d="M4 14h16"></path>
                      <path d="M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"></path>
                    </svg>
                    <span className="text-sm font-medium">Van</span>
                  </Label>
                  
                  <Label
                    htmlFor="vehicle-truck"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem value="truck" id="vehicle-truck" className="sr-only" />
                    <Truck className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Truck</span>
                  </Label>
                </RadioGroup>
              </div>
            )
          }

            
            {
            userType === "business" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={onInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label>Business Type <span className="text-red-500">*</span></Label>
                  <RadioGroup
                    value={formData.businessType}
                    onValueChange={onBusinessTypeChange}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                  >
                    <Label
                      htmlFor="business-retail"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-primary"
                    >
                      <RadioGroupItem value="retail" id="business-retail" className="sr-only" />
                      <span className="text-sm font-medium">Retail</span>
                    </Label>
                    
                    <Label
                      htmlFor="business-agriculture"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-primary"
                    >
                      <RadioGroupItem value="agriculture" id="business-agriculture" className="sr-only" />
                      <span className="text-sm font-medium">Agriculture</span>
                    </Label>
                    
                    <Label
                      htmlFor="business-manufacturing"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-primary"
                    >
                      <RadioGroupItem value="manufacturing" id="business-manufacturing" className="sr-only" />
                      <span className="text-sm font-medium">Manufacturing</span>
                    </Label>
                    
                    <Label
                      htmlFor="business-ecommerce"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-primary"
                    >
                      <RadioGroupItem value="ecommerce" id="business-ecommerce" className="sr-only" />
                      <span className="text-sm font-medium">E-Commerce</span>
                    </Label>
                  </RadioGroup>
                </div>
              </>
            )
          }
          </div>
          
          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-primary hover:bg-primary-dark text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Complete Registration"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
