import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Users, Search, Filter, Plus, Star, Shield, MapPin, Bell, Phone, Mail, Calendar, Award } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { AddDriverForm, AddDriverFormValues } from "@/components/logistics/AddDriverForm";
import { useToast } from "@/components/ui/use-toast";

// Define the Driver type based on new critical information
interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  licenseClass: string;
  experience: string;
  emergencyContact: string;
  status: string;
  location: string;
  trustScore: number;
}

const initialDriversData: Driver[] = [
  { 
    id: "DRV-001", 
    name: "John Mwangi", 
    phone: "+254 712 345 678", 
    licenseNumber: "DL123456789",
    licenseClass: "Class B",
    experience: "5-10 years", 
    emergencyContact: "+254 722 111 222",
    status: "On Duty", 
    location: "Nairobi - Mombasa Highway",
    trustScore: 92
  },
  { 
    id: "DRV-002", 
    name: "David Omondi", 
    phone: "+254 723 456 789", 
    licenseNumber: "DL987654321",
    licenseClass: "Class C",
    experience: "2-5 years", 
    emergencyContact: "+254 733 222 333",
    status: "Loading", 
    location: "Kisumu Central",
    trustScore: 87
  },
  { 
    id: "DRV-003", 
    name: "Sarah Langat", 
    phone: "+254 734 567 890", 
    licenseNumber: "DL456789123",
    licenseClass: "Class A",
    experience: "10+ years", 
    emergencyContact: "+254 744 333 444",
    status: "Available", 
    location: "Nakuru",
    trustScore: 95
  },
  { 
    id: "DRV-004", 
    name: "Michael Kiprono", 
    phone: "+254 745 678 901", 
    licenseNumber: "DL789123456",
    licenseClass: "Class B",
    experience: "1-2 years", 
    emergencyContact: "+254 755 444 555",
    status: "Off Duty", 
    location: "Nairobi",
    trustScore: 79
  },
  { 
    id: "DRV-005", 
    name: "Lucy Wambui", 
    phone: "+254 756 789 012", 
    licenseNumber: "DL321654987",
    licenseClass: "Class C",
    experience: "2-5 years", 
    emergencyContact: "+254 766 555 666",
    status: "On Duty", 
    location: "Thika Road",
    trustScore: 91
  },
];

const DriversManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [drivers, setDrivers] = useState<Driver[]>(initialDriversData);
  const [isAddDriverDialogOpen, setIsAddDriverDialogOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddDriverSubmit = (data: AddDriverFormValues) => {
    const newDriver: Driver = {
      id: `DRV-${String(drivers.length + 1).padStart(3, '0')}`,
      name: data.name,
      phone: data.phone,
      licenseNumber: data.licenseNumber,
      licenseClass: data.licenseClass,
      experience: data.experience,
      emergencyContact: data.emergencyContact,
      status: "Available",
      location: "N/A",
      trustScore: 80,
    };
    setDrivers(prevDrivers => [...prevDrivers, newDriver]);
  };

  const handleViewProfile = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsProfileDialogOpen(true);
  };
  
  const filteredDrivers = drivers.filter(driver => 
    driver.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <DashboardSidebar type="logistics" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-neutral">Drivers Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="inline-block bg-secondary text-white text-xs px-2 py-1 rounded-md">
                  Company: RSA Logistics
                </span>
              </div>
              
              <button className="p-2 rounded-full text-neutral hover:bg-cream hover:text-primary transition-colors relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="h-8 w-8 rounded-full bg-neutral/10 flex items-center justify-center text-neutral font-bold">
                JD
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-cream">
          <div className="p-6">
            <PageHeader 
              title="Drivers Management" 
              description="Manage your driver workforce across Africa"
            />
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full md:w-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-light" />
                </div>
                <Input
                  type="text"
                  placeholder="Search by ID, name, phone..."
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
                <Dialog open={isAddDriverDialogOpen} onOpenChange={setIsAddDriverDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary-dark text-white w-full md:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Driver
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Driver</DialogTitle>
                      <DialogDescription>
                        Fill in the details below to add a new driver to the system.
                      </DialogDescription>
                    </DialogHeader>
                    <AddDriverForm 
                      onSubmitSuccess={handleAddDriverSubmit} 
                      setOpen={setIsAddDriverDialogOpen} 
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Drivers</TabsTrigger>
                <TabsTrigger value="on-duty">On Duty</TabsTrigger>
                <TabsTrigger value="available">Available</TabsTrigger>
                <TabsTrigger value="off-duty">Off Duty</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-neutral/5 text-neutral text-sm uppercase">
                          <tr>
                            <th className="px-6 py-3">Driver ID</th>
                            <th className="px-6 py-3">Name & Contact</th>
                            <th className="px-6 py-3">License Details</th>
                            <th className="px-6 py-3">Experience</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Location</th>
                            <th className="px-6 py-3">Trust Score</th>
                            <th className="px-6 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {filteredDrivers.map((driver) => (
                            <tr key={driver.id} className="bg-white hover:bg-neutral/5">
                              <td className="px-6 py-4">{driver.id}</td>
                              <td className="px-6 py-4">
                                <div>{driver.name}</div>
                                <div className="text-xs text-neutral-light">{driver.phone}</div>
                              </td>
                              <td className="px-6 py-4">
                                <div>{driver.licenseNumber}</div>
                                <div className="text-xs text-neutral-light">{driver.licenseClass}</div>
                              </td>
                              <td className="px-6 py-4">{driver.experience}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  driver.status === 'On Duty' ? 'bg-green-100 text-green-800' :
                                  driver.status === 'Loading' ? 'bg-yellow-100 text-yellow-800' :
                                  driver.status === 'Available' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {driver.status}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1 text-neutral-light" />
                                  <span>{driver.location}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <Shield className={`h-4 w-4 mr-1 ${
                                    driver.trustScore >= 90 ? 'text-green-500' :
                                    driver.trustScore >= 80 ? 'text-yellow-500' :
                                    'text-red-500'
                                  }`} />
                                  <span>{driver.trustScore}%</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleViewProfile(driver)}
                                >
                                  Profile
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="on-duty">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Users className="mx-auto h-12 w-12 text-neutral-light mb-4" />
                      <h3 className="text-lg font-medium text-neutral mb-2">On Duty Drivers View</h3>
                      <p className="text-neutral-light">This tab would show only drivers who are currently on duty.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="available">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Users className="mx-auto h-12 w-12 text-neutral-light mb-4" />
                      <h3 className="text-lg font-medium text-neutral mb-2">Available Drivers View</h3>
                      <p className="text-neutral-light">This tab would show only available drivers.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="off-duty">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Users className="mx-auto h-12 w-12 text-neutral-light mb-4" />
                      <h3 className="text-lg font-medium text-neutral mb-2">Off Duty Drivers View</h3>
                      <p className="text-neutral-light">This tab would show only off-duty drivers.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Driver Profile Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Driver Profile
            </DialogTitle>
            <DialogDescription>
              Complete driver information and contact details
            </DialogDescription>
          </DialogHeader>
          
          {selectedDriver && (
            <div className="space-y-6">
              {/* Header Section */}
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold text-neutral">{selectedDriver.name}</h3>
                  <p className="text-sm text-neutral-light">{selectedDriver.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className={`h-5 w-5 ${
                    selectedDriver.trustScore >= 90 ? 'text-green-500' :
                    selectedDriver.trustScore >= 80 ? 'text-yellow-500' :
                    'text-red-500'
                  }`} />
                  <span className="font-semibold">{selectedDriver.trustScore}%</span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-neutral flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-neutral-light">Phone:</span>
                      <p className="font-medium">{selectedDriver.phone}</p>
                    </div>
                    <div>
                      <span className="text-neutral-light">Emergency Contact:</span>
                      <p className="font-medium">{selectedDriver.emergencyContact}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-neutral flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location & Status
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-neutral-light">Current Location:</span>
                      <p className="font-medium">{selectedDriver.location}</p>
                    </div>
                    <div>
                      <span className="text-neutral-light">Status:</span>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ml-2 ${
                        selectedDriver.status === 'On Duty' ? 'bg-green-100 text-green-800' :
                        selectedDriver.status === 'Loading' ? 'bg-yellow-100 text-yellow-800' :
                        selectedDriver.status === 'Available' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedDriver.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* License Information */}
              <div className="space-y-3">
                <h4 className="font-medium text-neutral flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  License & Experience
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-neutral-light">License Number:</span>
                    <p className="font-medium">{selectedDriver.licenseNumber}</p>
                  </div>
                  <div>
                    <span className="text-neutral-light">License Class:</span>
                    <p className="font-medium">{selectedDriver.licenseClass}</p>
                  </div>
                  <div>
                    <span className="text-neutral-light">Experience:</span>
                    <p className="font-medium">{selectedDriver.experience}</p>
                  </div>
                </div>
              </div>

              {/* Trust Score Details */}
              <div className="space-y-3">
                <h4 className="font-medium text-neutral flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Performance Metrics
                </h4>
                <div className="bg-neutral/5 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-light">Trust Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            selectedDriver.trustScore >= 90 ? 'bg-green-500' :
                            selectedDriver.trustScore >= 80 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${selectedDriver.trustScore}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-sm">{selectedDriver.trustScore}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriversManagement;
