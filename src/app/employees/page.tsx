"use client";
import { useMemo, useState } from "react";
import { MessageCircleWarning } from "lucide-react";
import { useEmployeeStore } from "@/store/employeeState";
import AppSpinner from "@/components/AppSpinner";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import TableHeader from "./_components/TableHeader";

export default function Employees() {
  const { employees, departments, isLoading, error } = useEmployeeStore();
  const [emailFilter, setEmailFilter] = useState<string>("");

  const filtredData = useMemo(() => {
    return employees.filter((emp) =>
      emp.email.toLowerCase().includes(emailFilter)
    );
  }, [employees, emailFilter]);

  if (isLoading) return <AppSpinner />;
  if (error)
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <MessageCircleWarning />
      </div>
    );
  return (
    <div>
      <TableHeader emailFilter={emailFilter} setEmailFilter={setEmailFilter} />
      <DataTable
        columns={columns(departments)}
        data={emailFilter.length > 0 ? filtredData : employees}
      />
    </div>
  );
}
