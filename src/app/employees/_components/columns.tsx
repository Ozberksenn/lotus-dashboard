"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee";
import { ColumnDef } from "@tanstack/react-table";
import { DollarSign, Mail, Phone } from "lucide-react";
import { Department } from "@/types/department";
import Delete from "@/app/employees/_components/Delete";
import Edit from "@/app/employees/_components/Edit";

export const columns = (departments: Department[]): ColumnDef<Employee>[] => [
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row, getValue }) => (
      <div>
        <Avatar>
          <AvatarImage src={String(getValue())} />
          <AvatarFallback>
            {getAvatarFallback({
              firstName: row.original.firstName,
              lastName: row.original.lastName,
            })}
          </AvatarFallback>
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
    accessorFn: (row) =>
      departments.find((d) => d.id === row.departmentId)?.name || "",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ getValue }) => {
      return (
        <div className="flex gap-1 items-center ">
          <DollarSign size={12} />
          <p>{String(getValue())}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ getValue }) => {
      const date = new Date(String(getValue()));
      const formattedDate = date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return <Button variant="secondary">{formattedDate}</Button>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) =>
      getValue() == "active" ? (
        <Button>Active</Button>
      ) : (
        <Button variant="destructive">Passive</Button>
      ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex flex-row gap-2">
        <Edit employee={row.original} />
        <Delete id={row.original.id} />
      </div>
    ),
  },
];

function getAvatarFallback(user: {
  firstName?: string;
  lastName?: string;
}): string {
  const first = user.firstName?.trim() || "";
  const last = user.lastName?.trim() || "";

  if (first && last) {
    return (first[0] + last[0]).toUpperCase();
  }

  if (first) {
    return first.slice(0, 3).toUpperCase();
  }

  if (last) {
    return last.slice(0, 3).toUpperCase();
  }

  return "?";
}
