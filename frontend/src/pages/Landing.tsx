import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowRight,
  Building,
  ChartBarIncreasing,
  Handshake,
  Rocket,
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-bold text-white">Bookable</h1>
          <div className="flex space-x-4">
            <Button onClick={() => navigate("/consult")} variant="outline">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link
              to="/prd"
              className="text-sm font-medium text-white hover:text-white/80"
            >
              View PRD
            </Link>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Build Your Next Big Thing
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get expert AI consultation to transform your business idea into a
            detailed product requirements document.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/consult")}
            className="animate-fade-in"
          >
            Start Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Rocket,
              title: "Launch Fast",
              description:
                "Get your product requirements in minutes, not weeks",
            },
            {
              icon: Building,
              title: "Build Right",
              description: "Detailed specifications for successful development",
            },
            {
              icon: Handshake,
              title: "Expert Guidance",
              description:
                "AI-powered consultation based on industry best practices",
            },
            {
              icon: ChartBarIncreasing,
              title: "Scale Up",
              description: "Clear roadmap for growth and expansion",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-4 rounded-lg glass-morphism hover:scale-105 transition-transform"
            >
              <feature.icon className="h-6 w-6 text-white mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            Trusted by entrepreneurs and startups worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
