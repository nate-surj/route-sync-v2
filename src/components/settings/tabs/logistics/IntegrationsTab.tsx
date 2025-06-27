
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Truck, MapPin, BarChart3, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface IntegrationsTabProps {
  onSave: () => void;
}

const IntegrationsTab = ({ onSave }: IntegrationsTabProps) => {
  const { toast } = useToast();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-5 w-5 mr-2" />
          Integrations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <IntegrationItem 
            icon={<Truck className="w-6 h-6 text-neutral" />}
            title="Fleet Management System"
            description="Connect your existing fleet management tools"
            onConnect={() => {
              toast({
                title: "Integration Setup",
                description: "Fleet Management System integration wizard started",
              });
            }}
          />
          
          <IntegrationItem 
            icon={<MapPin className="w-6 h-6 text-neutral" />}
            title="GPS Tracking System"
            description="Real-time vehicle tracking and route optimization"
            onConnect={() => {
              toast({
                title: "Integration Setup",
                description: "GPS Tracking System integration wizard started",
              });
            }}
          />
          
          <IntegrationItem 
            icon={<BarChart3 className="w-6 h-6 text-neutral" />}
            title="Business Intelligence"
            description="Advanced analytics and reporting tools"
            onConnect={() => {
              toast({
                title: "Integration Setup",
                description: "Business Intelligence integration wizard started",
              });
            }}
          />
          
          <IntegrationItem 
            icon={<CreditCard className="w-6 h-6 text-neutral" />}
            title="Accounting System"
            description="Connect your accounting software"
            onConnect={() => {
              toast({
                title: "Integration Setup",
                description: "Accounting System integration wizard started",
              });
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface IntegrationItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onConnect: () => void;
}

const IntegrationItem = ({ icon, title, description, onConnect }: IntegrationItemProps) => (
  <div className="flex items-center justify-between p-4 border rounded-md">
    <div className="flex items-center">
      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-neutral-light">{description}</p>
      </div>
    </div>
    <Button variant="outline" onClick={onConnect}>
      Connect
    </Button>
  </div>
);

export default IntegrationsTab;
