
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash, Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface FrequentRoute {
  id?: string;
  user_id?: string;
  name: string;
  pickup_address: string;
  delivery_address: string;
  pickup_contact_name: string;
  pickup_contact_phone: string;
  delivery_contact_name: string;
  delivery_contact_phone: string;
}

const FrequentRoutesPage = () => {
  const [routes, setRoutes] = useState<FrequentRoute[]>([]);
  const [editingRoute, setEditingRoute] = useState<FrequentRoute | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchFrequentRoutes();
  }, []);

  const fetchFrequentRoutes = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('frequent_routes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRoutes(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch frequent routes", {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRoute = async (route: FrequentRoute) => {
    try {
      if (!user) {
        toast.error("You must be logged in to save routes");
        return;
      }

      const routeWithUserId = {
        ...route,
        user_id: user.id
      };

      if (route.id) {
        // Update existing route
        const { error } = await supabase
          .from('frequent_routes')
          .update(routeWithUserId)
          .eq('id', route.id);

        if (error) throw error;
        toast.success("Route updated successfully");
      } else {
        // Create new route
        const { error } = await supabase
          .from('frequent_routes')
          .insert(routeWithUserId);

        if (error) throw error;
        toast.success("Route created successfully");
      }
      
      fetchFrequentRoutes();
      setEditingRoute(null);
    } catch (error: any) {
      toast.error("Failed to save route", {
        description: error.message
      });
    }
  };

  const handleDeleteRoute = async (routeId: string) => {
    try {
      const { error } = await supabase
        .from('frequent_routes')
        .delete()
        .eq('id', routeId);

      if (error) throw error;
      toast.success("Route deleted successfully");
      fetchFrequentRoutes();
    } catch (error: any) {
      toast.error("Failed to delete route", {
        description: error.message
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Frequent Routes</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            {editingRoute ? 
              (editingRoute.id ? "Edit Route" : "Add New Route") 
              : "Create New Route"
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (editingRoute) handleSaveRoute(editingRoute);
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Input
              placeholder="Route Name"
              value={editingRoute?.name || ''}
              onChange={(e) => setEditingRoute(prev => 
                prev ? { ...prev, name: e.target.value } : null
              )}
              required
              className="md:col-span-2"
            />
            <div className="space-y-2 md:col-span-1">
              <h3 className="font-medium">Pickup Information</h3>
              <Input
                placeholder="Pickup Address"
                value={editingRoute?.pickup_address || ''}
                onChange={(e) => setEditingRoute(prev => 
                  prev ? { ...prev, pickup_address: e.target.value } : null
                )}
                required
              />
              <Input
                placeholder="Pickup Contact Name"
                value={editingRoute?.pickup_contact_name || ''}
                onChange={(e) => setEditingRoute(prev => 
                  prev ? { ...prev, pickup_contact_name: e.target.value } : null
                )}
                required
              />
              <Input
                placeholder="Pickup Contact Phone"
                value={editingRoute?.pickup_contact_phone || ''}
                onChange={(e) => setEditingRoute(prev => 
                  prev ? { ...prev, pickup_contact_phone: e.target.value } : null
                )}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-1">
              <h3 className="font-medium">Delivery Information</h3>
              <Input
                placeholder="Delivery Address"
                value={editingRoute?.delivery_address || ''}
                onChange={(e) => setEditingRoute(prev => 
                  prev ? { ...prev, delivery_address: e.target.value } : null
                )}
                required
              />
              <Input
                placeholder="Delivery Contact Name"
                value={editingRoute?.delivery_contact_name || ''}
                onChange={(e) => setEditingRoute(prev => 
                  prev ? { ...prev, delivery_contact_name: e.target.value } : null
                )}
                required
              />
              <Input
                placeholder="Delivery Contact Phone"
                value={editingRoute?.delivery_contact_phone || ''}
                onChange={(e) => setEditingRoute(prev => 
                  prev ? { ...prev, delivery_contact_phone: e.target.value } : null
                )}
                required
              />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit">
                {editingRoute?.id ? "Update Route" : "Create Route"}
              </Button>
              {editingRoute && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditingRoute(null)}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {routes.map((route) => (
          <Card key={route.id} className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="line-clamp-1">{route.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-sm">Pickup:</p>
                  <p className="text-sm">{route.pickup_address}</p>
                  <p className="text-sm text-muted-foreground">
                    {route.pickup_contact_name} ({route.pickup_contact_phone})
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-sm">Delivery:</p>
                  <p className="text-sm">{route.delivery_address}</p>
                  <p className="text-sm text-muted-foreground">
                    {route.delivery_contact_name} ({route.delivery_contact_phone})
                  </p>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setEditingRoute(route)}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => route.id && handleDeleteRoute(route.id)}
                  >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!isLoading && routes.length === 0 && (
        <div className="text-center text-muted-foreground mt-8">
          No frequent routes found. Create your first route!
        </div>
      )}
    </div>
  );
};

export default FrequentRoutesPage;
