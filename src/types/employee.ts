export interface Employee {
    id : string,
    firstName : string,
    lastName : string,
    email : string,
    phone : string,
    departmentId : string,
    position : string,
    salary : number,
    startDate : string,
    status : "active" | "inactive",
    avatar? : string,
}