interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <div>
      <h3 className="text-gray-400 font-light text-sm mb-2">{title}</h3>
      <div className="text-[#e8e9df]">{children}</div>
    </div>
  );
};

export default Section;
