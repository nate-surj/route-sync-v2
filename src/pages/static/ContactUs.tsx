
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, SendIcon, CheckCircle } from "lucide-react";
import Logo from "@/components/Logo";

const ContactUs = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would normally send the data to your backend
    // For demo purposes, we'll just set the submitted state
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6">
              <Link to="/" className="text-neutral hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-neutral hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-primary font-medium">
                Contact
              </Link>
            </nav>
            <Link to="/onboarding">
              <Button className="bg-primary hover:bg-primary-dark text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral">Contact Us</h1>
          <p className="text-lg md:text-xl text-neutral-light mb-8 leading-relaxed">
            Get in touch with our team to learn more about RouteSync, request a demo, or discuss how we can help with your logistics needs.
          </p>
        </div>
      </section>
      
      {/* Contact Form and Info Section */}
      <section className="py-16 px-4 mb-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-neutral">Get In Touch</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Our Location</h3>
                        <address className="not-italic text-neutral-light">
                          <p>RouteSync Africa Headquarters</p>
                          <p>Ngong Road, Nairobi</p>
                          <p>Kenya</p>
                        </address>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                        <p className="text-neutral-light">General Inquiries: +254 712 345 678</p>
                        <p className="text-neutral-light">Support: +254 723 456 789</p>
                        <p className="text-neutral-light">Business Development: +254 734 567 890</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                        <p className="text-neutral-light">General Inquiries: info@routesync.africa</p>
                        <p className="text-neutral-light">Support: support@routesync.africa</p>
                        <p className="text-neutral-light">Business Development: business@routesync.africa</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-neutral">Office Hours</h3>
                <div className="bg-white p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-neutral">Monday - Friday</p>
                      <p className="text-neutral-light">8:00 AM - 6:00 PM</p>
                    </div>
                    <div>
                      <p className="font-medium text-neutral">Saturday</p>
                      <p className="text-neutral-light">9:00 AM - 1:00 PM</p>
                    </div>
                    <div>
                      <p className="font-medium text-neutral">Sunday</p>
                      <p className="text-neutral-light">Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-neutral">Send Us a Message</h2>
              
              <Card>
                <CardContent className="p-6">
                  {!formSubmitted ? (
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-neutral mb-1">
                            Your Name*
                          </label>
                          <Input 
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-neutral mb-1">
                            Email Address*
                          </label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-neutral mb-1">
                            Subject*
                          </label>
                          <Input 
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="What is this regarding?"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-neutral mb-1">
                            Message*
                          </label>
                          <Textarea 
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell us how we can help you..."
                            rows={6}
                            required
                          />
                        </div>
                        
                        <div className="pt-2">
                          <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white">
                            <SendIcon className="h-4 w-4 mr-2" />
                            Send Message
                          </Button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-neutral">Message Sent!</h3>
                      <p className="text-neutral-light mb-6">
                        Thank you for contacting us. We'll get back to you as soon as possible.
                      </p>
                      <Button 
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            subject: "",
                            message: ""
                          });
                        }}
                        variant="outline"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-neutral">Frequently Asked Questions</h3>
                <div className="bg-white p-4 rounded-lg space-y-4">
                  <div>
                    <h4 className="font-medium text-neutral">How quickly can I expect a response?</h4>
                    <p className="text-neutral-light text-sm">We typically respond to all inquiries within 24 business hours.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral">Do you offer services outside of Kenya?</h4>
                    <p className="text-neutral-light text-sm">Yes, we currently operate in 8 African countries including Kenya, Uganda, Tanzania, Rwanda, Ethiopia, Nigeria, Ghana, and South Africa.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral">Can I schedule a demo of your platform?</h4>
                    <p className="text-neutral-light text-sm">Absolutely! Please mention this in your message, and our team will arrange a personalized demo for you.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section (Placeholder) */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral">Find Us</h2>
          </div>
          
          <div className="h-96 bg-neutral/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-neutral-light mx-auto mb-4" />
              <p className="text-neutral mb-2 font-medium">Map Placeholder</p>
              <p className="text-neutral-light text-sm">This is a placeholder for an interactive map showing our office location.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-neutral text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo className="mb-4" />
              <p className="text-neutral-light text-sm">
                Connecting Africa through efficient logistics solutions.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-neutral-light hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="text-neutral-light hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-neutral-light hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-light hover:text-white transition-colors">For Businesses</a></li>
                <li><a href="#" className="text-neutral-light hover:text-white transition-colors">For Drivers</a></li>
                <li><a href="#" className="text-neutral-light hover:text-white transition-colors">For Logistics Companies</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <address className="not-italic text-neutral-light">
                <p>Ngong Road, Nairobi</p>
                <p>Kenya</p>
                <p className="mt-2">info@routesync.africa</p>
                <p>+254 712 345 678</p>
              </address>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-neutral-dark text-center text-neutral-light">
            <p>© {new Date().getFullYear()} RouteSync Africa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
