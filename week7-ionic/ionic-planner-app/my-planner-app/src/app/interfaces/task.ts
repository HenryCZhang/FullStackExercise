export interface Task {
    id: number;
    description:string;
    name:string;
    date_of_start:Date;
    date_of_end:Date;
    status:string;
    done:boolean;
}
