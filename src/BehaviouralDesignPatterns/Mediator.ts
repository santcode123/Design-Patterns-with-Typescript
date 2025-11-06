/**
 * Mediator Design Pattern: This design pattern is used two objects interact and we want a mediator in between because we do not want to tightly couped
 * the individuals objects
 * Example: Let's give an example for mediator design pattern
 */
// q: what is Mediator?


interface Mediator {
    notify(sender: Object, event: string): void
}

class ConcreteMediator implements Mediator {
    private component1: Component1;
    private component2: Component2;

    constructor(comp1: Component1, comp2: Component2) {
        this.component1 = comp1;
        this.component2 = comp2;
    }
    notify(sender: Object, event: string): void {
        if (event === 'A') {
            console.log('Mediator reacts on A and triggers following operations:');
            this.component2.doC();
        }

        if (event === 'D') {
            console.log('Mediator reacts on D and triggers following operations:');
            this.component1.doB();
            this.component2.doC();
        }
    }
}


class BaseComponent {
    protected mediator: Mediator;

    constructor(mediator?: Mediator) {
        this.mediator = mediator!;
    }

    public setMediator(mediator: Mediator) {
        this.mediator = mediator;
    }
}

class Component1 extends BaseComponent {
    doA() {
        console.log("Component 1 does A");
        this.mediator.notify(this, 'A');
    }

    doB() {
        console.log("Component 1 does B");
        this.mediator.notify(this, 'B');
    }
}

class Component2 extends BaseComponent {
    doC() {
        console.log('Component 2 does C');
        this.mediator.notify(this, 'C');
    }
    public doD(): void {
        console.log('Component 2 does D.');
        this.mediator.notify(this, 'D');
    }
}

/**
 * The client code.
 */
const c1 = new Component1();
const c2 = new Component2();
const mediator = new ConcreteMediator(c1, c2);

console.log('Client triggers operation A.');
c1.doA();

console.log('');
console.log('Client triggers operation D.');
c2.doD();