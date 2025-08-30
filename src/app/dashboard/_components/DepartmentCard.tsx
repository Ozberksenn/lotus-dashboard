"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEmployeeStore } from "@/store/employeeState";
import { LayoutDashboard } from "lucide-react";

export const DepartmentCard = () => {
  const { departments } = useEmployeeStore();
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>All Departments</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row gap-4 justify-center items-center h-full">
        <LayoutDashboard className="h-14 w-14 text-muted-foreground" />
        <p className="font-extralight text-5xl">{departments.length}</p>
      </CardContent>
    </Card>
  );
};
