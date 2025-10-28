import { Ticket } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Ticket className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TicketFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional ticket management system designed for teams of all sizes.
              Streamline your support workflow efficiently.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/auth/login" className="hover:text-foreground transition-colors">
                  Login
                </a>
              </li>
              <li>
                <a href="/auth/signup" className="hover:text-foreground transition-colors">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@ticketflow.app</li>
              <li>1-800-TICKETS</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TicketFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
