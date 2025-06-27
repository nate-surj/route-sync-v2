
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountTab from "./tabs/AccountTab";
import NotificationsTab from "./tabs/NotificationsTab";
import SecurityTab from "./tabs/SecurityTab";
import LogisticsCompanyTab from "./tabs/logistics/CompanyTab";
import LogisticsIntegrationsTab from "./tabs/logistics/IntegrationsTab";
import DriverVehicleTab from "./tabs/driver/VehicleTab";
import DriverLocationTab from "./tabs/driver/LocationTab";
import BusinessCompanyTab from "./tabs/business/CompanyTab";
import BusinessBillingTab from "./tabs/business/BillingTab";
import BusinessShippingTab from "./tabs/business/ShippingTab";

interface SettingsTabsProps {
  type: "logistics" | "driver" | "business";
  onSave: () => void;
  simplified?: boolean;
}

const SettingsTabs = ({ type, onSave, simplified = false }: SettingsTabsProps) => {
  // Define settings tabs based on user type
  const getSettingsTabs = () => {
    const commonTabs = [
      { id: "account", label: "Account" },
      { id: "notifications", label: "Notifications" },
      { id: "security", label: "Security" }
    ];
    
    // For driver simplified view, limit tabs
    if (type === "driver" && simplified) {
      return [
        { id: "vehicle", label: "Vehicle" },
        { id: "location", label: "Location" }
      ];
    }
    
    // Add type-specific tabs
    if (type === "logistics") {
      return [
        ...commonTabs,
        { id: "company", label: "Company" },
        { id: "integrations", label: "Integrations" }
      ];
    } else if (type === "driver") {
      return [
        ...commonTabs,
        { id: "vehicle", label: "Vehicle" },
        { id: "location", label: "Location Services" }
      ];
    } else if (type === "business") {
      return [
        ...commonTabs,
        { id: "company", label: "Company" },
        { id: "billing", label: "Billing" },
        { id: "shipping", label: "Shipping Preferences" }
      ];
    }
    
    return commonTabs;
  };

  const settingsTabs = getSettingsTabs();
  
  return (
    <Tabs defaultValue={settingsTabs[0].id} className={simplified ? "bg-white p-4 rounded-lg border" : ""}>
      <TabsList className={`mb-6 bg-white border w-full justify-start overflow-x-auto ${simplified ? "border-0 p-0" : ""}`}>
        {settingsTabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="px-4 py-2">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {/* Only render content for tabs included in the settingsTabs array */}
      {settingsTabs.some(tab => tab.id === "account") && (
        <TabsContent value="account">
          <AccountTab type={type} onSave={onSave} />
        </TabsContent>
      )}
      
      {settingsTabs.some(tab => tab.id === "notifications") && (
        <TabsContent value="notifications">
          <NotificationsTab type={type} onSave={onSave} />
        </TabsContent>
      )}
      
      {settingsTabs.some(tab => tab.id === "security") && (
        <TabsContent value="security">
          <SecurityTab onSave={onSave} />
        </TabsContent>
      )}
      
      {type === "logistics" && (
        <>
          <TabsContent value="company">
            <LogisticsCompanyTab onSave={onSave} />
          </TabsContent>
          
          <TabsContent value="integrations">
            <LogisticsIntegrationsTab onSave={onSave} />
          </TabsContent>
        </>
      )}
      
      {type === "driver" && (
        <>
          <TabsContent value="vehicle">
            <DriverVehicleTab onSave={onSave} />
          </TabsContent>
          
          <TabsContent value="location">
            <DriverLocationTab onSave={onSave} />
          </TabsContent>
        </>
      )}
      
      {type === "business" && (
        <>
          <TabsContent value="company">
            <BusinessCompanyTab onSave={onSave} />
          </TabsContent>
          
          <TabsContent value="billing">
            <BusinessBillingTab onSave={onSave} />
          </TabsContent>
          
          <TabsContent value="shipping">
            <BusinessShippingTab onSave={onSave} />
          </TabsContent>
        </>
      )}
    </Tabs>
  );
};

export default SettingsTabs;
