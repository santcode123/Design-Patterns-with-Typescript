//FlyWeight patterns

// This pattern is not that much important but you can refer the contents 
("https://refactoring.guru/design-patterns/flyweight")


// ##### Taught by Shreyansh Jain

/*
How do you create objects in the game?
  1. the  is to create the humnaoid and dog robots, each can move, and represented by x, y coordinates.
**/


interface IRobot {
    display(x: number, y: number): void;
    speak(): void;
}

class HumanoidRobotFlyWeight implements IRobot {

    private type: string;
    private Sprite: Object; // bitmap image to represent the robot

    constructor(type: string, sprite: Object) {
        this.type = type;
        this.Sprite = sprite; // load the bitmap image
    }
    speak(): void {
        console.log(`I am a ${this.type} robot`);
    }

    display(x: number, y: number): void {
        console.log(`Displaying ${this.type} at (${x}, ${y})`);
    }

}

class DogRobotFlyWeight implements IRobot {
    private type: string;
    private Sprite: Object; // bitmap image to represent the robot

    constructor(type: string, sprite: Object) {
        this.type = type;
        this.Sprite = sprite; // load the bitmap image
    }

    display(x: number, y: number): void {
        console.log(`Displaying ${this.type} at (${x}, ${y})`);
    }
    speak(): void {
        console.log(`Barcking...`);
    }
}

class RobotFactory {
    private static robotMap: Map<string, IRobot> = new Map<string, IRobot>();

    public static getRobot(type: string): IRobot {
        let robot: IRobot | undefined = this.robotMap.get(type);
        if (!robot) {
            if (type === 'humanoid') {
                robot = new HumanoidRobotFlyWeight(type, {});
            } else if (type === 'dog') {
                robot = new DogRobotFlyWeight(type, {});
            }
            this.robotMap.set(type, robot!);
        }

        return robot!;
    }
}

function main() {
    const robot1 = RobotFactory.getRobot('humanoid');
    const robot2 = RobotFactory.getRobot('dog');
    const robot3 = RobotFactory.getRobot('humanoid');
    const robot4 = RobotFactory.getRobot('dog');

    robot1.display(10, 20);
    robot2.display(30, 40);
    robot3.display(50, 60);
    robot4.display(70, 80);

    console.log(robot1 === robot3); // true
    console.log(robot2 === robot4); // true
}


// one more example which can be solved using flyweight design pattern

/**
 * Example: suppose we have to implement word processer where we can write text, how you will manage memory efficiently
 */

interface IWordFlyWeight {
    display(x: number, y: number): void
}

class CharacterFlyWeight implements IWordFlyWeight {
    private char: string;  // intrinsic properties
    private fontWeight: number;
    private fontSize: number;

    constructor({ char, fontSize, fontWeight }: { char: string; fontWeight: number; fontSize: number }) {
        console.log(`object created for ${char}`);
        this.char = char;
        this.fontSize = fontSize;
        this.fontWeight = fontWeight;
    }

    public display(x: number, y: number): void {
        // pain the character on given coordinates
        console.log(`${this.char}:${x}, ${y}`);
    }
}


class CharFactory {
    private charCache: Map<string, CharacterFlyWeight>;


    constructor() {
        this.charCache = new Map();
    }

    public getCharacter(char: string) {
        if (!this.charCache.has(char)) {
            const charObj = new CharacterFlyWeight({ char, fontSize: 1, fontWeight: 100 });
            this.charCache.set(char, charObj);
        }
        return this.charCache.get(char);
    }
}

function wordProcessorDemo() {
    const text = 'swsaaygys';
    const wordFactory = new CharFactory();

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charObj = wordFactory.getCharacter(char);
        // charObj can be used to display the char on given coordinate
    }
}

