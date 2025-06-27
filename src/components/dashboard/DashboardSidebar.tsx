
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/Logo";
import { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CreditCard,
  Clock,
  FileText,
  LayoutDashboard,
  MapPin,
  Package,
  Plus,
  Settings,
  TrendingUp,
  Truck,
  User,
  Users,
  Zap,
  LogOut,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  isSidebarOpen: boolean;
  onClick?: () => void;
}

const SidebarLink = ({ to, icon: Icon, label, isActive, isSidebarOpen, onClick }: SidebarLinkProps) => (
  <Link
    to={to}
    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-all duration-200
      ${isActive 
        ? "bg-primary-light/10 text-primary" 
        : "text-neutral hover:bg-cream hover:text-primary transition-colors"
      }`}
    onClick={onClick}
  >
    {isSidebarOpen ? (
      <>
        <Icon className="mr-3 h-6 w-6" />
        <span className="transition-opacity duration-200">{label}</span>
      </>
    ) : (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Icon className="mx-auto h-6 w-6" />
          </TooltipTrigger>
          <TooltipContent side="right">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )}
  </Link>
);

interface SidebarProps {
  type: "logistics" | "driver" | "business";
}

const DashboardSidebar = ({ type }: SidebarProps) => {
  const getSavedSidebarState = () => {
    try {
      const saved = localStorage.getItem(`${type}-sidebar-state`);
      return saved ? JSON.parse(saved) : true;
    } catch (e) {
      return true;
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(getSavedSidebarState());
  const location = useLocation();
  const { toast } = useToast();
  const { signOut } = useAuth();

  useEffect(() => {
    try {
      localStorage.setItem(`${type}-sidebar-state`, JSON.stringify(sidebarOpen));
    } catch (e) {
      console.error("Could not save sidebar state to localStorage", e);
    }
  }, [sidebarOpen, type]);
  
  const logisticsLinks = [
    { to: "/logistics-dashboard", icon: BarChart3, label: "Dashboard" },
    { to: "/fleet-management", icon: Truck, label: "Fleet Management" },
    { to: "/jobs-deliveries", icon: Package, label: "Jobs & Deliveries" },
    { to: "/shipments", icon: Truck, label: "Shipments" },
    { to: "/drivers-management", icon: Users, label: "Drivers" },
    { to: "/analytics", icon: TrendingUp, label: "Analytics" }
  ];
  
  const driverLinks = [
    { to: "/driver-dashboard", icon: MapPin, label: "Dashboard" },
    { to: "/available-jobs", icon: Zap, label: "Available Jobs" },
    { to: "/my-deliveries", icon: Clock, label: "My Deliveries" },
    { to: "/earnings", icon: TrendingUp, label: "Earnings" },
    { to: "/profile", icon: User, label: "My Profile" }
  ];
  
  const businessLinks = [
    { to: "/business-dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/business-deliveries", icon: Package, label: "Deliveries" },
    { to: "/new-delivery", icon: Plus, label: "New Delivery" },
    { to: "/track-shipment", icon: Truck, label: "Track Shipment" },
    { to: "/invoices", icon: FileText, label: "Invoices" },
    { to: "/payment-methods", icon: CreditCard, label: "Payment Methods" }
  ];
  
  const links = type === "logistics" 
    ? logisticsLinks 
    : type === "driver" 
      ? driverLinks 
      : businessLinks;

  const getSettingsPath = () => {
    switch (type) {
      case "driver":
        return "/driver-settings";
      case "business":
        return "/business-settings";
      case "logistics":
        return "/logistics-settings";
      default:
        return "/settings";
    }
  };
  
  const settingsPath = getSettingsPath();

  const handleLogout = () => {
    signOut();
  };

  const handleHelpSupport = () => {
    toast({
      title: "Help & Support",
      description: "Our support team will contact you shortly",
      variant: "default",
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen relative group`}>
      <div className="p-4 border-b flex justify-between items-center">
        {sidebarOpen ? (
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
        ) : (
          <Link to="/" className="mx-auto">
            <div className="h-8 w-8 rounded-md flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white font-bold text-lg">
              RS
            </div>
          </Link>
        )}
        <Button 
          onClick={toggleSidebar}
          variant="ghost"
          size="sm"
          className="text-neutral hover:text-primary transition-colors"
        >
          {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="space-y-1 px-2">
          {links.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              isActive={location.pathname === link.to}
              isSidebarOpen={sidebarOpen}
            />
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t space-y-2">
        <SidebarLink
          to={settingsPath}
          icon={Settings}
          label="Settings"
          isActive={location.pathname === settingsPath}
          isSidebarOpen={sidebarOpen}
        />
        
        {sidebarOpen ? (
          <div 
            className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-neutral hover:bg-cream hover:text-primary transition-colors cursor-pointer"
            onClick={handleHelpSupport}
          >
            <HelpCircle className="mr-3 h-6 w-6" />
            Help & Support
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="flex items-center justify-center py-2 text-base font-medium rounded-md text-neutral hover:bg-cream hover:text-primary transition-colors cursor-pointer"
                  onClick={handleHelpSupport}
                >
                  <HelpCircle className="h-6 w-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                Help & Support
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        {sidebarOpen ? (
          <div 
            className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-6 w-6" />
            Logout
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="flex items-center justify-center py-2 text-base font-medium rounded-md text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="h-6 w-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                Logout
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
