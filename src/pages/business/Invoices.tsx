import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Download, Eye, Filter, FileText, AlertCircle } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import PaymentProcessor from "@/components/business/PaymentProcessor";
import { useState } from "react";

// Sample invoice data
const invoices = [
  {
    id: "INV-2001",
    date: "2023-10-15",
    amount: 15600,
    status: "paid",
    dueDate: "2023-10-30",
    deliveries: ["DEL-1001", "DEL-1002"]
  },
  {
    id: "INV-2002",
    date: "2023-10-10",
    amount: 8750,
    status: "paid",
    dueDate: "2023-10-25",
    deliveries: ["DEL-996"]
  },
  {
    id: "INV-2003",
    date: "2023-10-18",
    amount: 12400,
    status: "pending",
    dueDate: "2023-11-02",
    deliveries: ["DEL-1003", "DEL-1004", "DEL-1005"]
  },
  {
    id: "INV-2004",
    date: "2023-09-28",
    amount: 5600,
    status: "overdue",
    dueDate: "2023-10-13",
    deliveries: ["DEL-987"]
  },
  {
    id: "INV-2005",
    date: "2023-10-05",
    amount: 9200,
    status: "paid",
    dueDate: "2023-10-20",
    deliveries: ["DEL-992", "DEL-993"]
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'paid':
      return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'overdue':
      return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0
  }).format(amount);
};

const Invoices = () => {
  const [paymentDialog, setPaymentDialog] = useState<{ isOpen: boolean; invoiceId: string; amount: number }>({
    isOpen: false,
    invoiceId: "",
    amount: 0
  });

  // Find overdue invoices
  const overdueInvoices = invoices.filter(invoice => invoice.status === 'overdue');
  
  const handlePayNow = (invoiceId: string, amount: number) => {
    setPaymentDialog({
      isOpen: true,
      invoiceId,
      amount
    });
  };

  const closePaymentDialog = () => {
    setPaymentDialog({
      isOpen: false,
      invoiceId: "",
      amount: 0
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
              title="Invoices" 
              description="Manage and pay your delivery invoices"
            />
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-cream">
          <div className="mb-6 flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
            <div className="relative flex items-center max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-light" />
              <Input placeholder="Search invoices..." className="pl-9 pr-4" />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-light">Total Outstanding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(18000)}</div>
                <div className="text-sm text-red-500 mt-1">2 unpaid invoices</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-light">Paid This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(33550)}</div>
                <div className="text-sm text-green-500 mt-1">3 invoices</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-neutral-light">Next Payment Due</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(12400)}</div>
                <div className="text-sm text-yellow-500 mt-1">Due on Nov 2, 2023</div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Deliveries</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {invoice.deliveries.map((delivery) => (
                            <Badge key={delivery} variant="outline" className="text-xs">
                              {delivery}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                          {(invoice.status === 'pending' || invoice.status === 'overdue') && (
                            <Button
                              size="sm"
                              onClick={() => handlePayNow(invoice.id, invoice.amount)}
                              className="bg-green-600 hover:bg-green-700 text-white text-xs"
                            >
                              Pay
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {overdueInvoices.length > 0 && (
            <div className="mt-6 p-4 border border-red-200 bg-red-50 rounded-lg flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800">Overdue Invoice Alert</h4>
                <p className="text-sm text-red-600">
                  You have {overdueInvoices.length} overdue invoice{overdueInvoices.length > 1 ? 's' : ''}. Please make payment as soon as possible to avoid service interruptions.
                </p>
                <Button 
                  size="sm" 
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => {
                    const firstOverdue = overdueInvoices[0];
                    handlePayNow(firstOverdue.id, firstOverdue.amount);
                  }}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          )}

          <PaymentProcessor
            invoiceId={paymentDialog.invoiceId}
            amount={paymentDialog.amount}
            isOpen={paymentDialog.isOpen}
            onClose={closePaymentDialog}
          />
        </main>
      </div>
    </div>
  );
};

export default Invoices;
