import { Trash } from "lucide-react";
import AppAlertDialog from "@/components/AppAlertDialog";
import useDeleteEmployee from "@/api/useDeleteEmployee";

export default function Delete({ id }: { id: string }) {
  const { deleteEmployee } = useDeleteEmployee();

  const handleDelete = async () => {
    if (!id) return;
    await deleteEmployee(id);
  };

  return (
    <AppAlertDialog
      title="Are you absolutely sure?"
      description="This process will delete the relevant employee. Are you still sure?"
      onConfirm={handleDelete}
      trigger={<Trash size={18} />}
    />
  );
}
