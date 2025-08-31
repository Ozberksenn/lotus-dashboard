import {useMemo} from "react";

import {useEmployeeStore} from "@/store/employeeState";
import {InputSelect, InputSelectTrigger} from "@/components/InputSelect";

export default function DepartmentSelect({value, onChange}: { value?: string; onChange?: (value: string) => void }) {
    const {departments} = useEmployeeStore();

    const options = useMemo(() => departments.map(department => ({
        value: department.id,
        label: department.name,
    })), [departments]);

    return (
        <>
            <InputSelect
                options={options}
                value={value}
                onValueChange={(v) => onChange?.(v)}
                clearable
            >
                {(provided) => <InputSelectTrigger {...provided} />}
            </InputSelect>
        </>

    )
}