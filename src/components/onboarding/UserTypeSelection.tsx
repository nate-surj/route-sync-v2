
import { Truck, Bike, Building } from "lucide-react";
import UserTypeCard from "./UserTypeCard";
import Logo from "@/components/Logo";

interface UserTypeSelectionProps {
  onUserTypeSelect: (type: string) => void;
}

const UserTypeSelection = ({ onUserTypeSelect }: UserTypeSelectionProps) => {
  return (
    <>
      <div className="text-center mb-8">
        <Logo className="mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-neutral mb-2">Welcome to RouteSync Africa</h1>
        <p className="text-lg text-neutral-light">
          Select your user type to get started with your onboarding journey.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UserTypeCard
          icon={Truck}
          title="Logistics Company"
          description="For companies with multiple vehicles looking to optimize fleet operations and reduce costs."
          onClick={() => onUserTypeSelect("logistics")}
          iconClassName="bg-primary/10"
        />
        
        <UserTypeCard
          icon={Bike}
          title="Individual Driver"
          description="For independent drivers with motorbikes, vans, or trucks looking for delivery opportunities."
          onClick={() => onUserTypeSelect("driver")}
          iconClassName="bg-secondary/10"
        />
        
        <UserTypeCard
          icon={Building}
          title="SME/Business"
          description="For businesses that need reliable delivery services for their products and goods."
          onClick={() => onUserTypeSelect("business")}
          iconClassName="bg-neutral/10"
        />
      </div>
    </>
  );
};

export default UserTypeSelection;
