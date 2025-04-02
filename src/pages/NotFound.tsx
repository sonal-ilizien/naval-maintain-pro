
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-navy-50 flex flex-col items-center justify-center px-4">
      <div className="rounded-full bg-navy-100 p-4 mb-6">
        <AlertCircle className="h-12 w-12 text-navy-600" />
      </div>
      <h1 className="text-4xl font-bold text-navy-900 mb-2">Page Not Found</h1>
      <p className="text-navy-600 text-center max-w-md mb-8">
        The page you are looking for does not exist or has been moved to another location.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </Button>
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
