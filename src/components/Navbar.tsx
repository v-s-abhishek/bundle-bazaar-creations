
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Get user's display name - using email as fallback if name isn't available
  const displayName = user?.email?.split('@')[0] || 'User';

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-bazaar-teal via-bazaar-purple to-bazaar-coral bg-clip-text text-transparent">
            Bundle Bazaar
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/bundles/build" className="text-sm font-medium hover:text-primary transition-colors">
            Bundle Builder
          </Link>
          <Link to="/catalog" className="text-sm font-medium hover:text-primary transition-colors">
            Products
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-bazaar-coral text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="default"
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-bazaar-teal to-bazaar-purple hover:opacity-90 transition-opacity"
            >
              Login
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden rounded-md p-2 text-primary-foreground bg-primary"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background p-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-lg font-medium hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/bundles/build"
              className="text-lg font-medium hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Bundle Builder
            </Link>
            <Link
              to="/catalog"
              className="text-lg font-medium hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="text-lg font-medium hover:text-primary transition-colors flex items-center"
              onClick={closeMobileMenu}
            >
              Cart
              {cartCount > 0 && (
                <span className="ml-2 bg-bazaar-coral text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <>
                <div className="text-lg font-medium">Signed in as {displayName}</div>
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="text-lg font-medium text-destructive hover:text-destructive/80 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Button
                variant="default"
                onClick={() => {
                  navigate("/login");
                  closeMobileMenu();
                }}
                className="bg-gradient-to-r from-bazaar-teal to-bazaar-purple hover:opacity-90 transition-opacity"
              >
                Login
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
