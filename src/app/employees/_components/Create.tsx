import { useState } from "react";

import { Plus } from "lucide-react";

import useCreateEmployee from "@/api/useCreateEmployee";
import { useEmployeeStore } from "@/store/employeeState";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee";

const INITIAL_VALUES: Employee = {
  id: crypto.randomUUID(),
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  departmentId: "",
  position: "",
  salary: 0,
  startDate: "",
  avatar: "",
  status: "active",
};

import EmployeeForm from "./EmployeeForm";

export default function Create() {
  const { employees } = useEmployeeStore();

  const [open, setOpen] = useState<boolean>(false);

  const { createEmployee } = useCreateEmployee();

  const handleSubmit = async (values: Employee) => {
    await createEmployee(values);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          Add Employee
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Employee</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-scroll">
          <EmployeeForm
            initialValues={INITIAL_VALUES}
            onSubmit={handleSubmit}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
