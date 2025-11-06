
import { FileSystem } from "./interafces";

export class Folder implements FileSystem {
    public name: string;
    private listOfFiles: FileSystem[];

    constructor(name: string) {
        this.name = name;
        this.listOfFiles = [];
    }

    public add(fileSystem: FileSystem) {
        // handle duplicate directory inside the file system
        this.listOfFiles.push(fileSystem);
    }

    public remove(fileSystem: FileSystem) {
        this.listOfFiles = this.listOfFiles.filter(d => d.name !== fileSystem.name);
    }

    public ls(): void {
        console.log(this.name);

        for (let fileSystem of this.listOfFiles) {
            fileSystem.ls();
        }
    }
}