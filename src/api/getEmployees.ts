import {Employee} from "@/types/employee";
import api from "@/lib/api";

export async function getEmployees(): Promise<Employee[]> {
    const {data} = await api.get("/employees");
    return data;
}
