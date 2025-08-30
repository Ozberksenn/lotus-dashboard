import {useEmployeeStore} from "@/store/employeeState";
import api from "@/lib/api";
import {Employee} from "@/types/employee";
import {toast} from "sonner";

export default function useCreateEmployee() {
    const {employees, setEmployees} = useEmployeeStore();

    const createEmployee = async (values: Employee) => {
        try {
            const {data} = await api.post("/employees", values);

            setEmployees([...employees, data]);

            toast.success("Employee successfully added");
        } catch (error) {
            alert(error);
            toast.error("Employee could not be added");
        }
    };

    return {createEmployee};
}
