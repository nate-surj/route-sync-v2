
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
        <span className="text-white font-bold text-lg">RS</span>
      </div>
      <span className="ml-2 text-xl font-bold">
        <span className="text-primary">Route</span>
        <span className="text-secondary">Sync</span>
      </span>
    </div>
  );
};

export default Logo;
