
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface UserTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  iconClassName?: string;
}

const UserTypeCard = ({ icon: Icon, title, description, onClick, iconClassName }: UserTypeCardProps) => {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardHeader className="text-center pb-2">
        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${iconClassName}`}>
          <Icon className="h-8 w-8" />
        </div>
        <CardTitle className="mt-4 text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center pt-2">
        <Button variant="outline" className="w-full">Select</Button>
      </CardFooter>
    </Card>
  );
};

export default UserTypeCard;
