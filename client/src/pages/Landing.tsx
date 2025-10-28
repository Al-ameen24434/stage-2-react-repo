import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle, Clock, Users, BarChart3 } from "lucide-react";
import waveUrl from "@assets/hero-wave.svg";
import circleUrl from "@assets/decorative-circle.svg";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
        {/* Decorative Circle */}
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] opacity-60">
          <img src={circleUrl} alt="" className="w-full h-full" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center py-20">
          <h1
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-tight tracking-tight mb-6"
            data-testid="text-hero-title"
          >
            Streamline Your Support{" "}
            <span className="text-primary">Workflow</span>
          </h1>
          <p
            className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto"
            data-testid="text-hero-description"
          >
            TicketFlow helps teams manage customer support tickets efficiently.
            Track, prioritize, and resolve issues with a modern, intuitive
            interface.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <a data-testid="link-hero-signup">
                <Button
                  size="lg"
                  className="text-base px-8 h-12 hover-elevate active-elevate-2 shadow-lg"
                >
                  Get Started Free
                </Button>
              </a>
            </Link>
            <Link href="/auth/login">
              <a data-testid="link-hero-login">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 h-12 hover-elevate active-elevate-2"
                >
                  Login
                </Button>
              </a>
            </Link>
          </div>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-[200px] pointer-events-none">
          <img src={waveUrl} alt="" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-semibold mb-4"
              data-testid="text-features-title"
            >
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features to help your team stay organized and productive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="p-6 hover-elevate transition-all duration-200"
              data-testid="card-feature-tracking"
            >
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Keep track of all your support tickets in one centralized
                location
              </p>
            </Card>

            <Card
              className="p-6 hover-elevate transition-all duration-200"
              data-testid="card-feature-status"
            >
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Status Updates</h3>
              <p className="text-sm text-muted-foreground">
                Monitor ticket progress from open to in-progress to closed
              </p>
            </Card>

            <Card
              className="p-6 hover-elevate transition-all duration-200"
              data-testid="card-feature-team"
            >
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                Work together seamlessly with your support team
              </p>
            </Card>

            <Card
              className="p-6 hover-elevate transition-all duration-200"
              data-testid="card-feature-analytics"
            >
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Get insights into your team's performance and ticket trends
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2
            className="text-3xl sm:text-4xl font-semibold mb-4"
            data-testid="text-cta-title"
          >
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join teams already using TicketFlow to deliver exceptional customer
            support
          </p>
          <Link href="/auth/signup">
            <a data-testid="link-cta-signup">
              <Button
                size="lg"
                className="text-base px-8 h-12 hover-elevate active-elevate-2 shadow-lg"
              >
                Start Managing Tickets Today
              </Button>
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
