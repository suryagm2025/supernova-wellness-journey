
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-supernova-dark to-black/80">
      <Header />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-supernova-blue to-supernova-purple bg-clip-text text-transparent animate-pulse mb-4">404</h1>
            <p className="text-2xl text-white mb-6">Page Not Found</p>
            <p className="text-gray-400 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <Link 
            to="/" 
            className="inline-block bg-gradient-to-r from-supernova-blue to-supernova-purple hover:from-supernova-purple hover:to-supernova-blue text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
