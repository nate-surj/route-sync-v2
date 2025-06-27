
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Leaf, 
  Wrench, 
  Fuel,
  Brain,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { RouteOptimizationService } from "@/services/routeOptimizationService";
import { LoadMatchingService } from "@/services/loadMatchingService";
import { PredictiveAnalyticsService } from "@/services/predictiveAnalyticsService";
import { DynamicPricingService } from "@/services/dynamicPricingService";
import { FuelManagementService } from "@/services/fuelManagementService";
import { MaintenanceService } from "@/services/maintenanceService";
import { CarbonFootprintService } from "@/services/carbonFootprintService";

const AdvancedAnalytics = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [analyticsData, setAnalyticsData] = useState({
    routeOptimization: null,
    loadMatching: null,
    predictiveAnalytics: null,
    dynamicPricing: null,
    fuelManagement: null,
    maintenance: null,
    carbonFootprint: null
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadAnalyticsData();
  }, []);
  
  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // Simulate loading various analytics data
      console.log('Loading advanced analytics data...');
      
      // Mock data for demonstration
      setAnalyticsData({
        routeOptimization: {
          totalRoutes: 25,
          optimizedRoutes: 20,
          savingsPercentage: 15.3,
          fuelSavings: 12500,
          timeSavings: 45
        },
        loadMatching: {
          matchingAccuracy: 87.5,
          utilizationRate: 82.3,
          revenueIncrease: 23.1,
          matches: 156
        },
        predictiveAnalytics: {
          demandForecast: 2340,
          confidenceLevel: 89.2,
          capacityUtilization: 76.8,
          revenueProjection: 1250000
        },
        dynamicPricing: {
          avgPriceOptimization: 12.4,
          revenueIncrease: 18.7,
          competitiveAdvantage: 94.2,
          activePricingRules: 8
        },
        fuelManagement: {
          totalConsumption: 4580,
          efficiency: 7.8,
          monthlySavings: 18500,
          carbonReduction: 890
        },
        maintenance: {
          vehiclesMonitored: 45,
          predictiveAlerts: 12,
          costSavings: 125000,
          uptime: 96.7
        },
        carbonFootprint: {
          totalEmissions: 15600,
          reductionTarget: 25,
          currentReduction: 12.3,
          sustainabilityScore: 78.5
        }
      });
    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Route Efficiency</p>
                <p className="text-2xl font-bold text-green-600">
                  {analyticsData.routeOptimization?.savingsPercentage}%
                </p>
              </div>
              <Zap className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Load Matching</p>
                <p className="text-2xl font-bold text-blue-600">
                  {analyticsData.loadMatching?.matchingAccuracy}%
                </p>
              </div>
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fuel Savings</p>
                <p className="text-2xl font-bold text-orange-600">
                  KES {analyticsData.fuelManagement?.monthlySavings?.toLocaleString()}
                </p>
              </div>
              <Fuel className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Carbon Reduction</p>
                <p className="text-2xl font-bold text-green-600">
                  {analyticsData.carbonFootprint?.currentReduction}%
                </p>
              </div>
              <Leaf className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Route Optimization</span>
                  <span>{analyticsData.routeOptimization?.savingsPercentage}%</span>
                </div>
                <Progress value={analyticsData.routeOptimization?.savingsPercentage} className="mt-1" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Load Utilization</span>
                  <span>{analyticsData.loadMatching?.utilizationRate}%</span>
                </div>
                <Progress value={analyticsData.loadMatching?.utilizationRate} className="mt-1" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Fleet Uptime</span>
                  <span>{analyticsData.maintenance?.uptime}%</span>
                </div>
                <Progress value={analyticsData.maintenance?.uptime} className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-sm">Vehicle RSA-T001 needs urgent maintenance</span>
                </div>
                <Badge variant="destructive">Critical</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm">Fuel efficiency below target on Route A-B</span>
                </div>
                <Badge variant="secondary">Warning</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm">New optimization opportunity identified</span>
                </div>
                <Badge>Info</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
  const RouteOptimizationTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Routes Optimized</h3>
              <p className="text-3xl font-bold text-blue-600">
                {analyticsData.routeOptimization?.optimizedRoutes}/{analyticsData.routeOptimization?.totalRoutes}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Fuel Savings</h3>
              <p className="text-3xl font-bold text-green-600">
                KES {analyticsData.routeOptimization?.fuelSavings?.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Time Savings</h3>
              <p className="text-3xl font-bold text-purple-600">
                {analyticsData.routeOptimization?.timeSavings} hours
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Route Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Nairobi → Mombasa → Malindi</h4>
                <Badge className="bg-green-100 text-green-800">15% Savings</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Optimized multi-stop route with consolidated deliveries
              </p>
              <div className="flex justify-between text-sm">
                <span>Distance: 580km</span>
                <span>Est. Time: 8.5 hours</span>
                <span>Fuel: 74L</span>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Nakuru → Eldoret → Kitale</h4>
                <Badge className="bg-blue-100 text-blue-800">12% Savings</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Traffic-aware routing avoiding peak congestion hours
              </p>
              <div className="flex justify-between text-sm">
                <span>Distance: 220km</span>
                <span>Est. Time: 3.2 hours</span>
                <span>Fuel: 28L</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  const FuelManagementTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Fuel className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <h3 className="text-sm font-medium">Monthly Consumption</h3>
              <p className="text-2xl font-bold">{analyticsData.fuelManagement?.totalConsumption}L</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h3 className="text-sm font-medium">Efficiency</h3>
              <p className="text-2xl font-bold">{analyticsData.fuelManagement?.efficiency} km/L</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h3 className="text-sm font-medium">Monthly Savings</h3>
              <p className="text-2xl font-bold">KES {analyticsData.fuelManagement?.monthlySavings?.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Leaf className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h3 className="text-sm font-medium">CO2 Reduced</h3>
              <p className="text-2xl font-bold">{analyticsData.fuelManagement?.carbonReduction} kg</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Fuel Optimization Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
              <div>
                <h4 className="font-medium">Driver Training Program</h4>
                <p className="text-sm text-muted-foreground">
                  Implement eco-driving training to reduce fuel consumption by 8-12%
                </p>
                <p className="text-sm font-medium text-green-600 mt-1">
                  Potential savings: KES 25,000/month
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-blue-50 rounded-lg">
              <Clock className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
              <div>
                <h4 className="font-medium">Route Optimization</h4>
                <p className="text-sm text-muted-foreground">
                  Use AI-powered routing to reduce unnecessary mileage and idling time
                </p>
                <p className="text-sm font-medium text-blue-600 mt-1">
                  Potential savings: KES 18,000/month
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-orange-50 rounded-lg">
              <Wrench className="h-5 w-5 text-orange-500 mt-0.5 mr-3" />
              <div>
                <h4 className="font-medium">Preventive Maintenance</h4>
                <p className="text-sm text-muted-foreground">
                  Regular maintenance can improve fuel efficiency by 5-10%
                </p>
                <p className="text-sm font-medium text-orange-600 mt-1">
                  Potential savings: KES 12,000/month
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  const CarbonFootprintTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Leaf className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h3 className="text-sm font-medium">Total Emissions</h3>
              <p className="text-2xl font-bold">{analyticsData.carbonFootprint?.totalEmissions?.toLocaleString()} kg CO2</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h3 className="text-sm font-medium">Reduction Achieved</h3>
              <p className="text-2xl font-bold">{analyticsData.carbonFootprint?.currentReduction}%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <h3 className="text-sm font-medium">Sustainability Score</h3>
              <p className="text-2xl font-bold">{analyticsData.carbonFootprint?.sustainabilityScore}/100</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Carbon Reduction Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Target: {analyticsData.carbonFootprint?.reductionTarget}% reduction</span>
                <span>Current: {analyticsData.carbonFootprint?.currentReduction}%</span>
              </div>
              <Progress 
                value={(analyticsData.carbonFootprint?.currentReduction / analyticsData.carbonFootprint?.reductionTarget) * 100} 
                className="h-3"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="space-y-3">
                <h4 className="font-medium">Reduction Strategies</h4>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-green-50 rounded">
                    <span className="text-sm">Route Optimization</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex justify-between p-3 bg-blue-50 rounded">
                    <span className="text-sm">Driver Training</span>
                    <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm">Electric Vehicles</span>
                    <Badge variant="outline">Planned</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Environmental Impact</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Trees equivalent saved:</span>
                    <span className="font-medium">127 trees</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fuel saved this month:</span>
                    <span className="font-medium">1,250 liters</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost savings:</span>
                    <span className="font-medium">KES 187,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (isLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-cream">
        <DashboardSidebar type="logistics" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading advanced analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <DashboardSidebar type="logistics" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <PageHeader 
              title="Advanced Analytics" 
              description="AI-powered insights for optimizing logistics operations"
            />
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-cream">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="routes">Route AI</TabsTrigger>
              <TabsTrigger value="fuel">Fuel Mgmt</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="carbon">Sustainability</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <OverviewTab />
            </TabsContent>
            
            <TabsContent value="routes" className="mt-6">
              <RouteOptimizationTab />
            </TabsContent>
            
            <TabsContent value="fuel" className="mt-6">
              <FuelManagementTab />
            </TabsContent>
            
            <TabsContent value="maintenance" className="mt-6">
              <div className="text-center py-12">
                <Wrench className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Predictive Maintenance</h3>
                <p className="text-muted-foreground">
                  Advanced maintenance analytics and scheduling optimization coming soon.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="carbon" className="mt-6">
              <CarbonFootprintTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
