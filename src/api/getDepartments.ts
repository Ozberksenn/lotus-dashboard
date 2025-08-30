import {Employee} from "@/types/employee";
import api from "@/lib/api";

export async function getDepartments(): Promise<Employee[]> {
    const {data} = await api.get("/departments");
    return data;
}
