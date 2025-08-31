import {create} from 'zustand';
import {Department} from '@/types/department';
import {Employee} from '@/types/employee';

interface EmployeeState {
    employees: Employee[];
    departments: Department[];
    isLoading: boolean;
    error: string | null;
    setEmployees: (employees: Employee[]) => void;
    setDepartments: (departments: Department[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    filters?: {
        email?: string
        department?: string
    }
    setFilters: (filters: { email?: string; department?: string }) => void
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
    employees: [],
    departments: [],
    filters: {
        email: undefined,
        department: undefined
    },
    isLoading: false,
    error: null,
    setEmployees: (employees) => set({employees}),
    setDepartments: (departments) => set({departments}),
    setFilters: (filters) => set({filters}),
    setError: (error) => set({error: error}),
    setLoading: (loading) => set({isLoading: loading}),
}));