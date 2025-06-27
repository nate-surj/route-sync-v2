
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, Home, LogOut, User, Bell, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Logo from "./Logo";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { toast } = useToast();
  const { user, profile, signOut, isLoading } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if we're on a dashboard page
  const isDashboardPage = 
    location.pathname.includes("dashboard") || 
    location.pathname.includes("fleet") ||
    location.pathname.includes("drivers") ||
    location.pathname.includes("analytics") ||
    location.pathname.includes("available-jobs") ||
    location.pathname.includes("my-deliveries") ||
    location.pathname.includes("earnings") ||
    location.pathname.includes("business") ||
    location.pathname.includes("shipments") ||
    location.pathname.includes("invoices") ||
    location.pathname.includes("payment-methods");

  // Get notifications based on user type
  const getNotificationsByUserType = () => {
    if (!profile?.user_type) return [];

    const baseNotifications = {
      logistics: [
        {
          id: 1,
          title: "Driver Performance Alert",
          message: "David Omondi's on-time rate has dropped to 87%. Consider providing additional training.",
          time: "2 hours ago",
          type: "warning",
          isRead: false
        },
        {
          id: 2,
          title: "Fleet Utilization Low",
          message: "Fleet utilization has decreased by 3% this month. Review vehicle assignments.",
          time: "1 day ago",
          type: "warning",
          isRead: false
        },
        {
          id: 3,
          title: "Revenue Milestone",
          message: "Congratulations! You've reached KES 3.2M in monthly revenue.",
          time: "5 hours ago",
          type: "success",
          isRead: true
        },
        {
          id: 4,
          title: "New Route Analysis",
          message: "System has identified a new high-demand route: Nairobi → Eldoret",
          time: "2 days ago",
          type: "info",
          isRead: true
        }
      ],
      driver: [
        {
          id: 1,
          title: "New Job Available",
          message: "High-priority delivery from Nairobi to Mombasa - KES 4,500",
          time: "30 minutes ago",
          type: "info",
          isRead: false
        },
        {
          id: 2,
          title: "Payment Received",
          message: "Payment of KES 2,800 has been processed for delivery RSA-J104",
          time: "2 hours ago",
          type: "success",
          isRead: false
        },
        {
          id: 3,
          title: "Route Update",
          message: "Your route to Kisumu has been optimized. Check updated directions.",
          time: "4 hours ago",
          type: "info",
          isRead: true
        },
        {
          id: 4,
          title: "Vehicle Maintenance",
          message: "Your assigned vehicle is due for maintenance next week.",
          time: "1 day ago",
          type: "warning",
          isRead: true
        }
      ],
      business: [
        {
          id: 1,
          title: "Delivery Completed",
          message: "Your shipment SH-5001 has been successfully delivered to Mombasa.",
          time: "1 hour ago",
          type: "success",
          isRead: false
        },
        {
          id: 2,
          title: "Invoice Generated",
          message: "Invoice INV-2024-001 for KES 12,500 is ready for review.",
          time: "3 hours ago",
          type: "info",
          isRead: false
        },
        {
          id: 3,
          title: "Delivery Delay",
          message: "Shipment SH-5003 may be delayed due to weather conditions.",
          time: "6 hours ago",
          type: "warning",
          isRead: true
        },
        {
          id: 4,
          title: "New Delivery Option",
          message: "Express delivery service is now available for urgent shipments.",
          time: "2 days ago",
          type: "info",
          isRead: true
        }
      ]
    };

    return baseNotifications[profile.user_type] || [];
  };

  const notifications = getNotificationsByUserType();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const markAllAsRead = () => {
    toast({
      title: "Notifications",
      description: "All notifications marked as read",
    });
  };

  const handleLogin = () => {
    toast({
      title: "Login",
      description: "Redirecting to login page",
    });
    navigate("/login");
  };

  const handleGetStarted = () => {
    toast({
      title: "Get Started",
      description: "Welcome to the onboarding process!",
    });
    navigate("/onboarding");
  };

  const getUserDashboardLink = () => {
    if (!profile?.user_type) return "/";
    
    const dashboardRoutes = {
      logistics: "/logistics-dashboard",
      driver: "/driver-dashboard",
      business: "/business-dashboard"
    };
    
    return dashboardRoutes[profile.user_type] || "/";
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo className="block h-8 w-auto" />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`border-transparent text-neutral-light hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === "/" ? "border-primary text-primary" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`border-transparent text-neutral-light hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === "/about" ? "border-primary text-primary" : ""
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`border-transparent text-neutral-light hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === "/contact" ? "border-primary text-primary" : ""
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-2">
            {isDashboardPage ? (
              <Link to="/">
                <Button variant="outline" className="border-primary text-primary">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            ) : isLoading ? (
              <div className="animate-pulse w-24 h-10 bg-gray-200 rounded"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                {profile?.user_type && (
                  <Link to={getUserDashboardLink()}>
                    <Button variant="default" className="bg-primary hover:bg-primary-dark text-white">
                      Go to Dashboard
                    </Button>
                  </Link>
                )}

                {/* Notification Bell - Show only for authenticated users */}
                {user && (
                  <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
                    <PopoverTrigger asChild>
                      <button 
                        className="p-2 rounded-full text-neutral hover:bg-cream hover:text-primary transition-colors relative"
                      >
                        <Bell className="h-6 w-6" />
                        {unreadCount > 0 && (
                          <span className="absolute top-1 right-1 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="end">
                      <div className="flex items-center justify-between px-4 py-3 border-b">
                        <h3 className="font-semibold text-neutral">Notifications</h3>
                        <div className="flex items-center space-x-2">
                          {unreadCount > 0 && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                              {unreadCount} new
                            </span>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={markAllAsRead}
                            className="text-xs"
                          >
                            Mark all read
                          </Button>
                        </div>
                      </div>
                      
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-neutral-light">
                            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No notifications</p>
                          </div>
                        ) : (
                          <div className="space-y-0">
                            {notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`p-4 border-b hover:bg-cream transition-colors cursor-pointer ${
                                  !notification.isRead ? 'bg-blue-50' : ''
                                }`}
                                onClick={() => {
                                  toast({
                                    title: notification.title,
                                    description: notification.message,
                                  });
                                }}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="flex-shrink-0 mt-1">
                                    {getNotificationIcon(notification.type)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <p className={`text-sm font-medium ${
                                        !notification.isRead ? 'text-neutral' : 'text-neutral-light'
                                      }`}>
                                        {notification.title}
                                      </p>
                                      {!notification.isRead && (
                                        <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                      )}
                                    </div>
                                    <p className="text-xs text-neutral-light mt-1 line-clamp-2">
                                      {notification.message}
                                    </p>
                                    <div className="flex items-center mt-2">
                                      <Clock className="h-3 w-3 text-neutral-light mr-1" />
                                      <span className="text-xs text-neutral-light">
                                        {notification.time}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-3 border-t">
                        <Button 
                          variant="ghost" 
                          className="w-full text-sm"
                          onClick={() => {
                            setIsNotificationOpen(false);
                            toast({
                              title: "View All Notifications",
                              description: "Opening notifications center",
                            });
                          }}
                        >
                          View all notifications
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full w-10 h-10 p-0">
                      {profile?.full_name ? (
                        <span>{profile.full_name.substring(0, 1).toUpperCase()}</span>
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {profile && (
                      <div className="px-2 py-1.5 text-sm font-medium border-b">
                        {profile.full_name}
                      </div>
                    )}
                    <Link to="/settings">
                      <DropdownMenuItem>
                        Settings
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary"
                  onClick={handleLogin}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button 
                  variant="default" 
                  className="bg-primary hover:bg-primary-dark text-white"
                  onClick={handleGetStarted}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral hover:text-primary hover:bg-cream focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`border-transparent text-neutral-light hover:bg-cream hover:border-primary hover:text-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                location.pathname === "/" ? "border-primary text-primary bg-cream" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`border-transparent text-neutral-light hover:bg-cream hover:border-primary hover:text-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                location.pathname === "/about" ? "border-primary text-primary bg-cream" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`border-transparent text-neutral-light hover:bg-cream hover:border-primary hover:text-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                location.pathname === "/contact" ? "border-primary text-primary bg-cream" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {isDashboardPage ? (
              <Link
                to="/"
                className="border-transparent text-neutral-light hover:bg-cream hover:border-primary hover:text-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Back to Home
              </Link>
            ) : user ? (
              <>
                {profile?.user_type && (
                  <Link 
                    to={getUserDashboardLink()}
                    className="border-transparent text-neutral-light hover:bg-cream hover:border-primary hover:text-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  to="/settings"
                  className="border-transparent text-neutral-light hover:bg-cream hover:border-primary hover:text-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <div 
                  className="border-transparent text-neutral-light hover:bg-cream hover:border-primary hover:text-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(false);
                    signOut();
                  }}
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <div 
                  className="border-transparent text-neutral-light hover:bg-cream hover:border-primary hover:text-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogin();
                  }}
                >
                  Login
                </div>
                <div className="mt-4 pl-3 pr-4">
                  <Button 
                    variant="default" 
                    className="w-full bg-primary hover:bg-primary-dark text-white"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleGetStarted();
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
