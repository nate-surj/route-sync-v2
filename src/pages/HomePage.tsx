
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Truck, Bike, Building, Users, Shield, Zap, BarChart, Clock } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-cream">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-center opacity-10"></div>
        <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
                Connecting Africa's Logistics Ecosystem
              </h1>
              <p className="text-lg text-neutral mb-8">
                RouteSync Africa provides real-time tracking, intelligent route matching, and secure payments for logistics companies, drivers, and businesses across Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/onboarding">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white">
                    Get Started
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="relative w-full h-96 rounded-lg shadow-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/fda1e9aa-c516-47e2-adc5-9171d96f4416.png" 
                  alt="Logistics team with driver, manager, and business representative" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/20 rounded-lg"></div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-sm font-semibold text-neutral">Active Routes</div>
                <div className="text-2xl font-bold text-primary">1,248</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-sm font-semibold text-neutral">Trusted Drivers</div>
                <div className="text-2xl font-bold text-secondary">3,567</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* User Types Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral mb-4">Who RouteSync Serves</h2>
            <p className="text-lg text-neutral-light max-w-3xl mx-auto">
              Our platform brings together all players in the logistics ecosystem with tailored solutions for each user type.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-cream rounded-lg p-8 shadow-sm card-hover">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-primary text-white mb-6">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-neutral mb-3">Logistics Companies</h3>
              <p className="text-neutral-light mb-6">
                Optimize your fleet operations, reduce empty trips, and gain real-time visibility into your entire logistics network.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-primary">✓</div>
                  <span className="ml-2 text-neutral-light">Real-time fleet tracking</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-primary">✓</div>
                  <span className="ml-2 text-neutral-light">AI-powered load matching</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-primary">✓</div>
                  <span className="ml-2 text-neutral-light">Driver compliance scoring</span>
                </li>
              </ul>
              <Link to="/onboarding?type=logistics">
                <Button variant="outline" className="w-full">Learn More</Button>
              </Link>
            </div>
            
            <div className="bg-cream rounded-lg p-8 shadow-sm card-hover">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-secondary text-white mb-6">
                <Bike className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-neutral mb-3">Individual Drivers</h3>
              <p className="text-neutral-light mb-6">
                Find loads that match your vehicle capacity, minimize empty returns, and build your trust score for better opportunities.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-secondary">✓</div>
                  <span className="ml-2 text-neutral-light">Smart job matching</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-secondary">✓</div>
                  <span className="ml-2 text-neutral-light">AR navigation overlay</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-secondary">✓</div>
                  <span className="ml-2 text-neutral-light">Secure M-Pesa payments</span>
                </li>
              </ul>
              <Link to="/onboarding?type=driver">
                <Button variant="outline" className="w-full">Learn More</Button>
              </Link>
            </div>
            
            <div className="bg-cream rounded-lg p-8 shadow-sm card-hover">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-neutral text-white mb-6">
                <Building className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-neutral mb-3">SMEs & Businesses</h3>
              <p className="text-neutral-light mb-6">
                Book deliveries with ease, track your shipments in real-time, and access a network of trusted carriers across Africa.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-neutral">✓</div>
                  <span className="ml-2 text-neutral-light">One-click delivery booking</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-neutral">✓</div>
                  <span className="ml-2 text-neutral-light">Live shipment tracking</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-neutral">✓</div>
                  <span className="ml-2 text-neutral-light">Damage claim submission</span>
                </li>
              </ul>
              <Link to="/onboarding?type=business">
                <Button variant="outline" className="w-full">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div id="how-it-works" className="bg-cream py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral mb-4">How RouteSync Works</h2>
            <p className="text-lg text-neutral-light max-w-3xl mx-auto">
              Our intelligent platform connects the dots in Africa's logistics ecosystem, creating efficiency and value for all participants.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center card-hover">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-neutral mb-2">Sign Up</h3>
              <p className="text-neutral-light">
                Create your profile as a logistics company, driver, or business and verify your identity.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center card-hover">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-secondary/10 text-secondary mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-neutral mb-2">Connect</h3>
              <p className="text-neutral-light">
                Our AI matching engine connects available vehicles with nearby delivery needs in real-time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center card-hover">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-neutral mb-2">Track</h3>
              <p className="text-neutral-light">
                Monitor deliveries in real-time with IoT-enabled tracking and receive timely updates.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center card-hover">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-secondary/10 text-secondary mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-neutral mb-2">Pay Securely</h3>
              <p className="text-neutral-light">
                Integrated M-Pesa payments with escrow protection until successful delivery confirmation.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/onboarding">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-white">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">15,000+</div>
              <p className="text-neutral-light">Registered Drivers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">500+</div>
              <p className="text-neutral-light">Logistics Companies</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">3,200+</div>
              <p className="text-neutral-light">Business Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">25M+</div>
              <p className="text-neutral-light">Kilometers Tracked</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-cream py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral mb-4">What Our Users Say</h2>
            <p className="text-lg text-neutral-light max-w-3xl mx-auto">
              Hear from the logistics companies, drivers, and businesses who use RouteSync Africa every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-neutral/10 flex items-center justify-center text-neutral font-bold">JM</div>
                <div className="ml-4">
                  <div className="font-semibold text-neutral">John Mwangi</div>
                  <div className="text-sm text-neutral-light">Truck Driver, Nairobi</div>
                </div>
              </div>
              <div className="text-neutral-light mb-4">
                "RouteSync has completely changed how I find jobs. Now I rarely drive empty, and the trust score system means I get better-paying jobs. The M-Pesa integration makes getting paid fast and secure."
              </div>
              <div className="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-neutral/10 flex items-center justify-center text-neutral font-bold">SL</div>
                <div className="ml-4">
                  <div className="font-semibold text-neutral">Sarah Langat</div>
                  <div className="text-sm text-neutral-light">Operations Manager, Swift Logistics</div>
                </div>
              </div>
              <div className="text-neutral-light mb-4">
                "The real-time tracking and AI matching has reduced our empty trips by 40%. Our fuel costs are down and driver satisfaction is up. The analytics dashboard helps us make smarter decisions every day."
              </div>
              <div className="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-neutral/10 flex items-center justify-center text-neutral font-bold">DO</div>
                <div className="ml-4">
                  <div className="font-semibold text-neutral">David Omondi</div>
                  <div className="text-sm text-neutral-light">Owner, Kisumo Fresh Produce</div>
                </div>
              </div>
              <div className="text-neutral-light mb-4">
                "As a small business, reliable delivery used to be our biggest challenge. With RouteSync, we book deliveries in seconds and our customers get real-time updates. It's transformed our business."
              </div>
              <div className="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Logistics?</h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
              Join thousands of companies and drivers across Africa who are already benefiting from RouteSync's intelligent logistics platform.
            </p>
            <Link to="/onboarding">
              <Button size="lg" className="bg-white text-primary hover:bg-cream">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;
