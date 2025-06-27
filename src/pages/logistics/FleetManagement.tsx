import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Truck, Search, Filter, Plus, MapPin, Fuel, Calendar, RefreshCw } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddVehicleForm from "@/components/logistics/AddVehicleForm";
import { useFleetData } from "@/hooks/useFleetData";

const FleetManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddVehicleDialogOpen, setIsAddVehicleDialogOpen] = useState(false);
  const { vehicles, loading, refreshVehicles } = useFleetData();

  const handleAddVehicleSuccess = () => {
    refreshVehicles();
    setIsAddVehicleDialogOpen(false);
  };

  const handleAddVehicleCancel = () => {
    setIsAddVehicleDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in_use':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'out_of_service':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.vehicle_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.registration_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.current_location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <DashboardSidebar type="logistics" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <PageHeader 
                title="Fleet Management" 
                description="Manage your fleet of vehicles, track maintenance, and monitor performance"
              />
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshVehicles}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-cream">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full md:w-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-light" />
                </div>
                <Input
                  type="text"
                  placeholder="Search by ID, registration, make, model..."
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
                <Dialog open={isAddVehicleDialogOpen} onOpenChange={setIsAddVehicleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary-dark text-white w-full md:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Vehicle
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Vehicle</DialogTitle>
                      <DialogDescription>
                        Fill in the details below to add a new vehicle to your fleet.
                      </DialogDescription>
                    </DialogHeader>
                    <AddVehicleForm 
                      onSuccess={handleAddVehicleSuccess} 
                      onCancel={handleAddVehicleCancel} 
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Vehicles</TabsTrigger>
                <TabsTrigger value="available">Available</TabsTrigger>
                <TabsTrigger value="in_use">In Use</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <Card>
                  <CardContent className="p-0">
                    {loading ? (
                      <div className="p-6 text-center">Loading fleet data...</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-neutral/5 text-neutral text-sm uppercase">
                            <tr>
                              <th className="px-6 py-3">Vehicle ID</th>
                              <th className="px-6 py-3">Registration</th>
                              <th className="px-6 py-3">Make & Model</th>
                              <th className="px-6 py-3">Type</th>
                              <th className="px-6 py-3">Location</th>
                              <th className="px-6 py-3">Status</th>
                              <th className="px-6 py-3">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {filteredVehicles.map((vehicle) => (
                              <tr key={vehicle.id} className="bg-white hover:bg-neutral/5">
                                <td className="px-6 py-4 font-medium">{vehicle.vehicle_id}</td>
                                <td className="px-6 py-4">{vehicle.registration_number}</td>
                                <td className="px-6 py-4">
                                  <div>
                                    <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                                    <div className="text-sm text-neutral-light">{vehicle.year}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center">
                                    <Truck className="h-4 w-4 mr-2 text-neutral-light" />
                                    {vehicle.vehicle_type.replace('_', ' ')}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-1 text-neutral-light" />
                                    <span className="truncate max-w-[120px]">{vehicle.current_location}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(vehicle.operational_status)}`}>
                                    {vehicle.operational_status.replace('_', ' ')}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <Button variant="outline" size="sm">Details</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {filteredVehicles.length === 0 && !loading && (
                          <div className="p-6 text-center text-neutral-light">
                            No vehicles found. Add your first vehicle to get started.
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="available">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Truck className="mx-auto h-12 w-12 text-neutral-light mb-4" />
                      <h3 className="text-lg font-medium text-neutral mb-2">Available Vehicles</h3>
                      <p className="text-neutral-light">Vehicles that are ready for assignment.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="in_use">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Truck className="mx-auto h-12 w-12 text-neutral-light mb-4" />
                      <h3 className="text-lg font-medium text-neutral mb-2">Vehicles In Use</h3>
                      <p className="text-neutral-light">Vehicles currently assigned to deliveries.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="maintenance">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Truck className="mx-auto h-12 w-12 text-neutral-light mb-4" />
                      <h3 className="text-lg font-medium text-neutral mb-2">Maintenance Schedule</h3>
                      <p className="text-neutral-light">Vehicles requiring maintenance or service.</p>
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

export default FleetManagement;
