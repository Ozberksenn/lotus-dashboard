import api from "@/lib/api";
import { Department } from "@/types/department";
import { Employee } from "@/types/employee";

export const InitialService = {
    async getEmployees(): Promise<Employee[]> {
        const {data} = await api.get("/employees");
        return data;
    },
    async getDepartments(): Promise<Department[]> {
        const {data} = await api.get("/departments");
        return data;
    },


}