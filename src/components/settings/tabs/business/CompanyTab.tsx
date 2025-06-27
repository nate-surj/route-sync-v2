
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Package, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CompanyTabProps {
  onSave: () => void;
}

const CompanyTab = ({ onSave }: CompanyTabProps) => {
  const { toast } = useToast();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building2 className="h-5 w-5 mr-2" />
          Company Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" defaultValue="ABC Corporation" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="businessTaxId">Tax ID / Registration Number</Label>
              <Input id="businessTaxId" defaultValue="BUS-987654321" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="businessAddress">Business Address</Label>
              <Input id="businessAddress" defaultValue="456 Commerce Avenue, Nairobi" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="businessWebsite">Business Website</Label>
              <div className="flex items-center mt-1">
                <Globe className="h-4 w-4 mr-2 text-neutral-light" />
                <Input id="businessWebsite" defaultValue="www.abccorp.com" />
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium flex items-center mb-4">
              <Package className="h-4 w-4 mr-2" />
              Business Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessType">Industry</Label>
                <select id="businessType" className="w-full mt-1 p-2 border rounded-md">
                  <option>Retail</option>
                  <option>Manufacturing</option>
                  <option>E-commerce</option>
                  <option>Wholesale</option>
                  <option>Services</option>
                </select>
              </div>
              <div>
                <Label htmlFor="businessSize">Company Size</Label>
                <select id="businessSize" className="w-full mt-1 p-2 border rounded-md">
                  <option>1-10 employees</option>
                  <option>11-50 employees</option>
                  <option>51-200 employees</option>
                  <option>201-500 employees</option>
                  <option>500+ employees</option>
                </select>
              </div>
            </div>
          </div>
          
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

export default CompanyTab;
