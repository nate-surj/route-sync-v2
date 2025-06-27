
import { Bell, Settings, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsHeaderProps {
  type: "logistics" | "driver" | "business";
}

const SettingsHeader = ({ type }: SettingsHeaderProps) => {
  const { toast } = useToast();
  
  // Different color schemes based on user type
  const getBgColor = () => {
    switch (type) {
      case "driver": 
        return "bg-gradient-to-r from-blue-50 to-white";
      case "business": 
        return "bg-gradient-to-r from-amber-50 to-white";
      default: 
        return "bg-white";
    }
  };
  
  const getUserInfo = () => {
    switch (type) {
      case "driver":
        return {
          label: "Driver: John Doe",
          icon: "JD",
          accent: "bg-blue-600 text-white"
        };
      case "business":
        return {
          label: "Business: ABC Corp",
          icon: "AC",
          accent: "bg-amber-600 text-white"
        };
      default:
        return {
          label: "Company: RSA Logistics",
          icon: "RL", 
          accent: "bg-secondary text-white"
        };
    }
  };
  
  const userInfo = getUserInfo();
  
  return (
    <header className={`shadow-sm z-10 ${getBgColor()}`}>
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-neutral flex items-center">
            {type === "driver" && <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />}
            {type === "business" && <Settings className="h-6 w-6 mr-2 text-amber-600" />}
            {type === "logistics" ? "Settings" : type === "driver" ? "Driver Settings" : "Business Settings"}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className={`inline-block ${userInfo.accent} text-xs px-2 py-1 rounded-md`}>
              {userInfo.label}
            </span>
          </div>
          
          <button 
            className={`p-2 rounded-full text-neutral hover:bg-cream hover:${type === "driver" ? "text-blue-600" : type === "business" ? "text-amber-600" : "text-primary"} transition-colors relative`}
            onClick={() => {
              toast({
                title: "Notifications",
                description: "You have 3 unread notifications",
              });
            }}
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <div className={`h-8 w-8 rounded-full ${type === "driver" ? "bg-blue-600/10" : type === "business" ? "bg-amber-600/10" : "bg-neutral/10"} flex items-center justify-center text-neutral font-bold`}>
            {userInfo.icon}
          </div>
        </div>
      </div>
    </header>
  );
};

export default SettingsHeader;
