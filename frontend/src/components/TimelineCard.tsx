const TimelineCard = () => {
  const milestones = [
    { date: "March 1, 2024", title: "Project Kickoff", completed: true },
    { date: "April 15, 2024", title: "Alpha Release", completed: false },
    { date: "May 30, 2024", title: "Beta Testing", completed: false },
    { date: "June 30, 2024", title: "Final Launch", completed: false },
  ];

  return (
    <div className="card animate-fade-in animate-delay-2">
      <h2 className="text-xl font-semibold mb-4">Project Timeline</h2>
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="w-3 h-3 mt-1.5 rounded-full bg-primary/20 flex-shrink-0">
              {milestone.completed && (
                <div className="w-full h-full rounded-full bg-success animate-pulse" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-300">{milestone.title}</p>
              <p className="text-sm text-gray-400">{milestone.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineCard;
