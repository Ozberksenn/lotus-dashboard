import { Loader2Icon } from "lucide-react";

export default function AppSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2Icon className="animate-spin h-10 w-10 text-blue-500" />
    </div>
  );
}
