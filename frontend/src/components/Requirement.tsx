interface RequirementProps {
  label: string;
  value: string;
}

const Requirement = ({ label, value }: RequirementProps) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[#e8e9df]/80">{label}</span>
      <span className="text-[#e8e9df]">{value}</span>
    </div>
  );
};

export default Requirement;
