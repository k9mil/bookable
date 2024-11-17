import { useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const handleGetStarted = () => {
    window.location.href = "/consult";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-dark to-secondary">
      {/* Navbar */}
      <nav className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-semibold text-[#e8e9df]">
                bookable
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>

            {/* Get Started Button */}
            <button
              className="px-6 py-2 text-sm border border-[#e8e9df] text-[#e8e9df] rounded-lg hover:bg-[#e8e9df] hover:text-secondary transition-all duration-300"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content - Centered */}
      <div className="container mx-auto px-4 py-12 lg:py-2 w-screen h-screen justify-center items-center flex -mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-24 items-center justify-center space-x-12">
            {/* Left side - Hero content */}
            <div className="flex-1 animate-fade-up text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
                Simplify your
                <span className="text-[#e8e9df] font-normal italic">
                  {" "}
                  client communication
                </span>
              </h1>
              <p className="text-lg mb-8 text-gray-300 max-w-xl font-light leading-relaxed mx-auto lg:mx-0">
                Get an expert AI consultation to transform your customers rough
                business idea into a comprehensive product requirements
                document. Fast, accurate, and tailored to your customers needs.
              </p>

              <button
                onClick={handleGetStarted}
                className="px-6 py-2 bg-transparent border-2 border-[#e8e9df] text-[#e8e9df] hover:bg-[#e8e9df] hover:text-secondary transition-all duration-300 font-light text-lg shadow-lg hover:shadow-xl rounded-xl"
              >
                Get Started
              </button>
            </div>

            {/* Right side - PRD Preview */}
            <div className="flex-1 w-full">
              <div className="glass-card p-8 animate-fade-up hover:border-[#e8e9df]/20 transition-colors duration-300 border-2 border-[#e8e9df]/20 rounded-xl shadow-xl">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-light mb-2">
                      EcoCommerce Platform
                    </h2>
                    <p className="text-sm text-gray-400 font-light">
                      Version 1.0 - Draft
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-[#e8e9df]/20 text-[#e8e9df] rounded-full text-sm font-light">
                    In Progress
                  </span>
                </div>

                <div className="space-y-6">
                  <Section title="Executive Summary">
                    A sustainable e-commerce platform that connects
                    eco-conscious consumers with verified sustainable product
                    vendors.
                  </Section>

                  <Section title="Key Features">
                    <ul className="list-disc list-inside space-y-2">
                      <li>Vendor sustainability verification system</li>
                      <li>Carbon footprint tracking for shipments</li>
                      <li>Eco-packaging options</li>
                      <li>Product lifecycle transparency</li>
                    </ul>
                  </Section>

                  <Section title="Project Timeline & Budget">
                    <div className="space-y-2">
                      <Requirement
                        label="Development Timeline"
                        value="4-6 months"
                      />
                      <Requirement label="Initial MVP" value="2-3 months" />
                      <Requirement
                        label="Est. Budget Range"
                        value="£150K-200K"
                      />
                    </div>
                  </Section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-gray-300 hover:text-[#e8e9df] transition-colors font-light"
  >
    {children}
  </a>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-[#e8e9df] font-light mb-2">{title}</h3>
    <div className="text-gray-300 font-light leading-relaxed">{children}</div>
  </div>
);

const Requirement = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-gray-400 font-light">{label}</span>
    <span className="text-gray-300 font-light">{value}</span>
  </div>
);

export default Index;
