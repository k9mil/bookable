import { samplePRDs } from "@/lib/data";
import PRDCard from "@/components/PRDCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#111111]">
      <div className="container py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl text-[#e8e9df] mb-4 font-bold">
            Your Dashboard
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            View and manage your customers' generated Product Requirement
            Documents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {samplePRDs.map((prd) => (
            <PRDCard key={prd.id} prd={prd} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
