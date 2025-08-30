"use client";
import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee";
import { ColumnDef } from "@tanstack/react-table";
import { DollarSign, Mail, Pencil, Phone, Trash } from "lucide-react";
import { Department } from "@/types/department";
import { employeeService } from "./service";
import { useEmployeeStore } from "@/store/employeeState";
import { AppAlertDialog } from "@/components/AppAlertDialog";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { AppSheet } from "./_components/AppSheet";

export const columns = (departments: Department[]): ColumnDef<Employee>[] => [
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
        <Button>{String(getValue())}</Button>
      ) : (
        <Button variant="destructive">{String(getValue())}</Button>
      ),
  },
  {
    accessorKey: "update",
    header: "Update",
    cell: ({ row }) => {
      const [open, setOpen] = useState<boolean>(false);
      const handleClose = () => setOpen(false);
      const employee = row.original as Employee;
      return (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Pencil size={18} />
          </SheetTrigger>
          <AppSheet employee={employee} onSuccess={handleClose} />
        </Sheet>
      );
    },
  },
  {
    accessorKey: "delete",
    header: "Delete",
    cell: ({ row }) => {
      const { employees, setEmployees } = useEmployeeStore();
      return (
        <AppAlertDialog
          title="Are you absolutely sure?"
          description="This process will delete the relevant employee. Are you still sure?"
          onConfirm={async () => {
            const data = await employeeService.deleteEmployee(row.original.id);
            if (data != null) {
              const newData = employees.filter(
                (item) => item.id !== row.original.id
              );
              setEmployees(newData);
            }
          }}
          trigger={<Trash size={18} />}
        ></AppAlertDialog>
      );
    },
  },
];
