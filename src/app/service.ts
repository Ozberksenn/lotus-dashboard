import api from "@/lib/api";
import { Employee } from "@/types/employee";

export const InitialService = {
    async getEmployees(): Promise<Employee[]> {
        const {data} = await api.get("/employees");
        return data;
    },
    async getDepartments(): Promise<Employee[]> {
        const {data} = await api.get("/departments");
        return data;
    },


}