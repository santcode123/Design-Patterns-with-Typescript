import { Folder } from "./Folder";
import { File } from './File'



function demo() {
    // please construct below file structure and test ls method

    const folder1 = new Folder('folder1');

    const folder2 = new Folder('folder2');

    const folder3 = new Folder('folder3');

    const file1 = new File('file1');

    const file2 = new File('file2');

    folder1.add(folder2);
    folder1.add(file1);
    folder2.add(folder3);

    folder3.add(file2);

    folder3.ls();

}

demo();