import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { getTickets, StoredTicket } from "@/lib/tickets";
import { Ticket, CheckCircle2, Clock, XCircle } from "lucide-react";

function DashboardContent() {
  const { session } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });

  useEffect(() => {
    if (session) {
      const tickets = getTickets(session.user.id);
      setStats({
        total: tickets.length,
        open: tickets.filter((t: StoredTicket) => t.status === "open").length,
        inProgress: tickets.filter((t: StoredTicket) => t.status === "in_progress").length,
        closed: tickets.filter((t: StoredTicket) => t.status === "closed").length,
      });
    }
  }, [session]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-2" data-testid="text-dashboard-title">
              Dashboard
            </h1>
            <p className="text-muted-foreground" data-testid="text-dashboard-description">
              Welcome back, {session?.user.name}! Here's an overview of your tickets.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card data-testid="card-stat-total">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold" data-testid="text-stat-total">
                  {stats.total}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  All tickets in the system
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-stat-open">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                <Clock className="h-4 w-4 text-ticket-open-text" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-ticket-open-text" data-testid="text-stat-open">
                  {stats.open}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Awaiting response
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-stat-closed">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved Tickets</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-ticket-closed-text" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-ticket-closed-text" data-testid="text-stat-closed">
                  {stats.closed}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Successfully resolved
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Link href="/tickets">
                <a data-testid="link-view-tickets">
                  <Button className="hover-elevate active-elevate-2">
                    <Ticket className="h-4 w-4 mr-2" />
                    View All Tickets
                  </Button>
                </a>
              </Link>
              <Link href="/tickets?action=create">
                <a data-testid="link-create-ticket">
                  <Button variant="outline" className="hover-elevate active-elevate-2">
                    Create New Ticket
                  </Button>
                </a>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
