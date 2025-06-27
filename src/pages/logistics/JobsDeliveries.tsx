import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Package, Search, Filter, Plus, MapPin, ArrowRight, Clock, Bell, Bot, RefreshCw } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { SmartAssignmentPanel } from "@/components/logistics/SmartAssignmentPanel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddJobForm } from "@/components/logistics/AddJobForm";
import { useJobsData } from "@/hooks/useJobsData";

interface LogisticsJob {
  id: string;
  job_id: string;
  customer_name: string;
  pickup_address: string;
  delivery_address: string;
  pickup_date: string;
  pickup_time: string;
  delivery_date?: string;
  delivery_time?: string;
  package_type: string;
  weight_kg?: number;
  vehicle_type: string;
  status: string;
  payment_amount?: number;
  assigned_driver_id?: string;
  assigned_vehicle_id?: string;
  created_at: string;
}

const JobsDeliveries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddJobDialogOpen, setIsAddJobDialogOpen] = useState(false);
  const [showSmartAssignment, setShowSmartAssignment] = useState(false);
  const { jobs, loading, refreshJobs } = useJobsData();

  const handleAddJobSuccess = () => {
    refreshJobs(); // Refresh the jobs list
  };

  const handleSmartAssignmentComplete = () => {
    refreshJobs(); // Refresh jobs after AI assignment
    setShowSmartAssignment(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'loading':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const filteredJobs = jobs.filter(job => 
    job.job_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.pickup_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.delivery_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <DashboardSidebar type="logistics" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-neutral">Jobs & Deliveries</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="inline-block bg-secondary text-white text-xs px-2 py-1 rounded-md">
                  Company: RSA Logistics
                </span>
              </div>
              
              <button className="p-2 rounded-full text-neutral hover:bg-cream hover:text-primary transition-colors relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="h-8 w-8 rounded-full bg-neutral/10 flex items-center justify-center text-neutral font-bold">
                JD
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-cream">
          <div className="p-6">
            <PageHeader 
              title="Jobs & Deliveries" 
              description="Manage your deliveries and track their progress with AI-powered optimization"
            />
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full md:w-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-light" />
                </div>
                <Input
                  type="text"
                  placeholder="Search by ID, customer, route..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshJobs}
                  disabled={loading}
                  className="w-full md:w-auto"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto"
                  onClick={() => setShowSmartAssignment(!showSmartAssignment)}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  AI Assistant
                </Button>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Dialog open={isAddJobDialogOpen} onOpenChange={setIsAddJobDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary-dark text-white w-full md:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      New Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
                    <DialogHeader>
                      <DialogTitle>Create New Job</DialogTitle>
                      <DialogDescription>
                        Fill in the details below to create a new delivery job.
                      </DialogDescription>
                    </DialogHeader>
                    <AddJobForm 
                      onSubmitSuccess={handleAddJobSuccess} 
                      setOpen={setIsAddJobDialogOpen} 
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Smart Assignment Panel */}
            {showSmartAssignment && (
              <div className="mb-6">
                <SmartAssignmentPanel onAssignmentComplete={handleSmartAssignmentComplete} />
              </div>
            )}
            
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Jobs</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <Card>
                  <CardContent className="p-0">
                    {loading ? (
                      <div className="p-6 text-center">Loading jobs...</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-neutral/5 text-neutral text-sm uppercase">
                            <tr>
                              <th className="px-6 py-3">Job ID</th>
                              <th className="px-6 py-3">Customer</th>
                              <th className="px-6 py-3">Route</th>
                              <th className="px-6 py-3">Package Info</th>
                              <th className="px-6 py-3">Status</th>
                              <th className="px-6 py-3">Schedule</th>
                              <th className="px-6 py-3">Payment</th>
                              <th className="px-6 py-3">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {filteredJobs.map((job) => (
                              <tr key={job.id} className="bg-white hover:bg-neutral/5">
                                <td className="px-6 py-4">{job.job_id}</td>
                                <td className="px-6 py-4">{job.customer_name}</td>
                                <td className="px-6 py-4">
                                  <div className="text-sm">
                                    <div className="flex items-center">
                                      <MapPin className="h-3 w-3 mr-1 text-green-500" />
                                      <span className="truncate max-w-[120px]">{job.pickup_address}</span>
                                    </div>
                                    <div className="flex items-center mt-1">
                                      <ArrowRight className="h-3 w-3 mr-1 text-neutral-light" />
                                      <span className="truncate max-w-[120px]">{job.delivery_address}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm">
                                    <div>{job.package_type}</div>
                                    {job.weight_kg && (
                                      <div className="text-xs text-neutral-light">{job.weight_kg}kg</div>
                                    )}
                                    <div className="text-xs text-neutral-light">{job.vehicle_type}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(job.status)}`}>
                                    {job.status.replace('_', ' ')}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-xs">
                                    <div className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      <span>Pickup: {formatDate(job.pickup_date)} {formatTime(job.pickup_time)}</span>
                                    </div>
                                    {job.delivery_date && job.delivery_time && (
                                      <div className="flex items-center mt-1">
                                        <Clock className="h-3 w-3 mr-1" />
                                        <span>Delivery: {formatDate(job.delivery_date)} {formatTime(job.delivery_time)}</span>
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  {job.payment_amount ? `KES ${job.payment_amount.toLocaleString()}` : 'TBD'}
                                </td>
                                <td className="px-6 py-4">
                                  <Button variant="outline" size="sm">Details</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {filteredJobs.length === 0 && !loading && (
                          <div className="p-6 text-center text-neutral-light">
                            No jobs found. Create your first job to get started.
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="active">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Package className="mx-auto h-12 w-12 text-neutral-light mb-4" />
                      <h3 className="text-lg font-medium text-neutral mb-2">Active Jobs View</h3>
                      <p className="text-neutral-light">This tab would show only active jobs.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="pending">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Package className="mx-auto h-12 w-12 text-neutral-light mb-4" />
                      <h3 className="text-lg font-medium text-neutral mb-2">Pending Jobs View</h3>
                      <p className="text-neutral-light">This tab would show only pending jobs.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="completed">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Package className="mx-auto h-12 w-12 text-neutral-light mb-4" />
                      <h3 className="text-lg font-medium text-neutral mb-2">Completed Jobs View</h3>
                      <p className="text-neutral-light">This tab would show only completed jobs.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobsDeliveries;
