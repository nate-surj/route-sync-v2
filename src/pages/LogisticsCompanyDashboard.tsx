
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Package, 
  Truck, 
  Users, 
  TrendingUp, 
  Clock, 
  MapPin, 
  DollarSign,
  Bot,
  Zap,
  ArrowRight,
  Bell,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const LogisticsCompanyDashboard = () => {
  const [aiInsights, setAiInsights] = useState({
    potentialSavings: 12500,
    optimizationOpportunities: 8,
    routeEfficiency: 87,
    recommendedActions: [
      'Consolidate 3 deliveries in Westlands area',
      'Reassign Job #RSA-J089 to Driver JM for 15% cost reduction',
      'Optimize route for peak hour traffic avoidance'
    ]
  });

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <DashboardSidebar type="logistics" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-neutral">Logistics Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="inline-block bg-secondary text-white text-xs px-2 py-1 rounded-md">
                  RSA Logistics
                </span>
              </div>
              
              <button className="p-2 rounded-full text-neutral hover:bg-cream hover:text-primary transition-colors relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="h-8 w-8 rounded-full bg-neutral/10 flex items-center justify-center text-neutral font-bold">
                AD
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-cream">
          <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-neutral-light text-sm">Active Jobs</p>
                    <p className="text-2xl font-bold text-neutral">24</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +3 from yesterday
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Package className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-neutral-light text-sm">Fleet Status</p>
                    <p className="text-2xl font-bold text-neutral">18/25</p>
                    <p className="text-xs text-blue-600">Active vehicles</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                    <Truck className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-neutral-light text-sm">Drivers Online</p>
                    <p className="text-2xl font-bold text-neutral">16</p>
                    <p className="text-xs text-green-600">Available now</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-neutral-light text-sm">Revenue Today</p>
                    <p className="text-2xl font-bold text-neutral">KES 85K</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% from yesterday
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Insights Panel */}
            <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  AI Optimization Insights
                  <Badge className="bg-blue-100 text-blue-800">Live</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Potential Savings</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      KES {aiInsights.potentialSavings.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">Available with AI optimization</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium">Route Efficiency</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">{aiInsights.routeEfficiency}%</div>
                    <Progress value={aiInsights.routeEfficiency} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Optimization Opportunities</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{aiInsights.optimizationOpportunities}</div>
                    <div className="text-xs text-gray-600">Jobs ready for optimization</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-white rounded-lg border">
                  <div className="text-sm font-medium mb-2">Recommended Actions:</div>
                  <div className="space-y-1">
                    {aiInsights.recommendedActions.map((action, index) => (
                      <div key={index} className="text-xs text-gray-700 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                        {action}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Link to="/jobs-deliveries">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Bot className="h-4 w-4 mr-2" />
                      Open AI Assistant
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    View Analytics
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Fleet Status */}
            <Card>
              <CardHeader>
                <CardTitle>Fleet Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p className="text-neutral-light text-sm">Total Fleet</p>
                    <p className="text-2xl font-bold text-neutral">27</p>
                    <p className="text-xs text-neutral-light">Vehicles active across Africa</p>
                  </div>
                  <div>
                    <p className="text-neutral-light text-sm">Active Jobs</p>
                    <p className="text-2xl font-bold text-neutral">18</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span>12% from yesterday</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-light text-sm">Empty Trucks</p>
                    <p className="text-2xl font-bold text-neutral">5</p>
                    <p className="flex items-center text-sm text-red-600 mt-1">
                      <ArrowDown className="h-4 w-4 mr-1" />
                      <span>3 less than last week</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p className="text-neutral-light text-sm">Latest Delivery</p>
                    <p className="text-2xl font-bold text-neutral">Job #RSA-J078</p>
                    <p className="text-xs text-neutral-light">Delivered on 09:47</p>
                  </div>
                  <div>
                    <p className="text-neutral-light text-sm">Latest Job</p>
                    <p className="text-2xl font-bold text-neutral">Job #RSA-J089</p>
                    <p className="text-xs text-neutral-light">Scheduled for 15:00</p>
                  </div>
                  <div>
                    <p className="text-neutral-light text-sm">Latest Alert</p>
                    <p className="text-2xl font-bold text-neutral">Route Deviation</p>
                    <p className="text-xs text-neutral-light">Vehicle RSA-T001 has deviated from planned route by 5km</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p className="text-neutral-light text-sm">Assign Job</p>
                    <p className="text-2xl font-bold text-neutral">Job #RSA-J090</p>
                    <p className="text-xs text-neutral-light">Assign to Driver JM</p>
                  </div>
                  <div>
                    <p className="text-neutral-light text-sm">Schedule Job</p>
                    <p className="text-2xl font-bold text-neutral">Job #RSA-J091</p>
                    <p className="text-xs text-neutral-light">Schedule for 10:00</p>
                  </div>
                  <div>
                    <p className="text-neutral-light text-sm">View Fleet</p>
                    <p className="text-2xl font-bold text-neutral">View All Vehicles</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LogisticsCompanyDashboard;
