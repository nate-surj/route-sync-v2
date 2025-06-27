
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Truck, 
  Shield, 
  Star, 
  FileText, 
  Bell, 
  Edit
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import EditProfileModal from "@/components/profile/EditProfileModal";
import ChangePasswordModal from "@/components/profile/ChangePasswordModal";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Profile = () => {
  const { profile } = useAuth();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
  };

  const handleChangePassword = () => {
    setIsChangePasswordOpen(true);
  };

  const handleUpdatePaymentDetails = () => {
    toast.success("Payment details update coming soon");
  };

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <DashboardSidebar type="driver" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-neutral">My Profile</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="inline-block bg-secondary text-white text-xs px-2 py-1 rounded-md">
                  Vehicle: {profile?.vehicle_type || 'Van'}
                </span>
              </div>
              
              <button className="p-2 rounded-full text-neutral hover:bg-cream hover:text-primary transition-colors relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="h-8 w-8 rounded-full bg-neutral/10 flex items-center justify-center text-neutral font-bold">
                {profile?.full_name?.split(' ').map(n => n[0]).join('') || 'JM'}
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-cream">
          <div className="p-6">
            <PageHeader 
              title="My Profile" 
              description="Manage your personal information and settings"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                      <div className="h-24 w-24 rounded-full bg-neutral/10 flex items-center justify-center text-neutral mb-4">
                        <span className="text-3xl font-bold">
                          {profile?.full_name?.split(' ').map(n => n[0]).join('') || 'JM'}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold mb-1">{profile?.full_name || 'John Mwangi'}</h2>
                      <p className="text-neutral-light text-sm mb-3">Driver since Jan 2021</p>
                      <div className="flex items-center mb-4">
                        <Shield className="h-5 w-5 text-green-500 mr-1" />
                        <span className="text-sm font-medium">92% Trust Score</span>
                      </div>
                      <Button className="w-full mb-2 gap-2" onClick={handleEditProfile}>
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-neutral/10 flex items-center justify-center mr-3">
                          <Phone className="h-4 w-4 text-neutral" />
                        </div>
                        <div>
                          <div className="text-xs text-neutral-light">Phone</div>
                          <div className="text-sm">{profile?.phone || '+254 712 345 678'}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-neutral/10 flex items-center justify-center mr-3">
                          <Mail className="h-4 w-4 text-neutral" />
                        </div>
                        <div>
                          <div className="text-xs text-neutral-light">Email</div>
                          <div className="text-sm">{profile?.email || 'john.mwangi@example.com'}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-neutral/10 flex items-center justify-center mr-3">
                          <MapPin className="h-4 w-4 text-neutral" />
                        </div>
                        <div>
                          <div className="text-xs text-neutral-light">Location</div>
                          <div className="text-sm">{profile?.city || 'Nakuru'}, {profile?.country || 'Kenya'}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-neutral/10 flex items-center justify-center mr-3">
                          <Truck className="h-4 w-4 text-neutral" />
                        </div>
                        <div>
                          <div className="text-xs text-neutral-light">Vehicle</div>
                          <div className="text-sm">{profile?.vehicle_type || 'Van'} (RSA-V002)</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Tabs defaultValue="details">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="ratings">Ratings & Feedback</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details">
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium block mb-1">Full Name</label>
                            <Input value={profile?.full_name || 'John Mwangi'} readOnly className="bg-neutral/5" />
                          </div>
                          <div>
                            <label className="text-sm font-medium block mb-1">Date of Birth</label>
                            <Input value="15/06/1985" readOnly className="bg-neutral/5" />
                          </div>
                          <div>
                            <label className="text-sm font-medium block mb-1">Gender</label>
                            <Input value="Male" readOnly className="bg-neutral/5" />
                          </div>
                          <div>
                            <label className="text-sm font-medium block mb-1">National ID</label>
                            <Input value="********2346" readOnly className="bg-neutral/5" />
                          </div>
                          <div>
                            <label className="text-sm font-medium block mb-1">Driver's License</label>
                            <Input value="DL/KE/2018/78923" readOnly className="bg-neutral/5" />
                          </div>
                          <div>
                            <label className="text-sm font-medium block mb-1">Experience</label>
                            <Input value="5 years" readOnly className="bg-neutral/5" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium block mb-1">Address</label>
                          <Input value={profile?.address || '123 Kenyatta Avenue, Nakuru, Kenya'} readOnly className="bg-neutral/5" />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium block mb-1">Emergency Contact</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input value="Sarah Mwangi (Wife)" readOnly className="bg-neutral/5" />
                            <Input value="+254 723 456 789" readOnly className="bg-neutral/5" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="documents">
                    <Card>
                      <CardHeader>
                        <CardTitle>Documents</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 border rounded-md flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="h-10 w-10 text-neutral-light mr-4" />
                              <div>
                                <div className="font-medium">Driver's License</div>
                                <div className="text-xs text-neutral-light">Uploaded on 10 Jan 2023 • Expires 10 Jan 2025</div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                          
                          <div className="p-4 border rounded-md flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="h-10 w-10 text-neutral-light mr-4" />
                              <div>
                                <div className="font-medium">Vehicle Insurance</div>
                                <div className="text-xs text-neutral-light">Uploaded on 05 Feb 2023 • Expires 05 Feb 2024</div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                          
                          <div className="p-4 border rounded-md flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="h-10 w-10 text-neutral-light mr-4" />
                              <div>
                                <div className="font-medium">National ID</div>
                                <div className="text-xs text-neutral-light">Uploaded on 10 Jan 2023 • No expiry</div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="ratings">
                    <Card>
                      <CardHeader>
                        <CardTitle>Ratings & Feedback</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-6 pb-6 border-b">
                          <div>
                            <div className="text-3xl font-bold mb-1">4.8<span className="text-lg text-neutral-light">/5</span></div>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className={`h-5 w-5 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-light'}`} />
                              ))}
                              <span className="ml-2 text-sm text-neutral-light">Based on 48 reviews</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold mb-1">95%</div>
                            <div className="text-sm text-neutral-light">On-time delivery</div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="p-4 border rounded-md">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium">MediHealth Kenya</div>
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className={`h-4 w-4 ${star <= 5 ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-light'}`} />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm">Very professional driver. Delivered our medical supplies on time and handled everything with care.</p>
                            <div className="text-xs text-neutral-light mt-2">October 15, 2023</div>
                          </div>
                          
                          <div className="p-4 border rounded-md">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium">Tech Solutions Ltd</div>
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-light'}`} />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm">Good service overall. Delivered our electronics safely, though arrived a bit later than expected.</p>
                            <div className="text-xs text-neutral-light mt-2">October 8, 2023</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="settings">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 border rounded-md">
                            <div className="font-medium mb-2">Notification Preferences</div>
                            <p className="text-sm text-neutral-light mb-4">Control what notifications you receive</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="text-sm">New job alerts</label>
                                <input type="checkbox" checked className="h-4 w-4" />
                              </div>
                              <div className="flex items-center justify-between">
                                <label className="text-sm">Payment notifications</label>
                                <input type="checkbox" checked className="h-4 w-4" />
                              </div>
                              <div className="flex items-center justify-between">
                                <label className="text-sm">Schedule reminders</label>
                                <input type="checkbox" checked className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 border rounded-md">
                            <div className="font-medium mb-2">Password & Security</div>
                            <p className="text-sm text-neutral-light mb-4">Update your password and secure your account</p>
                            <Button variant="outline" size="sm" onClick={handleChangePassword}>Change Password</Button>
                          </div>
                          
                          <div className="p-4 border rounded-md">
                            <div className="font-medium mb-2">Payment Settings</div>
                            <p className="text-sm text-neutral-light mb-4">Manage your payment methods and preferences</p>
                            <Button variant="outline" size="sm" onClick={handleUpdatePaymentDetails}>Update Payment Details</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>

      <EditProfileModal 
        isOpen={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)} 
      />
      <ChangePasswordModal 
        isOpen={isChangePasswordOpen} 
        onClose={() => setIsChangePasswordOpen(false)} 
      />
    </div>
  );
};

export default Profile;
