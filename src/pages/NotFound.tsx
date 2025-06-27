
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Logo from "../components/Logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center max-w-md px-4">
        <Logo className="mx-auto mb-8" />
        <h1 className="text-8xl font-bold text-neutral mb-6">404</h1>
        <p className="text-2xl text-neutral mb-4">
          Oops! The page you're looking for can't be found.
        </p>
        <p className="text-neutral-light mb-8">
          It seems like you've taken a wrong turn on the logistics route. Let's get you back on track!
        </p>
        <Link to="/">
          <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg">
            <Home className="mr-2 h-5 w-5" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
