import React from "react";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Employee} from "@/types/employee";
import {useEmployeeStore} from "@/store/employeeState";
import DatePickerField from "./DatePicker";
import ImageUpload from "@/components/ImageUpload";
import {zodResolver} from "@hookform/resolvers/zod";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {PhoneInput} from "@/components/ui/phone-input";
import DepartmentSelect from "@/app/employees/_components/DepartmentSelect";

const formSchema = z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().email("Format must be email"),
    phone: z.string(),
    status: z.string(),
    departmentId: z.string(),
    position: z.string().optional(),
    salary: z.number().min(15000, 'Salary must be min 15.000'),
    startDate: z
        .string()
        .refine((val) => {
            const date = new Date(val);
            return !isNaN(date.getTime());
        }, "Date must be valid")
        .refine((val) => {
            const date = new Date(val);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date <= today;
        }, "Date cannot be later than today "),
    avatar: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
    initialValues: Employee;
    onSubmit: (values: Employee) => Promise<void>;
}

export default function EmployeeForm(props: Props) {
    const {onSubmit, initialValues} = props;

    const {departments} = useEmployeeStore();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    });

    const handleSubmit = async (values: FormValues) => {
        if (typeof onSubmit === "function") {
            await onSubmit(values as Employee);
            // form.reset();
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                First Name<span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Last Name<span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Email<span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <PhoneInput {...field} defaultCountry="TR"/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="departmentId"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Department<span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <DepartmentSelect value={field.value} onChange={field.onChange}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="position"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="salary"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Salary<span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => {
                                        return field.onChange(Number(e.target.value))
                                    }}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="startDate"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Start Date<span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <DatePickerField
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({field}) => (
                        <FormItem className="">
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-row"
                                >
                                    <FormItem className="flex">
                                        <FormControl>
                                            <RadioGroupItem value="active"/>
                                        </FormControl>
                                        <FormLabel className="font-normal">Active</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex">
                                        <FormControl>
                                            <RadioGroupItem value="inactive"/>
                                        </FormControl>
                                        <FormLabel className="font-normal">Inactive</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="avatar"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Avatar</FormLabel>
                            <FormControl>
                                <ImageUpload value={field.value} onChange={field.onChange}/>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full mt-4">
                    Submit
                </Button>
            </form>
        </Form>
    );
}
