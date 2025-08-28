import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Employee } from "@/types/employee";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppSheet } from "./_components/AppSheet";

async function getData(): Promise<Employee[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      firstName: "John",
      lastName: "Doe",
      email: "test@gmail.com",
      phone: "123-456-7890",
      department: "Engineering",
      position: "Software Engineer",
      salary: 90000,
      startDate: "2025-01-01",
      status: "active",
      avatar: "https://i.pravatar.cc/150?img=1",
      teamId: "team1",
    },
  ];
}
export default async function Management() {
  const data = await getData();
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div></div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus />
              Add Employee
            </Button>
          </SheetTrigger>
          <AppSheet />
        </Sheet>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
