
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CreditCard, Globe } from "lucide-react";
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
              <Label htmlFor="companyName">Logistics Company Name</Label>
              <Input id="companyName" defaultValue="RSA Logistics" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="taxId">Tax ID / Registration Number</Label>
              <Input id="taxId" defaultValue="KEN-12345678" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="address">Company Address</Label>
              <Input id="address" defaultValue="123 Logistics Way, Nairobi" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="website">Company Website</Label>
              <div className="flex items-center mt-1">
                <Globe className="h-4 w-4 mr-2 text-neutral-light" />
                <Input id="website" defaultValue="www.rsalogistics.com" />
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium flex items-center mb-4">
              <CreditCard className="h-4 w-4 mr-2" />
              Billing Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="billingEmail">Billing Email</Label>
                <Input id="billingEmail" type="email" defaultValue="finance@rsalogistics.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="billingAddress">Billing Address</Label>
                <Input id="billingAddress" defaultValue="123 Logistics Way, Nairobi" className="mt-1" />
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
