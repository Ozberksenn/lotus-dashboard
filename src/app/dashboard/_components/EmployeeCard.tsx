import { User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Employee } from "@/types/employee";

const employees: Employee[] = [
  {
    id: "1",
  },
  {
    id: "2",
  },
];

export const EmployeeCard = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Çalışan Sayları</CardTitle>
        <CardDescription>Şirketimizde artık daha fazlayız.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 justify-center items-center h-full">
        <User className="h-14 w-14 text-muted-foreground" />
        <p className="font-extralight text-5xl">{employees.length}</p>
      </CardContent>
    </Card>
  );
};
