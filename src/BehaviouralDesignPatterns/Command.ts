/**
 * Command Design Pattern: The pattern states that UI should not interact the business logic directly, instead we we need to have mediator that
 * will stay in middle of UI and Business logic, UI will interact that middle man that is known a Command.
 *
 * When and where to use this pattern: suppose we want to implement a text editor from there you can copy the text from copy button , context menu and control+c
 * but business logic will be same for all of them , so we need to create a CopyCommand that will handle this operation and from all those three
 * places we can call CopyCommand execute method.
 */


// Example

interface Command {
    execute(): void;
}

class SimpleCommand implements Command {
    private payload: string;
    constructor(payload: string) {
        this.payload = payload;
    }
    execute(): void {
        console.log("this is a simple command that we are executing..");
    }
}

class ComplexCommand implements Command {
    private receiver: Receiver;
    private message: string
    constructor(receiver: Receiver, message: string) {
        this.receiver = receiver;
        this.message = message;
    }

    execute(): void {
        if (this.receiver) {
            this.receiver.sendMessage(this.message);
        }
    }
}

// Receiver contains the business logic
class Receiver {
    sendMessage(message: string) {
        console.log("exxecuting some business logic ")
    }
}


function testing() {
    // client code
    const command1 = new SimpleCommand('nothing');
    command1.execute();

    // command 2
    const command2 = new ComplexCommand(new Receiver(), 'hi how are you');
    command2.execute();
}


/**
 * with the help of command pattern we can implement redo and undo functionality, let's try to implement undo and redo
 * functionality for wordEditor
 * client -> invoker -> command -> receiver
 */

class TextEditor {
    private text: string;

    constructor() {
        this.text = ''
    }

    public addText(newText: string) {
        this.text = this.text + newText;
    }

    public removeText(text: string) {
        this.text.replace(text, "");
    }
}


interface ICommand {
    execute(): boolean;
    undo(): boolean;
}

class TypeCommand implements ICommand {
    private textEditor: TextEditor;
    private text: string;

    constructor(text: string, textEditor: TextEditor) {
        this.text = text;
        this.textEditor = textEditor;
    }

    execute(): boolean {
        this.textEditor.addText(this.text);
        return true;
    }

    undo(): boolean {
        this.textEditor.removeText(this.text);
        return true;
    }
}

class CommondController {
    private undoCommandsStack: Array<Command>;
    private commond: Command;

    constructor(cmd: Command) {
        this.undoCommandsStack = [];
        this.commond = cmd;
    }

    public setCommond(cmd: Command) {
        this.commond = cmd;
    }

    execute(text: string) {
        this.commond.execute();
        this.undoCommandsStack.push(this.commond);
    }

    undo() {
        const prevCmd = this.undoCommandsStack.at(-1);
        this.undoCommandsStack.pop();
        prevCmd?.execute();
    }
}


