interface RequirementsListProps {
  content: {
    title: string;
    description: string;
  }[];
}

const RequirementsList = ({ content }: RequirementsListProps) => {
  return (
    <div className="card animate-fade-in h-full">
      <h2 className="text-lg font-semibold mb-3">Core Product Requirements</h2>
      <div className="space-y-3">
        {content.map((req, index) => (
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
