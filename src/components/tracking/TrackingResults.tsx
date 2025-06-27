import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Package, Truck, Clock, User, Phone, AlertCircle, CheckCircle, Share, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TrackingMap from './TrackingMap';

interface TrackingData {
  id: string;
  tracking_id: string;
  sender_name: string;
  sender_phone: string;
  sender_address: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_address: string;
  package_type: string;
  weight_kg: number;
  dimensions: string;
  special_instructions: string;
  current_status: string;
  current_location: string;
  estimated_delivery_date: string;
  estimated_delivery_time: string;
  proof_of_delivery_url: string;
  delivery_signature_url: string;
  package_condition: string;
  created_at: string;
}

interface TrackingUpdate {
  id: string;
  tracking_id: string;
  status: string;
  location: string;
  timestamp: string;
  notes: string;
}

interface TrackingResultsProps {
  trackingData: TrackingData;
  trackingUpdates: TrackingUpdate[];
}

const TrackingResults: React.FC<TrackingResultsProps> = ({ trackingData, trackingUpdates }) => {
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'damaged':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleShareTracking = () => {
    const trackingUrl = `${window.location.origin}/track-shipment?id=${trackingData.tracking_id}`;
    navigator.clipboard.writeText(trackingUrl);
    toast({
      title: "Tracking Link Copied",
      description: "Share this link with your customers to track this shipment",
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Print Dialog Opened",
      description: "Print this page for your records",
    });
  };

  return (
    <div className="space-y-6">
      {/* Live Map View */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Live Tracking Map
          </h4>
          <TrackingMap
            currentLocation={trackingData.current_location}
            senderAddress={trackingData.sender_address}
            recipientAddress={trackingData.recipient_address}
            trackingId={trackingData.tracking_id}
          />
        </CardContent>
      </Card>

      {/* Main Tracking Info */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Tracking ID: {trackingData.tracking_id}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Est. Delivery: {formatDate(trackingData.estimated_delivery_date)} at {formatTime(trackingData.estimated_delivery_time)}</span>
                <div className="flex items-center gap-1">
                  {getConditionIcon(trackingData.package_condition)}
                  <span>Condition: {trackingData.package_condition}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShareTracking}>
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
            </div>
          </div>

          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trackingData.current_status)}`}>
            {trackingData.current_status.replace('_', ' ').toUpperCase()}
          </div>

          {/* Package Details */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Package Information
              </h4>
              <div className="space-y-2 text-sm">
                <div><strong>Type:</strong> {trackingData.package_type}</div>
                <div><strong>Weight:</strong> {trackingData.weight_kg} kg</div>
                {trackingData.dimensions && <div><strong>Dimensions:</strong> {trackingData.dimensions}</div>}
                {trackingData.special_instructions && (
                  <div><strong>Special Instructions:</strong> {trackingData.special_instructions}</div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Current Location
              </h4>
              <div className="text-sm">
                <div className="font-medium">{trackingData.current_location}</div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Sender Information
              </h4>
              <div className="space-y-1 text-sm">
                <div><strong>Name:</strong> {trackingData.sender_name}</div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>{trackingData.sender_phone}</span>
                </div>
                <div><strong>Address:</strong> {trackingData.sender_address}</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Recipient Information
              </h4>
              <div className="space-y-1 text-sm">
                <div><strong>Name:</strong> {trackingData.recipient_name}</div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>{trackingData.recipient_phone}</span>
                </div>
                <div><strong>Address:</strong> {trackingData.recipient_address}</div>
              </div>
            </div>
          </div>

          {/* Proof of Delivery */}
          {trackingData.proof_of_delivery_url && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-800">
                <CheckCircle className="h-4 w-4" />
                Proof of Delivery Available
              </h4>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(trackingData.proof_of_delivery_url, '_blank')}
              >
                View Proof of Delivery
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tracking Timeline */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Tracking History
          </h4>

          <div className="space-y-4">
            {trackingUpdates.map((update, index) => (
              <div key={update.id} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {index === trackingUpdates.length - 1 ? (
                    <Truck className="h-4 w-4 text-primary" />
                  ) : index === 0 ? (
                    <Package className="h-4 w-4 text-primary" />
                  ) : (
                    <MapPin className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{update.status}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(update.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{update.location}</p>
                  {update.notes && (
                    <p className="text-sm text-gray-500 mt-1">{update.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support Contact */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-4 bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-blue-900">Need Help?</h4>
              <p className="text-sm text-blue-700">Contact our support team for assistance</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-1" />
                Call Support
              </Button>
              <Button variant="outline" size="sm">
                Live Chat
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackingResults;
