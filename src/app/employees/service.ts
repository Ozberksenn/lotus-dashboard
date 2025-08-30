import api from "@/lib/api";
import { Employee } from "@/types/employee";

export const employeeService = {
    async createEmployee(values:Employee) : Promise<Employee> {
        const {data} = await api.post("/employees", values);
        return data;
    },

    async deleteEmployee(id : string) : Promise<Employee> {
        const {data} = await api.delete("/employees", {data: {id}});
        return data;
    }
}