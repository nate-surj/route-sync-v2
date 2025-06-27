
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/dashboard/PageHeader";
import { toast } from "sonner";

const FileDamageClaim = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to the backend
    toast.success("Damage claim submitted successfully");
  };

  return (
    <div className="container mx-auto p-4">
      <PageHeader 
        title="File Damage Claim" 
        description="Report issues with your delivery"
      />

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Damage Claim Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="trackingId" className="block text-sm font-medium mb-1">
                  Tracking ID
                </label>
                <Input
                  id="trackingId"
                  placeholder="Enter your tracking ID"
                  required
                />
              </div>

              <div>
                <label htmlFor="damageType" className="block text-sm font-medium mb-1">
                  Type of Damage
                </label>
                <Input
                  id="damageType"
                  placeholder="e.g., Physical damage, Lost items, etc."
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Damage Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Please provide detailed description of the damage"
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div>
                <label htmlFor="images" className="block text-sm font-medium mb-1">
                  Upload Images
                </label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="cursor-pointer"
                />
                <p className="text-sm text-neutral-light mt-1">
                  You can upload up to 5 images (optional)
                </p>
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium mb-1">
                  Contact Number
                </label>
                <Input
                  id="contact"
                  type="tel"
                  placeholder="Your contact number"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full">
                Submit Claim
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileDamageClaim;
