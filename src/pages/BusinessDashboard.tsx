import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Search, Plus, Truck, Clock, Package, FileText, CreditCard, Settings } from "lucide-react";
import Logo from "../components/Logo";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const BusinessDashboard = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      {/* Use the DashboardSidebar component */}
      <DashboardSidebar type="business" />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-neutral">Business Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-light" />
                </div>
                <Input
                  type="text"
                  placeholder="Search deliveries..."
                  className="pl-10 py-2 border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              
              <button className="p-2 rounded-full text-neutral hover:bg-cream hover:text-primary transition-colors relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="h-8 w-8 rounded-full bg-neutral/10 flex items-center justify-center text-neutral font-bold">
                KF
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-cream">
          <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Link to="/new-delivery">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" /> New Delivery
                </Button>
              </Link>
              <Link to="/file-claim">
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" /> File a Claim
                </Button>
              </Link>
            </div>
            
            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-neutral-light text-sm">Active Deliveries</p>
                    <p className="text-2xl font-bold text-neutral">12</p>
                    <p className="text-xs text-emerald-600">3 arriving today</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Package className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-neutral-light text-sm">Completed This Month</p>
                    <p className="text-2xl font-bold text-neutral">47</p>
                    <p className="text-xs text-neutral-light">Last month: 42</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <Truck className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-neutral-light text-sm">Pending Invoices</p>
                    <p className="text-2xl font-bold text-neutral">$1,248</p>
                    <p className="text-xs text-amber-600">Due in 7 days</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <FileText className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-neutral-light text-sm">Total Spent</p>
                    <p className="text-2xl font-bold text-neutral">$4,562</p>
                    <p className="text-xs text-neutral-light">This month</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <CreditCard className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Deliveries */}
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Recent Deliveries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-light uppercase tracking-wider">Tracking #</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-light uppercase tracking-wider">From / To</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-light uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-light uppercase tracking-wider">ETA</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-light uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">RS78945612</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <p className="font-medium">San Francisco, CA</p>
                            <p className="text-neutral-light">Los Angeles, CA</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">In Transit</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-neutral-light" />
                              <span>Today, 6:30 PM</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link to="/track-shipment" className="text-primary hover:text-primary-dark">Track</Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">RS78945610</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <p className="font-medium">Portland, OR</p>
                            <p className="text-neutral-light">San Francisco, CA</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Picked Up</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-neutral-light" />
                              <span>Tomorrow, 10:00 AM</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link to="/track-shipment" className="text-primary hover:text-primary-dark">Track</Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">RS78945603</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <p className="font-medium">San Francisco, CA</p>
                            <p className="text-neutral-light">Seattle, WA</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">Processing</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-neutral-light" />
                              <span>Dec 24, 12:00 PM</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link to="/track-shipment" className="text-primary hover:text-primary-dark">Track</Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center">
                    <Link to="/business-deliveries" className="text-primary text-sm hover:underline">View all deliveries</Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Quick Actions */}
            <Tabs defaultValue="frequent-routes" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="frequent-routes">Frequent Routes</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
              </TabsList>
              
              <TabsContent value="frequent-routes" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors">
                        <h3 className="font-medium">SF Warehouse to LA Distribution</h3>
                        <p className="text-sm text-neutral-light mb-2">Used 12 times</p>
                        <div className="flex justify-between text-sm">
                          <span>San Francisco, CA</span>
                          <span>→</span>
                          <span>Los Angeles, CA</span>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors">
                        <h3 className="font-medium">SF Office to Seattle HQ</h3>
                        <p className="text-sm text-neutral-light mb-2">Used 8 times</p>
                        <div className="flex justify-between text-sm">
                          <span>San Francisco, CA</span>
                          <span>→</span>
                          <span>Seattle, WA</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <Link to="/frequent-routes" className="text-primary text-sm hover:underline">
                        Manage frequent routes
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="invoices" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Invoice #INV-2023-0042</p>
                          <p className="text-sm text-neutral-light">Due: Dec 30, 2023</p>
                          <p className="text-sm font-medium text-primary">$523.50</p>
                        </div>
                        <Button variant="outline" size="sm">Pay Now</Button>
                      </div>
                      
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Invoice #INV-2023-0039</p>
                          <p className="text-sm text-neutral-light">Due: Dec 15, 2023</p>
                          <p className="text-sm font-medium text-primary">$418.75</p>
                        </div>
                        <Button variant="outline" size="sm">Pay Now</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Invoice #INV-2023-0036</p>
                          <p className="text-sm text-neutral-light">Due: Dec 10, 2023</p>
                          <p className="text-sm font-medium text-primary">$305.25</p>
                        </div>
                        <Button variant="outline" size="sm">Pay Now</Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <Link to="/invoices" className="text-primary text-sm hover:underline">
                        View all invoices
                      </Link>
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

export default BusinessDashboard;
