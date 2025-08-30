"use client";
import { useMemo, useState } from "react";
import { DownloadIcon } from "lucide-react";
import Create from "@/app/employees/_components/Create";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useEmployeeStore } from "@/store/employeeState";

interface TableHeaderProps {
  emailFilter: string;
  setEmailFilter: (value: string) => void;
}
export default function TableHeader({
  emailFilter,
  setEmailFilter,
}: TableHeaderProps) {
  const { employees } = useEmployeeStore();

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
      <Input
        placeholder="Filter Mail"
        value={emailFilter}
        onChange={(e) => setEmailFilter(e.target.value)}
        className="max-w-sm"
      />
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
