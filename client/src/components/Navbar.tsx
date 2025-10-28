import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X, Ticket } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { isAuthenticated, logout, session } = useAuth();
  const [, navigate] = useLocation();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-lg transition-all" data-testid="link-home">
            <Ticket className="h-6 w-6 text-primary" />
            <span>TicketFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Button 
                  variant={location === "/dashboard" ? "secondary" : "ghost"}
                  className="hover-elevate active-elevate-2"
                  onClick={() => navigate("/dashboard")}
                  data-testid="link-dashboard"
                >
                  Dashboard
                </Button>
                <Button 
                  variant={location === "/tickets" ? "secondary" : "ghost"}
                  className="hover-elevate active-elevate-2"
                  onClick={() => navigate("/tickets")}
                  data-testid="link-tickets"
                >
                  Tickets
                </Button>
                <div className="flex items-center gap-2 pl-2 border-l">
                  <span className="text-sm text-muted-foreground" data-testid="text-user-name">
                    {session?.user.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="hover-elevate active-elevate-2"
                    data-testid="button-logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="hover-elevate active-elevate-2"
                  onClick={() => navigate("/auth/login")}
                  data-testid="link-login"
                >
                  Login
                </Button>
                <Button 
                  className="hover-elevate active-elevate-2"
                  onClick={() => navigate("/auth/signup")}
                  data-testid="link-signup"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover-elevate active-elevate-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-4 py-4 space-y-2">
            {isAuthenticated ? (
              <>
                <Button
                  variant={location === "/dashboard" ? "secondary" : "ghost"}
                  className="w-full justify-start hover-elevate active-elevate-2"
                  onClick={() => { navigate("/dashboard"); setMobileMenuOpen(false); }}
                  data-testid="link-dashboard-mobile"
                >
                  Dashboard
                </Button>
                <Button
                  variant={location === "/tickets" ? "secondary" : "ghost"}
                  className="w-full justify-start hover-elevate active-elevate-2"
                  onClick={() => { navigate("/tickets"); setMobileMenuOpen(false); }}
                  data-testid="link-tickets-mobile"
                >
                  Tickets
                </Button>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground px-3 py-2" data-testid="text-user-name-mobile">
                    {session?.user.name}
                  </p>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover-elevate active-elevate-2"
                    onClick={handleLogout}
                    data-testid="button-logout-mobile"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover-elevate active-elevate-2"
                  onClick={() => { navigate("/auth/login"); setMobileMenuOpen(false); }}
                  data-testid="link-login-mobile"
                >
                  Login
                </Button>
                <Button
                  className="w-full hover-elevate active-elevate-2"
                  onClick={() => { navigate("/auth/signup"); setMobileMenuOpen(false); }}
                  data-testid="link-signup-mobile"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
