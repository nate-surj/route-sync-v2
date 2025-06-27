
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, Filter, Zap, MapPin, Package, TruckIcon, 
  Clock, DollarSign, ArrowRight, Bell, Loader2 
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  job_id: string;
  route: string;
  cargo: string;
  weight: string;
  detour: string;
  payment: string;
  payment_method: string;
  pickup: string;
  pickup_time: string;
  delivery: string;
  delivery_time: string;
  distance: string;
  urgency: string;
}

const AvailableJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, profile } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    if (user) {
      fetchJobs();
    }
  }, [user]);
  
  const fetchJobs = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('available_jobs')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setJobsData(data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "Error fetching available jobs",
        description: "There was a problem retrieving job data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const filteredJobs = jobsData.filter(job => 
    job.job_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.delivery.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const EmptyState = () => (
    <Card>
      <CardContent className="p-6">
        <div className="text-center py-8">
          <Package className="mx-auto h-12 w-12 text-neutral-light mb-4" />
          <h3 className="text-lg font-medium text-neutral mb-2">No available jobs</h3>
          <p className="text-neutral-light">
            {profile?.account_type === 'demo' ? 
              "Demo data loading issue. Please try again later." :
              "There are no available jobs at the moment. Check back soon for new delivery opportunities."}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <DashboardSidebar type="driver" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-neutral">Available Jobs</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="inline-block bg-secondary text-white text-xs px-2 py-1 rounded-md">
                  Vehicle: Van
                </span>
              </div>
              
              <button className="p-2 rounded-full text-neutral hover:bg-cream hover:text-primary transition-colors relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="h-8 w-8 rounded-full bg-neutral/10 flex items-center justify-center text-neutral font-bold">
                JM
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-cream">
          <div className="p-6">
            <PageHeader 
              title="Available Jobs" 
              description="Find and accept new delivery jobs that match your route"
            />
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full md:w-auto flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-light" />
                </div>
                <Input
                  type="text"
                  placeholder="Search jobs by route, cargo type, location..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="w-full md:w-auto">
                  <MapPin className="h-4 w-4 mr-2" />
                  Near Me
                </Button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-neutral">Loading available jobs...</span>
              </div>
            ) : jobsData.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                          <div className="flex items-start mb-4">
                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-3">
                              <Zap className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <div className="text-lg font-medium text-neutral">{job.route}</div>
                                {job.urgency !== "Normal" && (
                                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                                    job.urgency === 'Urgent' ? 'bg-red-100 text-red-800' : 
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {job.urgency}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-neutral-light mb-2">{job.cargo} • {job.weight}</div>
                              <div className={`text-xs flex items-center ${
                                parseInt(job.detour) === 0 ? 'text-green-600' : 
                                parseInt(job.detour) < 10 ? 'text-blue-600' : 
                                'text-yellow-600'
                              }`}>
                                <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                                  parseInt(job.detour) === 0 ? 'bg-green-500' : 
                                  parseInt(job.detour) < 10 ? 'bg-blue-500' : 
                                  'bg-yellow-500'
                                }`}></span>
                                <span>{job.detour} detour from your route</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            <div className="flex items-start">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <MapPin className="h-4 w-4 text-green-500" />
                              </div>
                              <div className="ml-2">
                                <div className="text-xs text-neutral-light">Pickup</div>
                                <div className="text-sm font-medium">{job.pickup}</div>
                                <div className="text-xs text-neutral-light flex items-center mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {job.pickup_time}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                <MapPin className="h-4 w-4 text-red-500" />
                              </div>
                              <div className="ml-2">
                                <div className="text-xs text-neutral-light">Delivery</div>
                                <div className="text-sm font-medium">{job.delivery}</div>
                                <div className="text-xs text-neutral-light flex items-center mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {job.delivery_time}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 text-xs">
                            <div className="px-2 py-1 bg-neutral/5 rounded-full flex items-center">
                              <TruckIcon className="h-3 w-3 mr-1" />
                              {job.distance}
                            </div>
                            <div className="px-2 py-1 bg-neutral/5 rounded-full flex items-center">
                              <Package className="h-3 w-3 mr-1" />
                              {job.weight}
                            </div>
                            <div className="px-2 py-1 bg-neutral/5 rounded-full flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {job.pickup_time.split(',')[0]}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col justify-between border-t pt-4 lg:border-t-0 lg:border-l lg:pl-4 lg:pt-0">
                          <div>
                            <div className="text-xl font-bold text-secondary mb-1">{job.payment}</div>
                            <div className="text-xs text-neutral-light mb-2">{job.payment_method} Payment</div>
                            <div className="text-xs text-neutral-light">Job #{job.job_id}</div>
                          </div>
                          
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">Details</Button>
                            <Button className="bg-primary hover:bg-primary-dark text-white flex-1">
                              Accept Job
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredJobs.length === 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center py-8">
                        <Package className="mx-auto h-12 w-12 text-neutral-light mb-4" />
                        <h3 className="text-lg font-medium text-neutral mb-2">No jobs found</h3>
                        <p className="text-neutral-light">Try adjusting your search or filter criteria.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AvailableJobs;
