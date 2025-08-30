import {useEmployeeStore} from "@/store/employeeState";
import api from "@/lib/api";
import {toast} from "sonner";

export default function useDeleteEmployee() {
    const {employees, setEmployees} = useEmployeeStore();

    const deleteEmployee = async (id: string) => {
        try {
            await api.delete(`/employees/${id}`);

            setEmployees(employees.filter((employee) => employee.id !== id));

            toast.success("Employee successfully deleted");
        } catch (error) {
            toast.error("Employee could not be deleted");
        }
    };

    return {deleteEmployee};
}
