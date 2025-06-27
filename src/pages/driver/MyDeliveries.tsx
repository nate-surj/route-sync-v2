
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Clock, Search, Filter, Package, MapPin, ArrowRight, Check, X, Bell } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const MyDeliveries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const deliveriesData = [
    {
      id: "DEL-1001",
      route: "Nakuru → Kisumu",
      cargo: "Agricultural Supplies",
      weight: "550kg",
      pickup: "Central Warehouse, Nakuru",
      delivery: "FarmTech Ltd, Kisumu",
      status: "In Progress",
      pickupTime: "Today, 14:00",
      deliveryTime: "Today, 18:30",
      payment: "KES 2,000"
    },
    {
      id: "DEL-1002",
      route: "Nairobi → Thika",
      cargo: "Electronics",
      weight: "320kg",
      pickup: "Tech Center, Nairobi",
      delivery: "Thika Outlets, Thika",
      status: "Scheduled",
      pickupTime: "Tomorrow, 09:00",
      deliveryTime: "Tomorrow, 12:30",
      payment: "KES 1,500"
    },
    {
      id: "DEL-1003",
      route: "Nairobi → Mombasa",
      cargo: "Medical Supplies",
      weight: "150kg",
      pickup: "MediHealth, Nairobi",
      delivery: "Mombasa Hospital, Mombasa",
      status: "Completed",
      pickupTime: "Yesterday, 07:00",
      deliveryTime: "Yesterday, 16:00",
      payment: "KES 3,200"
    }
  ];
  
  const filteredDeliveries = deliveriesData.filter(delivery => 
    delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <DashboardSidebar type="driver" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-neutral">My Deliveries</h1>
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
              title="My Deliveries" 
              description="Track and manage your current and upcoming deliveries"
            />
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full md:w-auto flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-light" />
                </div>
                <Input
                  type="text"
                  placeholder="Search deliveries..."
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
              </div>
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Deliveries</TabsTrigger>
                <TabsTrigger value="active">In Progress</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="space-y-4">
                  {filteredDeliveries.map((delivery) => (
                    <Card key={delivery.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row gap-4">
                          <div className="flex-1">
                            <div className="flex items-start mb-4">
                              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-3">
                                <Package className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <div className="text-lg font-medium text-neutral">{delivery.route}</div>
                                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                                    delivery.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                    delivery.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {delivery.status}
                                  </span>
                                </div>
                                <div className="text-sm text-neutral-light mb-2">{delivery.cargo} • {delivery.weight}</div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                              <div className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                  <MapPin className="h-4 w-4 text-green-500" />
                                </div>
                                <div className="ml-2">
                                  <div className="text-xs text-neutral-light">Pickup</div>
                                  <div className="text-sm font-medium">{delivery.pickup}</div>
                                  <div className="text-xs text-neutral-light flex items-center mt-1">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {delivery.pickupTime}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                  <MapPin className="h-4 w-4 text-red-500" />
                                </div>
                                <div className="ml-2">
                                  <div className="text-xs text-neutral-light">Delivery</div>
                                  <div className="text-sm font-medium">{delivery.delivery}</div>
                                  <div className="text-xs text-neutral-light flex items-center mt-1">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {delivery.deliveryTime}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col justify-between border-t pt-4 lg:border-t-0 lg:border-l lg:pl-4 lg:pt-0">
                            <div>
                              <div className="text-xl font-bold text-secondary mb-1">{delivery.payment}</div>
                              <div className="text-xs text-neutral-light mb-2">Payment</div>
                              <div className="text-xs text-neutral-light">Delivery #{delivery.id}</div>
                            </div>
                            
                            <div className="mt-4 flex gap-2">
                              <Button variant="outline" size="sm" className="flex-1">Details</Button>
                              {delivery.status === "In Progress" && (
                                <Button className="bg-primary hover:bg-primary-dark text-white flex-1">
                                  Update Status
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="active">
                {/* Similar content for active deliveries */}
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Clock className="mx-auto h-12 w-12 text-neutral-light mb-4" />
                      <h3 className="text-lg font-medium text-neutral mb-2">In Progress Deliveries</h3>
                      <p className="text-neutral-light">View only deliveries that are currently in progress.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="scheduled">
                {/* Similar content for scheduled deliveries */}
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Clock className="mx-auto h-12 w-12 text-neutral-light mb-4" />
                      <h3 className="text-lg font-medium text-neutral mb-2">Scheduled Deliveries</h3>
                      <p className="text-neutral-light">View only deliveries that are scheduled for the future.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="completed">
                {/* Similar content for completed deliveries */}
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Check className="mx-auto h-12 w-12 text-neutral-light mb-4" />
                      <h3 className="text-lg font-medium text-neutral mb-2">Completed Deliveries</h3>
                      <p className="text-neutral-light">View your delivery history.</p>
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

export default MyDeliveries;
