const RequirementsList = () => {
  const requirements = [
    {
      title: "User Authentication",
      description:
        "Implement secure login and registration system with OAuth 2.0",
    },
    {
      title: "Dashboard Analytics",
      description: "Real-time data visualization with customizable widgets",
    },
    {
      title: "Mobile Responsiveness",
      description: "Ensure seamless experience across all device sizes",
    },
    {
      title: "API Integration",
      description: "Connect with external services via RESTful APIs",
    },
    {
      title: "Performance Optimization",
      description: "Optimize loading times and resource utilization",
    },
    {
      title: "Data Security",
      description: "Implement end-to-end encryption and secure data storage",
    },
    {
      title: "Automated Testing",
      description: "Comprehensive test suite for all core functionalities",
    },
    {
      title: "User Feedback System",
      description: "In-app feedback collection and reporting tools",
    },
  ];

  return (
    <div className="card animate-fade-in h-full">
      <h2 className="text-lg font-semibold mb-3">Core Product Requirements</h2>
      <div className="space-y-3">
        {requirements.map((req, index) => (
          <div key={index} className="border-l-2 border-white/10 pl-3">
            <h3 className="font-medium text-sm">{req.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {req.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequirementsList;
