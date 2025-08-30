import api from "@/lib/api";
import { Employee } from "@/types/employee";

export const employeeService = {
    async createEmployee(values:Employee) {
        try {
            const {data} = await api.post("/employees", values);
            return data;
        } catch (error) {
            alert(error);
            return null;
        }
    },

    async updateEmployee(values:Employee) {
        const {data} = await api.put(`/employees/${values.id}`, values);
        return data;
    },

    async deleteEmployee(id : string){
        try {
            const { data } = await api.delete(`/employees/${id}`); 
            return data;
        } catch (error) {
            alert("Employee could not be deleted"); // todo : shadcn alert ekle.
            return null;
        }
    }
}