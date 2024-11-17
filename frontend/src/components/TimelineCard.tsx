interface TimelineCardProps {
  content: {
    date: string;
    title: string;
    completed: boolean;
  }[];
}

const TimelineCard = ({ content }: TimelineCardProps) => {
  return (
    <div className="card animate-fade-in animate-delay-2">
      <h2 className="text-xl font-semibold mb-4">Project Timeline</h2>
      <div className="space-y-4">
        {content.map((milestone, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="w-3 h-3 mt-1.5 rounded-full bg-primary/20 flex-shrink-0">
              {index == 0 && (
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
