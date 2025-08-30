import {useEmployeeStore} from "@/store/employeeState";
import api from "@/lib/api";
import {Employee} from "@/types/employee";
import { toast } from "sonner"

export default function useUpdateEmployee() {
    const {employees, setEmployees} = useEmployeeStore();

    const updateEmployee = async (values: Employee) => {
        try {
            const {data} = await api.put(`/employees/${values.id}`, values);

            setEmployees(employees.map((e) => (e.id === data.id ? data : e)));

            toast.success("Employee successfully updated");
        } catch (error) {
            toast.error("Employee could not be updated");
        }
    };

    return {updateEmployee};
}
