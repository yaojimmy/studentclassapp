export interface Course {
    id: number;
    name: string;
    professor: string;
    courseCode: string;
    studentIds: Set<number>;
    studentGrades: Map<number, number>;
}