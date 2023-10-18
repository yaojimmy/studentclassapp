export interface Course {
    id: number;
    name: string;
    professor: string;
    courseCode: string;
    students: Set<number>;
    grades: Map<number, number>;
}