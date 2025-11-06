import { StudentBuilder } from "./Builder";


export class ManagementStudentBuilder extends StudentBuilder {
    public addSubjects(): void {
        this.subjects = ['English', 'Finance']
    }
}