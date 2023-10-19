export interface Student {
    id: number;
    name: string;
    email: string;
    phone: string;
    studentCode: string;
    courseIds: Set<number>;
}