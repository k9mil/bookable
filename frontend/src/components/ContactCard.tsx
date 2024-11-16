import { Mail } from "lucide-react";

const ContactCard = () => {
  return (
    <div className="card animate-fade-in animate-delay-3">
      <div className="flex items-center gap-3 text-gray-300">
        <Mail className="w-5 h-5" />
        <p>We'll be in touch shortly regarding your project!</p>
      </div>
      <p className="text-sm text-gray-400 mt-2">
        Expected response time: Within 24 hours
      </p>
    </div>
  );
};

export default ContactCard;
