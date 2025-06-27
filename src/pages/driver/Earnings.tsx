
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Bell, 
  Download, 
  BarChart3, 
  ArrowUp, 
  ArrowDown 
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const Earnings = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <DashboardSidebar type="driver" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-neutral">Earnings</h1>
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
              title="Earnings" 
              description="Track your earnings and payment history"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-light">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KES 24,560</div>
                  <div className="text-sm text-green-500 flex items-center mt-1">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    12% from last month
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-light">Last Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KES 21,860</div>
                  <div className="text-sm text-green-500 flex items-center mt-1">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    8% from previous
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-light">Deliveries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <div className="text-sm text-neutral-light mt-1">
                    This month
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-light">Next Payout</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KES 12,800</div>
                  <div className="text-sm text-blue-500 mt-1">
                    In 3 days
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="earnings">
              <TabsList className="mb-4">
                <TabsTrigger value="earnings">Earnings Overview</TabsTrigger>
                <TabsTrigger value="payouts">Payout History</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="earnings">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Monthly Earnings</CardTitle>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center border rounded-md bg-white">
                      <BarChart3 className="h-16 w-16 text-neutral-light" />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium">Earnings Chart</h3>
                        <p className="text-neutral-light">Visualization of monthly earnings would appear here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="payouts">
                <Card>
                  <CardHeader>
                    <CardTitle>Payout History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b text-sm text-neutral-light">
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Description</th>
                            <th className="text-left py-3 px-4">Amount</th>
                            <th className="text-left py-3 px-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="py-3 px-4">Oct 15, 2023</td>
                            <td className="py-3 px-4">Payout (Bank Transfer)</td>
                            <td className="py-3 px-4">KES 18,450</td>
                            <td className="py-3 px-4"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span></td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4">Sep 15, 2023</td>
                            <td className="py-3 px-4">Payout (M-Pesa)</td>
                            <td className="py-3 px-4">KES 21,860</td>
                            <td className="py-3 px-4"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span></td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4">Aug 15, 2023</td>
                            <td className="py-3 px-4">Payout (Bank Transfer)</td>
                            <td className="py-3 px-4">KES 19,720</td>
                            <td className="py-3 px-4"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <TrendingUp className="mx-auto h-12 w-12 text-neutral-light mb-4" />
                      <h3 className="text-lg font-medium text-neutral mb-2">Earnings Analytics</h3>
                      <p className="text-neutral-light">Detailed analytics about your earnings patterns would appear here.</p>
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

export default Earnings;
