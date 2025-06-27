
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"; // No longer used directly here
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Bell, MapPin, ArrowRight, Clock, Zap, Shield, TrendingUp, User, Settings, RefreshCw } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useDriverDashboard } from "@/hooks/useDriverData";
import { format, parseISO } from 'date-fns'; // For formatting dates
import { Skeleton } from "@/components/ui/skeleton"; // For loading states

const DriverDashboard = () => {
  const { 
    dashboardData, 
    unreadNotificationsCount, 
    isLoading, 
    error, 
    acceptJob,
    isAcceptingJob,
    profile,
    refetchData
  } = useDriverDashboard();

  console.log("DriverDashboard rendering. isLoading:", isLoading, "Error:", error, "Data:", dashboardData, "Profile:", profile);

  const getInitials = (fullName?: string | null) => {
    if (!fullName) return 'N/A';
    const names = fullName.split(' ');
    if (names.length === 0) return 'N/A';
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };
  
  const userInitials = profile ? getInitials(profile.full_name) : '...';
  const vehicleType = profile?.vehicle_type || 'N/A';

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-cream text-destructive">
        <p className="text-xl mb-2">Error loading dashboard data.</p>
        <p className="mb-4">{error.message}</p>
        <Button onClick={() => refetchData()} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <DashboardSidebar type="driver" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-neutral">Driver Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                 {isLoading ? <Skeleton className="h-6 w-24 rounded-md" /> : <span className="inline-block bg-secondary text-white text-xs px-2 py-1 rounded-md">
                  Vehicle: {vehicleType}
                </span>}
              </div>
              
              <button className="p-2 rounded-full text-neutral hover:bg-cream hover:text-primary transition-colors relative">
                <Bell className="h-6 w-6" />
                {(unreadNotificationsCount ?? 0) > 0 && (
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                )}
              </button>
              
              {isLoading ? <Skeleton className="h-8 w-8 rounded-full" /> : <div className="h-8 w-8 rounded-full bg-neutral/10 flex items-center justify-center text-neutral font-bold">
                {userInitials}
              </div>}
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-cream">
          <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Today's Earnings Card */}
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-neutral-light text-sm">Today's Earnings</p>
                    {isLoading || !dashboardData ? <Skeleton className="h-8 w-32 mt-1 mb-1" /> : <p className="text-2xl font-bold text-neutral">${dashboardData.todaysEarnings.toFixed(2)}</p>}
                    {/* <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% from yesterday 
                    </p> */}
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>

              {/* Deliveries Today Card */}
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-neutral-light text-sm">Deliveries Today</p>
                    {isLoading || !dashboardData ? <Skeleton className="h-8 w-20 mt-1 mb-1" /> : <p className="text-2xl font-bold text-neutral">{dashboardData.deliveriesToday.completed}/{dashboardData.deliveriesToday.total}</p>}
                    {isLoading || !dashboardData ? <Skeleton className="h-4 w-28 mt-1" /> : <p className="text-xs text-amber-600">
                      {dashboardData.deliveriesToday.total - dashboardData.deliveriesToday.completed} deliveries remaining
                    </p>}
                  </div>
                  <div className="h-12 w-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                    <MapPin className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>

              {/* Safety Score Card (Placeholder) */}
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-neutral-light text-sm">Safety Score</p>
                    {isLoading || !dashboardData ? <Skeleton className="h-8 w-16 mt-1 mb-1" /> : <p className="text-2xl font-bold text-neutral">{dashboardData.safetyScore}%</p>}
                    <p className="text-xs text-green-600">Excellent</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <Shield className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>

              {/* Online Hours Card (Placeholder) */}
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-neutral-light text-sm">Online Hours</p>
                     {isLoading || !dashboardData ? <Skeleton className="h-8 w-20 mt-1 mb-1" /> : <p className="text-2xl font-bold text-neutral">{dashboardData.onlineHours} hrs</p>}
                    <p className="text-xs text-neutral-light">Today</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Clock className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Delivery Progress */}
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Today's Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading || !dashboardData ? <Skeleton className="h-20 w-full" /> : (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-neutral-light">Completed deliveries</span>
                        <span className="font-medium">{dashboardData.deliveriesToday.completed}/{dashboardData.deliveriesToday.total}</span>
                      </div>
                      <Progress value={dashboardData.deliveriesToday.total > 0 ? (dashboardData.deliveriesToday.completed / dashboardData.deliveriesToday.total) * 100 : 0} className="h-2" />
                    </div>

                    {dashboardData.nextDelivery ? (
                      <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <h3 className="font-medium mb-2">Next Delivery</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-neutral-light mb-1">Pickup</p>
                            <p className="text-sm font-medium">{dashboardData.nextDelivery.pickup_address}</p>
                            <p className="text-xs">{dashboardData.nextDelivery.pickup_contact_name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-neutral-light mb-1">Delivery</p>
                            <p className="text-sm font-medium">{dashboardData.nextDelivery.delivery_address}</p>
                            <p className="text-xs">{dashboardData.nextDelivery.delivery_contact_name}</p>
                          </div>
                          <div className="flex items-center justify-end">
                            <Button className="text-xs h-9" onClick={() => alert(`Navigate to ${dashboardData.nextDelivery?.pickup_address}`)}>
                              Start Navigation
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white p-4 rounded-lg border shadow-sm text-center text-neutral-light">
                        No upcoming deliveries assigned.
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="recent">Recent Activity</TabsTrigger>
                <TabsTrigger value="available">Available Jobs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recent" className="space-y-4">
                {isLoading || !dashboardData ? <Skeleton className="h-40 w-full rounded-lg" /> : dashboardData.recentActivity.length > 0 ? (
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {dashboardData.recentActivity.map(delivery => (
                          <div key={delivery.id} className="flex items-start justify-between border-b pb-4 last:border-b-0 last:pb-0">
                            <div>
                              <p className="font-medium">Delivery #{delivery.id.substring(0, 6)}...</p>
                              <p className="text-sm text-neutral-light">
                                {delivery.status === 'delivered' ? 'Completed at ' : 'Cancelled at '} 
                                {delivery.updated_at ? format(parseISO(delivery.updated_at), 'p, MMM dd') : 'N/A'}
                              </p>
                              <p className="text-sm text-neutral-light">{delivery.delivery_address}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${delivery.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                              {delivery.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card><CardContent className="p-4 text-center text-neutral-light">No recent activity.</CardContent></Card>
                )}
                <div className="text-center">
                  <Link to="/my-deliveries" className="text-primary text-sm hover:underline">
                    View all deliveries
                  </Link>
                </div>
              </TabsContent>
              
              <TabsContent value="available" className="space-y-4">
                {isLoading || !dashboardData ? <Skeleton className="h-40 w-full rounded-lg" /> : dashboardData.availableJobs.length > 0 ? (
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {dashboardData.availableJobs.map(job => (
                          <div key={job.id} className="flex items-start justify-between border-b pb-4 last:border-b-0 last:pb-0">
                            <div>
                              <p className="font-medium">Delivery - {job.package_details || 'Package'}</p>
                              <p className="text-sm text-neutral-light">Pick up: {job.pickup_address}</p>
                              <p className="text-sm text-neutral-light">Deliver to: {job.delivery_address}</p>
                              <p className="text-sm font-medium text-primary mt-1">${(job.payment_amount || 0).toFixed(2)}</p>
                            </div>
                            <Button 
                              variant="outline" 
                              className="h-8 text-xs"
                              onClick={() => acceptJob(job.id)}
                              disabled={isAcceptingJob}
                            >
                              <Zap className="h-4 w-4 mr-1" />
                              {isAcceptingJob ? 'Accepting...' : 'Accept'}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card><CardContent className="p-4 text-center text-neutral-light">No available jobs at the moment.</CardContent></Card>
                )}
                <div className="text-center">
                  <Link to="/available-jobs" className="text-primary text-sm hover:underline">
                    View all available jobs
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DriverDashboard;
