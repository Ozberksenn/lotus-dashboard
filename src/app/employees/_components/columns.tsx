"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Employee} from "@/types/employee";
import {ColumnDef} from "@tanstack/react-table";
import {GripVertical, Mail, Phone} from "lucide-react";
import {Department} from "@/types/department";
import Delete from "@/app/employees/_components/Delete";
import Edit from "@/app/employees/_components/Edit";
import useHelpers from "@/helpers/useHelpers";

export const columns = (departments: Department[]): ColumnDef<Employee>[] => {
    const {formatDate, formatPrice, formatFullName, formatAvatarFallback} = useHelpers()

    return [
        {
            id: "drag",
            header: "",
            cell: () => (
                <Button variant="ghost" size="icon" className="cursor-grab active:cursor-grabbing">
                    <GripVertical className="h-4 w-4"/>
                </Button>
            ),
            meta: {dndHandle: true},
            size: 36,
            minSize: 36,
            maxSize: 48,
        },
        {
            accessorKey: "avatar",
            header: "Avatar",
            cell: ({row, getValue}) => (
                <div>
                    <Avatar>
                        <AvatarImage src={String(getValue())}/>
                        <AvatarFallback>
                            {formatAvatarFallback({
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
            accessorFn: (row) => formatFullName(row.firstName, row.lastName),
            cell: ({getValue}) => (
                <div className="font-medium">{String(getValue())}</div>
            ),
            size: 220,
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({getValue}) => (
                <div className="flex gap-1 items-center">
                    <Mail size={16}/>
                    <h5>{String(getValue())}</h5>
                </div>
            ),
        },
        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({getValue}) => (
                <div className="flex gap-1 items-center">
                    <Phone size={16}/>
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
            cell: ({getValue}) => formatPrice(Number(getValue())),
        },
        {
            accessorKey: "startDate",
            header: "Start Date",
            cell: ({getValue}) => <Button variant="secondary">{formatDate(String(getValue()))}</Button>
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({getValue}) =>
                getValue() == "active" ? (
                    <Button>Active</Button>
                ) : (
                    <Button variant="destructive">Passive</Button>
                ),
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({row}) => (
                <div className="flex flex-row gap-2">
                    <Edit employee={row.original}/>
                    <Delete id={row.original.id}/>
                </div>
            ),
        },
    ]
};
