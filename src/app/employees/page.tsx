"use client";
import { useState } from "react";
import { MessageCircleWarning } from "lucide-react";
import { useEmployeeStore } from "@/store/employeeState";
import AppSpinner from "@/components/AppSpinner";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import TableHeader from "./_components/TableHeader";

export default function Employees() {
  const [open, setOpen] = useState<boolean>(false);
  const { employees, departments, isLoading, error } = useEmployeeStore();

  if (isLoading) return <AppSpinner />;
  if (error)
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <MessageCircleWarning />
      </div>
    );

  return (
    <div>
      <TableHeader />
      <DataTable columns={columns(departments)} data={employees} />
    </div>
  );
}
