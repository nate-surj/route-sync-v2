
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Filter, MoreVertical, FileDown, Clock, Check, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/dashboard/PageHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

// Sample delivery data
const deliveries = [
  {
    id: "DEL-1001",
    pickupAddress: "Main Warehouse, Nairobi",
    deliveryAddress: "Downtown Store, Mombasa",
    status: "completed",
    date: "2023-10-15",
    customer: "Coastal Retailers Ltd",
    packageType: "Electronics",
    weight: "95kg"
  },
  {
    id: "DEL-1002",
    pickupAddress: "Central Hub, Nairobi",
    deliveryAddress: "Westlands Mall, Nairobi",
    status: "in_transit",
    date: "2023-10-17",
    customer: "Westlands Shop",
    packageType: "Retail Goods",
    weight: "45kg"
  },
  {
    id: "DEL-1003",
    pickupAddress: "Main Warehouse, Nairobi",
    deliveryAddress: "Tech Store, Kisumu",
    status: "in_transit",
    date: "2023-10-17",
    customer: "Lakeside Electronics",
    packageType: "Electronics",
    weight: "120kg"
  },
  {
    id: "DEL-1004",
    pickupAddress: "Central Hub, Nairobi",
    deliveryAddress: "Nakuru Mall, Nakuru",
    status: "pending",
    date: "2023-10-19",
    customer: "Rift Valley Retailers",
    packageType: "Clothing",
    weight: "75kg"
  },
  {
    id: "DEL-1005",
    pickupAddress: "Main Warehouse, Nairobi",
    deliveryAddress: "Eastern Store, Machakos",
    status: "pending",
    date: "2023-10-20",
    customer: "Eastern Supplies",
    packageType: "Mixed Goods",
    weight: "90kg"
  },
  {
    id: "DEL-1006",
    pickupAddress: "Main Warehouse, Nairobi",
    deliveryAddress: "Nyali Shop, Mombasa",
    status: "failed",
    date: "2023-10-14",
    customer: "Coastal Retailers Ltd",
    packageType: "Electronics",
    weight: "65kg"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200"><Check className="h-3 w-3 mr-1" /> Completed</Badge>;
    case 'in_transit':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200"><Clock className="h-3 w-3 mr-1" /> In Transit</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
    case 'failed':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200"><X className="h-3 w-3 mr-1" /> Failed</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Unknown</Badge>;
  }
};

const BusinessDeliveries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter deliveries based on search term and status
  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          delivery.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          delivery.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <DashboardSidebar type="business" />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <PageHeader 
              title="Deliveries" 
              description="Manage and track all your deliveries"
              actions={
                <Link to="/new-delivery">
                  <Button className="bg-primary hover:bg-primary-dark text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    New Delivery
                  </Button>
                </Link>
              }
            />
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-cream">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>Your Deliveries</CardTitle>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search deliveries..."
                      className="pl-8 w-full sm:w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                        All Deliveries
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                        <Check className="h-4 w-4 mr-2 text-green-600" /> Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("in_transit")}>
                        <Clock className="h-4 w-4 mr-2 text-blue-600" /> In Transit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                        <Clock className="h-4 w-4 mr-2 text-yellow-600" /> Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("failed")}>
                        <X className="h-4 w-4 mr-2 text-red-600" /> Failed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button variant="outline" size="sm">
                    <FileDown className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Deliveries</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="m-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b text-xs text-muted-foreground">
                          <th className="text-left font-medium py-3 px-4">Delivery ID</th>
                          <th className="text-left font-medium py-3 px-4">Pickup</th>
                          <th className="text-left font-medium py-3 px-4">Delivery</th>
                          <th className="text-left font-medium py-3 px-4">Package</th>
                          <th className="text-left font-medium py-3 px-4">Date</th>
                          <th className="text-left font-medium py-3 px-4">Status</th>
                          <th className="text-left font-medium py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filteredDeliveries.length > 0 ? (
                          filteredDeliveries.map((delivery) => (
                            <tr key={delivery.id} className="hover:bg-muted/50">
                              <td className="py-3 px-4">{delivery.id}</td>
                              <td className="py-3 px-4">{delivery.pickupAddress}</td>
                              <td className="py-3 px-4">{delivery.deliveryAddress}</td>
                              <td className="py-3 px-4">
                                {delivery.packageType} <span className="text-xs text-neutral-light">({delivery.weight})</span>
                              </td>
                              <td className="py-3 px-4">{delivery.date}</td>
                              <td className="py-3 px-4">{getStatusBadge(delivery.status)}</td>
                              <td className="py-3 px-4">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem>Track Delivery</DropdownMenuItem>
                                    <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                      Cancel Delivery
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="py-6 text-center text-muted-foreground">
                              <AlertTriangle className="h-6 w-6 mx-auto mb-2" />
                              No deliveries found matching your filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="active" className="m-0">
                  {/* Similar table structure for active deliveries */}
                  <div className="text-center py-6 text-muted-foreground">
                    <Clock className="h-6 w-6 mx-auto mb-2" />
                    Show active deliveries (in transit)
                  </div>
                </TabsContent>
                
                <TabsContent value="pending" className="m-0">
                  {/* Similar table structure for pending deliveries */}
                  <div className="text-center py-6 text-muted-foreground">
                    <Clock className="h-6 w-6 mx-auto mb-2" />
                    Show pending deliveries
                  </div>
                </TabsContent>
                
                <TabsContent value="completed" className="m-0">
                  {/* Similar table structure for completed deliveries */}
                  <div className="text-center py-6 text-muted-foreground">
                    <Check className="h-6 w-6 mx-auto mb-2" />
                    Show completed deliveries
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default BusinessDeliveries;
