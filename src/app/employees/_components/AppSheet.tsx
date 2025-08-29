"use client";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EmployeeForm } from "./EmployeeForm";

export const AppSheet = ({ onSuccess }: { onSuccess: () => void }) => {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-1">Employee</SheetTitle>
        <SheetDescription className="mb-3">Add New Employee</SheetDescription>
        <EmployeeForm onSuccess={onSuccess} />
      </SheetHeader>
    </SheetContent>
  );
};
