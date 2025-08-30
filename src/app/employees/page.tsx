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
  const [departmentFilter, setDepartmentFilter] = useState<string>("");

  const filteredData = useMemo(() => {
    return employees.filter((emp) => {
      const emailMatch = emp.email
        .toLowerCase()
        .includes(emailFilter.toLowerCase());

      const depMatch = departmentFilter
        ? departments.find((d) => d.id === emp.departmentId)?.name ===
          departmentFilter
        : true;

      return emailMatch && depMatch;
    });
  }, [employees, emailFilter, departmentFilter, departments]);

  if (isLoading) return <AppSpinner />;
  if (error)
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <MessageCircleWarning />
      </div>
    );
  return (
    <div>
      <TableHeader
        depFilter={departmentFilter}
        setDepFilter={setDepartmentFilter}
        emailFilter={emailFilter}
        setEmailFilter={setEmailFilter}
      />
      <DataTable
        columns={columns(departments)}
        data={
          emailFilter.length > 0
            ? filteredData
            : departmentFilter.length > 0
            ? filteredData
            : employees
        }
      />
    </div>
  );
}
