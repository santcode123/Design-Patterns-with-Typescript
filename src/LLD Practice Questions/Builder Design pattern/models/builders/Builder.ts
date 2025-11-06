import { Student } from "../Student";



export abstract class StudentBuilder {
    rollNumber: number;
    name: string;
    fatherName?: string;
    motherName?: string;
    age?: number;
    address?: string;
    subjects: Array<string>;

    constructor({ rollNumber, name }: { rollNumber: number; name: string }) {
        this.rollNumber = rollNumber;
        this.name = name;

        // let's keep default value empty string  or zero in case of number
        this.fatherName = '';
        this.motherName = '';
        this.age = 0;
        this.address = '';
        this.subjects = [];
    }

    public setFatherName(fatherName: string) {
        this.fatherName = fatherName;

        return this;
    }

    public setMotherName(motherName: string) {
        this.motherName = motherName;
    }

    public setAge(age: number) {
        this.age = age;
    }
    public setAddress(address: string) {
        this.address = address;
    }

    public build() {
        return new Student(this);
    }

    public abstract addSubjects(): void;

}