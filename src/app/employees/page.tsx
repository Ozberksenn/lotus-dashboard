"use client";
import { useState } from "react";
import { useEmployeeStore } from "@/store/employeeState";
import { columns } from "./columns";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { AppSheet } from "./_components/AppSheet";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Management() {
  const [open, setOpen] = useState<boolean>(false);
  const { employees, departments, isLoading, error } = useEmployeeStore();

  const handleClose = () => setOpen(false);
  if (isLoading) return <p>Loading...</p>; // todo : güzel bir component bul.
  if (error) return <p>Error: {error}</p>; // todo : güzel bir component bul.
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div></div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button>
              <Plus />
              Add Employee
            </Button>
          </SheetTrigger>
          <AppSheet onSuccess={handleClose} />
        </Sheet>
      </div>
      <DataTable columns={columns(departments, employees)} data={employees} />
    </div>
  );
}
