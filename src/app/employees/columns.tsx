"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee";
import { ColumnDef } from "@tanstack/react-table";
import { Mail, Phone } from "lucide-react";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ getValue }) => (
      <div>
        <Avatar>
          <AvatarImage src={String(getValue())} />
        </Avatar>
      </div>
    ),
  },
  {
    id: "fullName",
    header: "Name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    cell: ({ getValue }) => (
      <div className="font-medium">{String(getValue())}</div>
    ),
    size: 220,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => (
      <div className="flex gap-1 items-center">
        <Mail size={16} />
        <h5>{String(getValue())}</h5>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ getValue }) => (
      <div className="flex gap-1 items-center">
        <Phone size={16} />
        <h5>{String(getValue())}</h5>
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    // accessorFn: (row) =>
    // departments.find(d => d.id === row.departmentId)?.name || "",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "salary",
    header: "Salary",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <Button variant="outline">{String(getValue())}</Button>
    ),
  },
  {
    accessorKey: "teamId",
    header: "Team ID",
  },
];
