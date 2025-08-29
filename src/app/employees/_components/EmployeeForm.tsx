
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";



export const EmployeeForm = () => {
    const form = useForm();
    const onSubmit = () => {}
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-row gap-2">
                                <div className="flex flex-col gap-2">
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2">
                                <div className="flex flex-col gap-2">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                </div>
                               
                            </div>
                            <FormLabel>Department</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormLabel>Salary</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                             <FormLabel>Start Date</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormLabel>Team</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                        </FormItem>
                        
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}