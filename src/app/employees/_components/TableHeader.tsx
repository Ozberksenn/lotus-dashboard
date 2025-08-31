import { DownloadIcon } from "lucide-react";
import Create from "@/app/employees/_components/Create";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useEmployeeStore } from "@/store/employeeState";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

interface TableHeaderProps {
  depFilter: string;
  setDepFilter: (value: string) => void;
  emailFilter: string;
  setEmailFilter: (value: string) => void;
}
export default function TableHeader({
  depFilter,
  setDepFilter,
  emailFilter,
  setEmailFilter,
}: TableHeaderProps) {
  const { employees, departments } = useEmployeeStore();

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

  return (
    <div className="flex justify-between mb-2">
      <div className="flex gap-2">
        <Input
          placeholder="Filter Mail"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {" "}
              {depFilter
                ? departments.find((d) => d.name === depFilter)?.name
                : "Department"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={depFilter}
              onValueChange={setDepFilter}
            >
              {departments.map((item) => (
                <DropdownMenuRadioItem key={item.id} value={item.name}>
                  {item.name}
                </DropdownMenuRadioItem>
              ))}
              <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleExportExcellButton}>
          <DownloadIcon />
          Excell
        </Button>
        <Create />
      </div>
    </div>
  );
}
