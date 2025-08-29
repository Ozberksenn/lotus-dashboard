import {create} from 'zustand';
import { Department } from '@/types/department';
import { Employee } from '@/types/employee';

interface EmployeeState {
    employees : Employee[];
    departments : Department[];
    isLoading: boolean;
    error : string | null;
    setEmployees: (employees: Employee[]) => void;
    setDepartments: (departments: Department[]) => void;
    setLoading : (loading:boolean) => void;
    setError : (error:string | null) => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
    employees: [],
    departments: [],
    isLoading: false,
    error: null,
    setEmployees: (employees) => set({ employees }),
    setDepartments: (departments) => set({ departments }),
    setError: (error) => set({ error:error }),
    setLoading: (loading) => set({ isLoading: loading }),
}));