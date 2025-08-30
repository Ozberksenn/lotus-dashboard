"use client";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EmployeeForm } from "./EmployeeForm";
import { Employee } from "@/types/employee";

export const AppSheet = ({
  onSuccess,
  employee,
}: {
  onSuccess: () => void;
  employee?: Employee;
}) => {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-1">Employee</SheetTitle>
        <SheetDescription className="mb-3">Add New Employee</SheetDescription>
        <EmployeeForm employee={employee} onSuccess={onSuccess} />
      </SheetHeader>
    </SheetContent>
  );
};
