
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Truck, Calendar, Package, ArrowRight, Clock, MoreHorizontal, Eye, FileText, Loader2, RefreshCw } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import CreateShipmentDialog from "@/components/business/CreateShipmentDialog";
import { useShipmentData } from "@/hooks/useShipmentData";
import { useAuth } from "@/contexts/AuthContext";

const Shipments = () => {
  const { shipments, isLoading, refreshShipments } = useShipmentData();
  const { profile } = useAuth();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case 'in_transit':
        return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>;
      case 'scheduled':
        return <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };
  
  // Calculate totals
  const totalShipments = shipments.length;
  const inTransitShipments = shipments.filter(s => s.status === 'in_transit').length;
  const upcomingShipments = shipments.filter(shipment => shipment.status === 'scheduled');
  const totalWeight = shipments.reduce((acc, curr) => {
    const weightStr = curr.weight;
    const numericWeight = parseFloat(weightStr.replace(/[^0-9.]/g, ''));
    return acc + (isNaN(numericWeight) ? 0 : numericWeight);
  }, 0);
  
  const formatShipmentDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    } catch (error) {
      return dateString;
    }
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <Package className="h-16 w-16 text-neutral-light mb-4" />
      <h3 className="text-lg font-medium text-neutral mb-2">No shipments yet</h3>
      <p className="text-neutral-light text-center mb-6 max-w-md">
        {profile?.account_type === 'demo' ? 
          "Demo data loading issue. Please try again later." :
          "You haven't created any shipments yet. Start by creating your first shipment."}
      </p>
      <CreateShipmentDialog onShipmentCreated={refreshShipments} />
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <DashboardSidebar type="logistics" />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <PageHeader 
                title="Shipments" 
                description="Track and manage all shipments across the logistics network"
              />
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshShipments}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <CreateShipmentDialog onShipmentCreated={refreshShipments} />
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-cream">
          <Tabs defaultValue="list" className="w-full mb-6">
            <TabsList>
              <TabsTrigger value="list">
                <Package className="h-4 w-4 mr-2" />
                Shipment List
              </TabsTrigger>
              <TabsTrigger value="calendar">
                <Calendar className="h-4 w-4 mr-2" />
                Calendar View
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Shipments</CardTitle>
                  <CardDescription>
                    View and manage all your scheduled, in-transit, and delivered shipments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="ml-2 text-neutral">Loading shipments...</span>
                    </div>
                  ) : shipments.length === 0 ? (
                    <EmptyState />
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Route</TableHead>
                          <TableHead>Schedule</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Vehicle</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {shipments.map((shipment) => (
                          <TableRow key={shipment.id}>
                            <TableCell className="font-medium">{shipment.shipment_id}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {shipment.origin} <ArrowRight className="h-3 w-3 mx-2" /> {shipment.destination}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>Dep: {formatShipmentDate(shipment.departure_date)}</span>
                                <span>Arr: {formatShipmentDate(shipment.arrival_date)}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {shipment.items} items <span className="text-xs text-muted-foreground">({shipment.weight})</span>
                            </TableCell>
                            <TableCell>{shipment.vehicle}</TableCell>
                            <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="calendar" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Shipments</CardTitle>
                    <CardDescription>
                      View your upcoming shipments for the next 7 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center items-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : upcomingShipments.length === 0 ? (
                      <div className="text-center py-8">
                        <Calendar className="mx-auto h-12 w-12 text-neutral-light mb-4" />
                        <h3 className="text-lg font-medium text-neutral mb-2">No upcoming shipments</h3>
                        <p className="text-neutral-light">You don't have any scheduled shipments at this time.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {upcomingShipments.map((shipment) => (
                          <div key={shipment.id} className="flex p-4 border rounded-lg">
                            <div className="mr-4 h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <Truck className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{shipment.shipment_id}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {shipment.origin} <ArrowRight className="h-3 w-3 inline mx-1" /> {shipment.destination}
                                  </p>
                                </div>
                                {getStatusBadge(shipment.status)}
                              </div>
                              <div className="mt-2 flex items-center text-sm">
                                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>{formatShipmentDate(shipment.departure_date)}</span>
                                <Package className="h-4 w-4 ml-3 mr-1 text-muted-foreground" />
                                <span>{shipment.items} items</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Calendar</CardTitle>
                    <CardDescription>
                      Shipment schedule for the current month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 bg-neutral/5 rounded-lg flex items-center justify-center">
                      <div className="text-center max-w-md px-4">
                        <div className="text-2xl font-bold text-neutral/20 mb-2">Calendar View</div>
                        <p className="text-neutral-light">This is a placeholder for the shipment calendar showing all scheduled pickups and deliveries for the month.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-light">Total Shipments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalShipments}</div>
                <div className="text-sm text-neutral-light mt-1">This month</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-light">In Transit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inTransitShipments}</div>
                <div className="text-sm text-neutral-light mt-1">Current active shipments</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-light">Total Weight</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalWeight.toLocaleString()} kg</div>
                <div className="text-sm text-neutral-light mt-1">Shipped this month</div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shipments;
