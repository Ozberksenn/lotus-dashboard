import { useState } from "react";
import { Pencil } from "lucide-react";

import useUpdateEmployee from "@/api/useUpdateEmployee";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Employee } from "@/types/employee";

import EmployeeForm from "./EmployeeForm";

export default function Edit({ employee }: { employee: Employee }) {
  const [open, setOpen] = useState<boolean>(false);

  const { updateEmployee } = useUpdateEmployee();

  const handleSubmit = async (values: Employee) => {
    await updateEmployee(values, employee.id);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Pencil size={18} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Employee</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-scroll">
          <EmployeeForm initialValues={employee} onSubmit={handleSubmit} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
