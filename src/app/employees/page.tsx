"use client";

import {useMemo, useState} from "react";
import {MessageCircleWarning} from "lucide-react";
import {useEmployeeStore} from "@/store/employeeState";
import AppSpinner from "@/components/AppSpinner";

import {columns} from "./_components/columns";
import {DataTable} from "./_components/data-table";
import TableHeader from "./_components/TableHeader";

export default function Employees() {
    const {employees, departments, isLoading, error, filters} = useEmployeeStore();

    const filteredData = useMemo(() => {
        return employees.filter((emp) => {
            const emailMatch = filters?.email ? emp.email
                .toLowerCase()
                .includes(filters?.email?.toLowerCase()) : true;

            const depMatch = filters?.department
                ? emp.departmentId === filters.department
                : true;

            return emailMatch && depMatch;
        });
    }, [employees, departments, filters]);

    if (isLoading) return <AppSpinner/>;
    if (error)
        return (
            <div className="flex items-center justify-center h-[90vh]">
                <MessageCircleWarning/>
            </div>
        );

    return (
        <div>
            <TableHeader/>
            <DataTable
                columns={columns(departments)}
                data={filteredData}
            />
        </div>
    );
}
