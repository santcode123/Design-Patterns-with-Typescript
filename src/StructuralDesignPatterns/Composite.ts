// abstract class CommonComponent {
//     protected parent: CommonComponent | null;

//     constructor() {
//         this.parent = null;
//     }

//     public setParent(parent: CommonComponent | null) {
//         this.parent = parent;
//     }

//     public getParent() {
//         return this.parent;
//     }
//     public addComponent(component: CommonComponent): void {
//         // override in the child classes
//     }

//     public removeComponent(component: CommonComponent) {
//         // override it in the child component
//     }

//     public isComposite(): boolean {
//         return false;
//     }

//     public abstract someOperation(): string;
// }

// class Leaf extends CommonComponent {
//     public someOperation(): string {
//         return 'Leaf node';
//     }
// }

// class CompositeClass extends CommonComponent {
//     protected childComponents: CommonComponent[] = [];

//     public addComponent(component: CommonComponent): void {
//         this.childComponents.push(component);
//     }

//     public removeComponent(component: CommonComponent): void {
//         const indexOfComponent = this.childComponents.indexOf(component);
//         if (indexOfComponent > -1) {
//             this.childComponents.splice(indexOfComponent, 1);
//         }
//     }
//     public isComposite(): boolean {
//         return true;
//     }
//     public someOperation(): string {
//         const result = [];
//         for (let child of this.childComponents) {
//             result.push(child.someOperation());
//         }

//         return `Branch ${result.join('+')}`;
//     }
// }


// function clientCode(component: CommonComponent) {
//     const result = component.someOperation();
//     console.log(result);
// }

// // only leaf node
// const leafNode = new Leaf();
// clientCode(leafNode);

// // composite node use case

// const leafNode1 = new Leaf();
// const leafNode2 = new Leaf();
// const compositeComp = new CompositeClass();
// compositeComp.addComponent(leafNode1);
// compositeComp.addComponent(leafNode2);
// clientCode(compositeComp);


// Shreyansh jain yt video 
/**
 * any problem that can be represented in tree form can be solved via composite design pattern, for 
 * example
 * example1: we have ordered a drawing box and note book on amazon, they suppose sent you a large box in which 
 * they have two box , one contains a note book and another contain a scale and again contain small which has every drawing items, if you want to 
 * calculate the cost of original box, you can adapat composite design pattern to achieve that
 * 
 */
/**
 * File System Problem solved via Composite design pattern: we want to implement ls method for each file or folder to know their path
 */

interface FileSystem1 {
    name: string;
    ls(parentDir: string): void;
}

class FileChild implements FileSystem1 {
    name: string;
    constructor(fileName: string) {
        this.name = fileName;
    }
    ls(parentDir: string): void {
        return console.log(`${parentDir}/${this.name}`);
    }
}

class Directory implements FileSystem1 {
    name: string;
    private listOfFileSystems: FileSystem1[] = [];

    constructor({ dirName }: { dirName: string }) {
        this.name = dirName;
    }
    public addDir(dir: FileSystem1) {
        this.listOfFileSystems.push(dir);
    }
    public removeDir(dir: FileSystem1) {
        this.listOfFileSystems = this.listOfFileSystems.filter(data => data.name !== dir.name)
    }
    ls(parentDir: string): void {
        const currentDirPath = `${parentDir}/${this.name}`;
        console.log(currentDirPath);
        const allFileSystems = this.listOfFileSystems;
        for (const obj of allFileSystems) {
            obj.ls(currentDirPath);
        }
    }
}

function mainFun() {
    // clreate a file structure like below

    /**
     *  |->user
     *      |-> movies
     *           |-> three idiots
     *      |->games
     *         |-> snakes
     *         |-> hidden games
     *               |-> cs go
     *   
     */
    const cgGoGame = new FileChild('cs go');
    const snakeGame = new FileChild('snakes');
    const hiddenGamesDir = new Directory({ dirName: 'hidden games' });
    hiddenGamesDir.addDir(snakeGame);

    const gamesDir = new Directory({ dirName: 'games' });
    gamesDir.addDir(hiddenGamesDir);
    gamesDir.addDir(snakeGame);

    const moviesDir = new Directory({ dirName: 'movies' });
    const threeIdiotMovie = new FileChild('there idiots');
    moviesDir.addDir(threeIdiotMovie);

    const userDir = new Directory({ dirName: 'user' });
    userDir.addDir(moviesDir);
    userDir.addDir(gamesDir);

    userDir.ls('/');
}