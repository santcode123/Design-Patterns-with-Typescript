import { StudentBuilder } from "./Builder";

export class EngineeringStudentBuilder extends StudentBuilder {
    public addSubjects(): void {
        this.subjects = ['math', 'science'];
    }
}