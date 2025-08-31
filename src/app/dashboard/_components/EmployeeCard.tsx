"use client";
import { User } from "lucide-react";
import { useEmployeeStore } from "@/store/employeeState";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EmployeeCard() {
  const { employees } = useEmployeeStore();
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>All Employees</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 justify-center items-center h-full">
        <User className="h-14 w-14 text-muted-foreground" />
        <p className="font-extralight text-5xl">{employees.length}</p>
      </CardContent>
    </Card>
  );
}
