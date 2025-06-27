
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CreditCard, Plus, Trash2, Edit, ChevronsUpDown, Smartphone, Building, Shield } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import PageHeader from "@/components/dashboard/PageHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

// Sample payment methods
const paymentMethods = [
  {
    id: "pm-1",
    name: "Visa ending in 4242",
    type: "credit_card",
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
    isDefault: true
  },
  {
    id: "pm-2",
    name: "M-Pesa",
    type: "mobile_money",
    phoneNumber: "+254 712 345678",
    isDefault: false
  },
  {
    id: "pm-3",
    name: "Mastercard ending in 5555",
    type: "credit_card",
    brand: "mastercard",
    last4: "5555",
    expMonth: 8,
    expYear: 2024,
    isDefault: false
  }
];

// Sample bank accounts
const bankAccounts = [
  {
    id: "ba-1",
    bankName: "Kenya Commercial Bank",
    accountName: "ABC Logistics Ltd",
    accountNumber: "****2345",
    isVerified: true
  },
  {
    id: "ba-2",
    bankName: "Equity Bank",
    accountName: "ABC Logistics Ltd",
    accountNumber: "****8901",
    isVerified: true
  }
];

// Form schema for adding a new card
const cardFormSchema = z.object({
  cardholderName: z.string().min(3, "Cardholder name is required"),
  cardNumber: z.string().min(16, "Card number must be at least 16 digits"),
  expiryMonth: z.string().min(1, "Expiry month is required"),
  expiryYear: z.string().min(4, "Expiry year must be 4 digits"),
  cvv: z.string().min(3, "CVV must be 3 or 4 digits"),
  makeDefault: z.boolean().default(false)
});

// Form schema for adding mobile money
const mobileMoneyFormSchema = z.object({
  provider: z.string().min(1, "Provider is required"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  makeDefault: z.boolean().default(false)
});

const PaymentMethods = () => {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  
  const cardForm = useForm<z.infer<typeof cardFormSchema>>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      makeDefault: false
    }
  });
  
  const mobileMoneyForm = useForm<z.infer<typeof mobileMoneyFormSchema>>({
    resolver: zodResolver(mobileMoneyFormSchema),
    defaultValues: {
      provider: "",
      phoneNumber: "",
      makeDefault: false
    }
  });
  
  const onAddCard = (values: z.infer<typeof cardFormSchema>) => {
    console.log(values);
    toast({
      title: "Card added",
      description: "Your new payment method has been added successfully."
    });
    setActiveDialog(null);
    cardForm.reset();
  };
  
  const onAddMobileMoney = (values: z.infer<typeof mobileMoneyFormSchema>) => {
    console.log(values);
    toast({
      title: "Mobile money added",
      description: "Your mobile money account has been linked successfully."
    });
    setActiveDialog(null);
    mobileMoneyForm.reset();
  };
  
  const handleDeletePaymentMethod = (id: string) => {
    toast({
      title: "Payment method removed",
      description: "The payment method has been removed from your account."
    });
  };
  
  const handleSetDefault = (id: string) => {
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated."
    });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <DashboardSidebar type="business" />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <PageHeader 
              title="Payment Methods" 
              description="Manage your payment and billing methods"
            />
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-cream">
          <Tabs defaultValue="payment-methods" className="w-full mb-6">
            <TabsList>
              <TabsTrigger value="payment-methods">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Methods
              </TabsTrigger>
              <TabsTrigger value="bank-accounts">
                <Building className="h-4 w-4 mr-2" />
                Bank Accounts
              </TabsTrigger>
              <TabsTrigger value="billing-address">
                <ChevronsUpDown className="h-4 w-4 mr-2" />
                Billing Address
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="payment-methods" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">Your Payment Methods</h3>
                  <p className="text-sm text-neutral-light">Manage your cards and mobile money accounts</p>
                </div>
                <div className="flex gap-2">
                  <Dialog open={activeDialog === 'add-card'} onOpenChange={(open) => setActiveDialog(open ? 'add-card' : null)}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Add Card
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Card</DialogTitle>
                        <DialogDescription>
                          Enter your card details to add a new payment method.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <Form {...cardForm}>
                        <form onSubmit={cardForm.handleSubmit(onAddCard)} className="space-y-4">
                          <FormField
                            control={cardForm.control}
                            name="cardholderName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cardholder Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={cardForm.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="4242 4242 4242 4242" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-3 gap-4">
                            <FormField
                              control={cardForm.control}
                              name="expiryMonth"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Month</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="MM" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {Array.from({ length: 12 }, (_, i) => {
                                        const month = (i + 1).toString().padStart(2, '0');
                                        return (
                                          <SelectItem key={month} value={month}>
                                            {month}
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={cardForm.control}
                              name="expiryYear"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Year</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="YYYY" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {Array.from({ length: 10 }, (_, i) => {
                                        const year = (new Date().getFullYear() + i).toString();
                                        return (
                                          <SelectItem key={year} value={year}>
                                            {year}
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={cardForm.control}
                              name="cvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVV</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123" maxLength={4} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={cardForm.control}
                            name="makeDefault"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                  <FormLabel>Make Default</FormLabel>
                                  <FormDescription>
                                    Use this as your default payment method
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setActiveDialog(null)}>
                              Cancel
                            </Button>
                            <Button type="submit">Add Card</Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog open={activeDialog === 'add-mobile'} onOpenChange={(open) => setActiveDialog(open ? 'add-mobile' : null)}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Add Mobile Money
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Mobile Money</DialogTitle>
                        <DialogDescription>
                          Link your mobile money account for payments.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <Form {...mobileMoneyForm}>
                        <form onSubmit={mobileMoneyForm.handleSubmit(onAddMobileMoney)} className="space-y-4">
                          <FormField
                            control={mobileMoneyForm.control}
                            name="provider"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Provider</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select provider" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                                    <SelectItem value="airtel">Airtel Money</SelectItem>
                                    <SelectItem value="tkash">T-Kash</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={mobileMoneyForm.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+254 7XX XXX XXX" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={mobileMoneyForm.control}
                            name="makeDefault"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                  <FormLabel>Make Default</FormLabel>
                                  <FormDescription>
                                    Use this as your default payment method
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setActiveDialog(null)}>
                              Cancel
                            </Button>
                            <Button type="submit">Add Mobile Money</Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <Card key={method.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary-light/10 flex items-center justify-center mr-4">
                            {method.type === 'credit_card' ? (
                              <CreditCard className="h-5 w-5 text-primary" />
                            ) : (
                              <Smartphone className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{method.name}</h3>
                            {method.type === 'credit_card' ? (
                              <p className="text-sm text-neutral-light">
                                Expires {method.expMonth.toString().padStart(2, '0')}/{method.expYear}
                              </p>
                            ) : (
                              <p className="text-sm text-neutral-light">
                                {method.phoneNumber}
                              </p>
                            )}
                            {method.isDefault && (
                              <Badge className="mt-1 bg-blue-100 text-blue-800">Default</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!method.isDefault && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleSetDefault(method.id)}
                            >
                              Set Default
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeletePaymentMethod(method.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <div className="bg-blue-50 p-4 rounded-lg max-w-lg text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium text-blue-800 mb-1">Secure Payments</h4>
                  <p className="text-sm text-blue-700">
                    All payment information is securely encrypted and stored with our PCI-compliant payment processor.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="bank-accounts" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">Your Bank Accounts</h3>
                  <p className="text-sm text-neutral-light">Manage bank accounts for payments and refunds</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Bank Account
                </Button>
              </div>
              
              <div className="space-y-4">
                {bankAccounts.map((account) => (
                  <Card key={account.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                            <Building className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{account.bankName}</h3>
                            <p className="text-sm text-neutral-light">
                              {account.accountName} • {account.accountNumber}
                            </p>
                            {account.isVerified && (
                              <Badge className="mt-1 bg-green-100 text-green-800">Verified</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="billing-address" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                  <CardDescription>
                    This address will be used for invoices and billing purposes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input id="company-name" defaultValue="ABC Logistics Ltd" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
                        <Input id="tax-id" defaultValue="KE12345678A" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address-line1">Address Line 1</Label>
                      <Input id="address-line1" defaultValue="123 Business Avenue" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address-line2">Address Line 2</Label>
                      <Input id="address-line2" defaultValue="Floor 5, Suite 501" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue="Nairobi" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/County</Label>
                        <Input id="state" defaultValue="Nairobi" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postal-code">Postal Code</Label>
                        <Input id="postal-code" defaultValue="00100" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select defaultValue="kenya">
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kenya">Kenya</SelectItem>
                          <SelectItem value="uganda">Uganda</SelectItem>
                          <SelectItem value="tanzania">Tanzania</SelectItem>
                          <SelectItem value="rwanda">Rwanda</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Update Billing Address</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default PaymentMethods;
