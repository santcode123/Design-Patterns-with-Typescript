
import type { StudentBuilder } from "./builders/Builder";

export class Student {
    rollNumber: number;
    name: string;
    fatherName?: string;
    motherName?: string;
    age?: number;
    address?: string;
    subjects: Array<string>


    constructor(builder: StudentBuilder) {
        this.rollNumber = builder.rollNumber;
        this.name = builder.name;
        this.fatherName = builder.fatherName;
        this.motherName = builder.motherName;
        this.age = builder.age;
        this.address = builder.address;
        this.subjects = builder.subjects;
    }
}