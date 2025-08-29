import api from "@/lib/api";
import { Employee } from "@/types/employee";

export const employeeService = {
    async createEmployee() : Promise<Employee> {
        const {data} = await api.post("/employees");
        return data;
    }
}