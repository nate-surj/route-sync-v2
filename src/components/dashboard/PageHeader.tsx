
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
  actions?: React.ReactNode;
  infoTooltip?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  showBackButton = false,
  actions,
  infoTooltip 
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center">
          {showBackButton && (
            <Button 
              variant="ghost" 
              className="mr-2 p-0 h-8 w-8 rounded-full" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-neutral">{title}</h1>
              {infoTooltip && (
                <div className="ml-2 text-neutral-light cursor-help tooltip" title={infoTooltip}>
                  <Info className="h-4 w-4" />
                </div>
              )}
            </div>
            {description && <p className="text-neutral-light mt-1">{description}</p>}
          </div>
        </div>
        
        {actions && (
          <div className="flex gap-2 w-full md:w-auto">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
