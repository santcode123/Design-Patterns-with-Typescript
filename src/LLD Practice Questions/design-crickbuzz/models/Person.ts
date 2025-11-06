

export class Person {
    private name: string;
    private age: number;

    constructor({
        name,
        age
    }: {
        name: string,
        age: number
    }) {
        this.name = name;
        this.age = age;
    }

    public getAge() {
        return this.age;
    }
}