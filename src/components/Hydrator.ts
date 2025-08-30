"use client";

import {useEffect, useRef} from "react";
import {useEmployeeStore} from "@/store/employeeState";

type Props = {
    employees: any[];
    departments: any[];
};

export default function Hydrator({employees, departments}: Props) {
    const hydrated = useRef(false);
    const {setEmployees, setDepartments, setLoading, setError} = useEmployeeStore();

    useEffect(() => {
        if (hydrated.current) return;
        setLoading(true);
        try {
            setEmployees(employees);
            setDepartments(departments);
            setError(null);
        } catch (e: any) {
            setError(e?.message ?? "Unknown error");
        } finally {
            setLoading(false);
            hydrated.current = true;
        }
    }, [employees, departments, setEmployees, setDepartments, setLoading, setError]);

    return null;
}