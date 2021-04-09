export interface Project {
    id?: string;
    name: string;
    description: string;
    times: Time[];
}

export interface Time {
    id?: string;
    description: string;
    amount: number;
}
