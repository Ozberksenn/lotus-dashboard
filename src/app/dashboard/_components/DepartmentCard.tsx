import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard } from "lucide-react";

export const DepartmentCard = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Departman Dağılımı</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row gap-4 justify-center items-center h-full">
        <LayoutDashboard className="h-14 w-14 text-muted-foreground" />
        <p className="font-extralight text-5xl">{200}</p>
      </CardContent>
    </Card>
  );
};
