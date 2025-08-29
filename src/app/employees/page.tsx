"use client";
import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { AppSheet } from "./_components/AppSheet";
import { employeeService } from "./service";
import { useEmployeeStore } from "@/store/employeeState";
import { InitialService } from "../service";

export default function Management() {
  const { employees, isLoading, error } = useEmployeeStore();
  if (isLoading) return <p>Loading...</p>; // todo : güzel bir component bul.
  if (error) return <p>Error: {error}</p>; // todo : güzel bir component bul.
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div></div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus />
              Add Employee
            </Button>
          </SheetTrigger>
          <AppSheet />
        </Sheet>
      </div>
      <DataTable columns={columns} data={employees} />
    </div>
  );
}
