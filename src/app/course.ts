export interface Course {
    id: number;
    name: string;
    professor: string;
    courseCode: string;
    studentIds: Array<number>;
}