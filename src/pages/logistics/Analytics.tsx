import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Calendar, 
  Download, 
  ArrowUp,
  ArrowDown,
  Share2,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/dashboard/PageHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const Analytics = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState("30days");

  // Sample data for charts
  const performanceData = [
    { day: 'Mon', onTime: 42, delayed: 8 },
    { day: 'Tue', onTime: 38, delayed: 5 },
    { day: 'Wed', onTime: 45, delayed: 10 },
    { day: 'Thu', onTime: 50, delayed: 7 },
    { day: 'Fri', onTime: 48, delayed: 12 },
    { day: 'Sat', onTime: 35, delayed: 3 },
    { day: 'Sun', onTime: 30, delayed: 2 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 2.2 },
    { month: 'Feb', revenue: 2.5 },
    { month: 'Mar', revenue: 2.1 },
    { month: 'Apr', revenue: 2.7 },
    { month: 'May', revenue: 2.9 },
    { month: 'Jun', revenue: 3.1 },
    { month: 'Jul', revenue: 3.2 }
  ];

  const deliveryTypesData = [
    { name: 'Express', value: 35 },
    { name: 'Standard', value: 45 },
    { name: 'Economy', value: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Analytics data is being exported to CSV",
    });
  };

  const handleShareReport = () => {
    toast({
      title: "Share Report",
      description: "Report sharing options displayed",
    });
  };

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    toast({
      title: "Time Range Updated",
      description: `Showing data for ${value === "7days" ? "last 7 days" : value === "30days" ? "last 30 days" : "last 90 days"}`,
    });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <DashboardSidebar type="logistics" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-neutral">Analytics</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="inline-block bg-secondary text-white text-xs px-2 py-1 rounded-md">
                  Company: RSA Logistics
                </span>
              </div>
              
              <div className="h-8 w-8 rounded-full bg-neutral/10 flex items-center justify-center text-neutral font-bold">
                JD
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-cream">
          <div className="p-6">
            <PageHeader 
              title="Analytics Dashboard" 
              description="Track your company's logistics performance metrics"
            />
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <Select defaultValue={timeRange} onValueChange={handleTimeRangeChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleExportData}
                >
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleShareReport}
                >
                  <Share2 className="h-4 w-4" />
                  Share Report
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-light">Total Deliveries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,248</div>
                  <div className="text-sm text-green-500 flex items-center mt-1">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    12% from last month
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-light">On-Time Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <div className="text-sm text-green-500 flex items-center mt-1">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    2.1% from last month
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-light">Fleet Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <div className="text-sm text-red-500 flex items-center mt-1">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    3% from last month
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-light">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KES 3.2M</div>
                  <div className="text-sm text-green-500 flex items-center mt-1">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    8% from last month
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Delivery Performance</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Filter Applied",
                          description: "Showing data for the last 30 days",
                        });
                      }}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={performanceData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="onTime" name="On-Time" fill="#4f46e5" />
                        <Bar dataKey="delayed" name="Delayed" fill="#f97316" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Revenue Trends</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleExportData}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={revenueData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`KES ${value}M`, 'Revenue']} />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" name="Revenue (in millions)" stroke="#4f46e5" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={deliveryTypesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {deliveryTypesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Popular Routes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Nairobi → Mombasa</div>
                        <div className="text-xs text-neutral-light">245 deliveries</div>
                      </div>
                      <div className="text-sm font-medium">19.6%</div>
                    </div>
                    <div className="h-2 bg-neutral/10 rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{width: '19.6%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Nairobi → Nakuru</div>
                        <div className="text-xs text-neutral-light">184 deliveries</div>
                      </div>
                      <div className="text-sm font-medium">14.7%</div>
                    </div>
                    <div className="h-2 bg-neutral/10 rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{width: '14.7%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Nakuru → Kisumu</div>
                        <div className="text-xs text-neutral-light">156 deliveries</div>
                      </div>
                      <div className="text-sm font-medium">12.5%</div>
                    </div>
                    <div className="h-2 bg-neutral/10 rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{width: '12.5%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Driver Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-neutral/10 flex items-center justify-center text-neutral mr-3">
                          <span className="text-xs font-medium">SM</span>
                        </div>
                        <div>
                          <div className="font-medium">Sarah Langat</div>
                          <div className="text-xs text-neutral-light">95% on-time rate</div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="text-green-500 p-1 h-auto"
                        onClick={() => {
                          toast({
                            title: "Driver Profile",
                            description: "Viewing Sarah Langat's detailed performance",
                          });
                        }}
                      >
                        ★ 4.9
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-neutral/10 flex items-center justify-center text-neutral mr-3">
                          <span className="text-xs font-medium">JM</span>
                        </div>
                        <div>
                          <div className="font-medium">John Mwangi</div>
                          <div className="text-xs text-neutral-light">92% on-time rate</div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="text-green-500 p-1 h-auto"
                        onClick={() => {
                          toast({
                            title: "Driver Profile",
                            description: "Viewing John Mwangi's detailed performance",
                          });
                        }}
                      >
                        ★ 4.8
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-neutral/10 flex items-center justify-center text-neutral mr-3">
                          <span className="text-xs font-medium">DO</span>
                        </div>
                        <div>
                          <div className="font-medium">David Omondi</div>
                          <div className="text-xs text-neutral-light">87% on-time rate</div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="text-green-500 p-1 h-auto"
                        onClick={() => {
                          toast({
                            title: "Driver Profile",
                            description: "Viewing David Omondi's detailed performance",
                          });
                        }}
                      >
                        ★ 4.7
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
