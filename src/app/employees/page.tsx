"use client";
import { useState } from "react";
import { useEmployeeStore } from "@/store/employeeState";
import { columns } from "./columns";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { AppSheet } from "./_components/AppSheet";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { AppSpinner } from "@/components/AppSpinner";
import { DownloadIcon, MessageCircleWarning, Plus } from "lucide-react";

export default function Management() {
  const [open, setOpen] = useState<boolean>(false);
  const { employees, departments, isLoading, error } = useEmployeeStore();

  const handleClose = () => setOpen(false);

  function handleExportExcellButton() {
    const worksheet = XLSX.utils.json_to_sheet(employees); // burada employees tablosundaki verileri excel formatına çeviriyor.
    const workbook = XLSX.utils.book_new(); // excell dosyası oluşturuyoruz.
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees"); // oluşturduğumuz excell dosyasına worksheet ekliyoruz.

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    }); // formatlıyoruz array byte tutuyor bunu bloba a çevireceğiz.
    const data = new Blob([excelBuffer], { type: "application/octet-stream" }); // bloba çeviriyoruz.
    saveAs(data, "employees.xlsx"); // indirilebilir hale getiriyoruz.
  }
  if (isLoading) return <AppSpinner />;
  if (error) return <MessageCircleWarning />;
  return (
    <div>
      <div className="flex justify-between mb-2">
        <Input
          placeholder="Filter Mail"
          // value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          // onChange={(event) =>
          //   table.getColumn("email")?.setFilterValue(event.target.value)
          // }
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button onClick={handleExportExcellButton}>
            <DownloadIcon />
            Excell
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button>
                <Plus />
                Add Employee
              </Button>
            </SheetTrigger>
            <AppSheet onSuccess={handleClose} />
          </Sheet>
        </div>
      </div>
      <DataTable columns={columns(departments)} data={employees} />
    </div>
  );
}
