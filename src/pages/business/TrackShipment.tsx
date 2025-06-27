
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Search } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import TrackingResults from "@/components/tracking/TrackingResults";
import { useTrackingData } from "@/hooks/useTrackingData";

const TrackShipment = () => {
  const [trackingId, setTrackingId] = useState("");
  const { trackingData, trackingUpdates, loading, error, fetchTrackingData } = useTrackingData();

  // Check URL params for tracking ID on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlTrackingId = urlParams.get('id');
    if (urlTrackingId) {
      setTrackingId(urlTrackingId);
      fetchTrackingData(urlTrackingId);
    }
  }, []);

  const handleTrack = () => {
    fetchTrackingData(trackingId);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrack();
    }
  };

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
              <h1 className="text-2xl font-semibold text-neutral">Track Shipment</h1>
              <p className="text-neutral-light mt-1">Enter your tracking ID to get real-time updates on your delivery</p>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-cream">
          <div className="container mx-auto p-4 space-y-6">
            {/* Search Section */}
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Track Your Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter tracking ID (e.g., RSA-B045)"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                    disabled={loading}
                  />
                  <Button onClick={handleTrack} disabled={loading || !trackingId.trim()}>
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Tracking...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Track
                      </>
                    )}
                  </Button>
                </div>
                
                {error && (
                  <Alert className="mt-4" variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Results Section */}
            {trackingData && (
              <TrackingResults 
                trackingData={trackingData} 
                trackingUpdates={trackingUpdates} 
              />
            )}

            {/* Instructions for first-time users */}
            {!trackingData && !loading && !error && (
              <Card className="w-full max-w-2xl mx-auto">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">How to Track Your Shipment</h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>1. Enter your tracking ID in the search box above</p>
                    <p>2. Click "Track" or press Enter to get real-time updates</p>
                    <p>3. Share the tracking link with your customers for transparency</p>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Need help?</strong> Contact our support team if you can't find your tracking ID or need assistance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrackShipment;
