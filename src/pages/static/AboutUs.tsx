
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { 
  MapPin, TruckIcon, Users, BarChart3, 
  Award, Heart, Shield, TrendingUp 
} from "lucide-react";

const AboutUs = () => {
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
              <Link to="/about" className="text-primary font-medium">
                About Us
              </Link>
              <Link to="/contact" className="text-neutral hover:text-primary transition-colors">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral">Transforming Logistics Across Africa</h1>
          <p className="text-lg md:text-xl text-neutral-light mb-8 leading-relaxed">
            RouteSync is on a mission to revolutionize logistics across Africa by connecting businesses, drivers, and logistics companies through innovative technology and trusted partnerships.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/onboarding">
              <Button className="bg-primary hover:bg-primary-dark text-white">
                Join Our Network
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Our Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-neutral">Our Mission</h2>
            <p className="text-lg text-neutral-light max-w-2xl mx-auto">
              To build Africa's most efficient and trusted logistics network by connecting businesses with reliable transportation solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-cream rounded-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral">Efficient Deliveries</h3>
              <p className="text-neutral-light">
                Optimizing routes and matching loads with available vehicles to reduce costs and delivery times.
              </p>
            </div>
            
            <div className="text-center p-6 bg-cream rounded-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral">Trust & Reliability</h3>
              <p className="text-neutral-light">
                Building a network of trusted drivers and logistics partners to ensure secure and dependable service.
              </p>
            </div>
            
            <div className="text-center p-6 bg-cream rounded-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral">Economic Growth</h3>
              <p className="text-neutral-light">
                Facilitating business opportunities and supporting livelihoods across the African continent.
              </p>
            </div>
            
            <div className="text-center p-6 bg-cream rounded-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral">Community Focus</h3>
              <p className="text-neutral-light">
                Creating positive impact in local communities through accessible transportation and employment.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-neutral">Our Story</h2>
              <p className="text-lg text-neutral-light mb-4">
                RouteSync began in 2020 when our founders, a team of technology and logistics experts, saw the challenges facing transportation across Africa. They noticed empty trucks returning from deliveries, while nearby businesses struggled to find affordable transport for their goods.
              </p>
              <p className="text-lg text-neutral-light mb-4">
                What started as a small operation in Nairobi has now grown into a continent-wide network of thousands of drivers, businesses, and logistics companies working together to make transportation more efficient and accessible.
              </p>
              <p className="text-lg text-neutral-light">
                Today, we're proud to be a driving force in modernizing Africa's logistics infrastructure and creating opportunities for businesses of all sizes.
              </p>
            </div>
            <div className="bg-neutral/5 p-8 rounded-lg min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-neutral-light mx-auto mb-4" />
                <p className="text-neutral mb-2 font-medium">Company Timeline Image</p>
                <p className="text-neutral-light text-sm">This is a placeholder for the company timeline or founding team image.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">5,000+</div>
              <p className="text-lg opacity-80">Active Drivers</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">3,200+</div>
              <p className="text-lg opacity-80">Business Clients</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">450+</div>
              <p className="text-lg opacity-80">Logistics Companies</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">8</div>
              <p className="text-lg opacity-80">African Countries</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-neutral">Our Leadership Team</h2>
            <p className="text-lg text-neutral-light max-w-2xl mx-auto">
              Meet the experienced team driving RouteSync's mission to transform logistics across Africa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-neutral/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-neutral-light" />
              </div>
              <h3 className="text-xl font-semibold mb-1 text-neutral">Sarah Langat</h3>
              <p className="text-neutral-light mb-3">Co-Founder & CEO</p>
              <p className="text-sm text-neutral-light px-4">
                Logistics industry expert with 15 years of experience across East Africa.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-neutral/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-neutral-light" />
              </div>
              <h3 className="text-xl font-semibold mb-1 text-neutral">Michael Ochieng</h3>
              <p className="text-neutral-light mb-3">Co-Founder & CTO</p>
              <p className="text-sm text-neutral-light px-4">
                Tech innovator with previous experience at leading African tech companies.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-neutral/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-neutral-light" />
              </div>
              <h3 className="text-xl font-semibold mb-1 text-neutral">David Mwangi</h3>
              <p className="text-neutral-light mb-3">Chief Operations Officer</p>
              <p className="text-sm text-neutral-light px-4">
                Supply chain specialist with expertise in cross-border logistics.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Us CTA */}
      <section className="py-16 px-4 bg-cream">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-neutral">Join the RouteSync Revolution</h2>
          <p className="text-lg text-neutral-light mb-8 leading-relaxed">
            Whether you're a driver looking for consistent work, a business seeking reliable deliveries, or a logistics company aiming to optimize your fleet, RouteSync has a solution for you.
          </p>
          <Link to="/onboarding">
            <Button className="bg-primary hover:bg-primary-dark text-white">
              Get Started Today
            </Button>
          </Link>
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

export default AboutUs;
