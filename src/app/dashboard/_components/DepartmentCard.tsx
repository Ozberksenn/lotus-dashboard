import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

export const DepartmentCard = () => {
  return (
    <Card className="h-full">
      <CardContent className="flex flex-col gap-4 justify-center items-center h-full">
        <div>
          <User className="h-14 w-14 text-muted-foreground" />
        </div>
        <p className="font-extralight text-5xl">{200}</p>
      </CardContent>
    </Card>
  );
};
