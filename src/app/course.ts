import { Student } from "./student";

export interface Course {
    id: number;
    name: string;
    professor: string;
    courseCode: string;
    students: Student[];
    grades: Map<Student, number>;
}