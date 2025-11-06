import { FileSystem } from "./interafces";

export class File implements FileSystem {
    public name: string;


    constructor(name: string) {
        this.name = name;
    }

    public ls() {
        console.log(this.name);
    }
}