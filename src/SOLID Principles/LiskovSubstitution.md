Introduction:

Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program."

In simpler terms, it means that if a class S is a subclass of class T, then objects of type T should be replaceable with objects of type S without altering the desirable properties of the program (e.g., correctness, task performance, etc.)

Behavior Preservation:

Subclasses should preserve the behavior expected from the base class. They should not override base class methods in a way that changes the expected behavior or contracts.


Example 

``` 
class Bird {
    fly(){
        console.log('some bird is flying...');
    }
}

class Crow extends Bird {
    // override the fly method
    // not violating the Lisko principle
    fly(){
        console.log('crow is flying...'); 
    }
}

class Penguin extends Bird {
    fly(){
        console.log('penguin can not fly'); // not expected behaviour
    }
}

function makeBirdFly(bird: Bird){
    bird.fly();
}

function clientCode(){
    const crow = new Crow();
    makeBirdFly(crow); // crow is flying...
    
    const penguin = new Penguin();
    makeBirdFly(penguin); // penguin can not fly
}

```

Note in above example Penguin is violating the Liskov Substition principle.

Correct approach will be keep Penguin class separate or or make one more class non flying bird.


```
interface FlyingBird {
    fly(): void;
}

class Sparrow implements FlyingBird {
    fly(): void {
        console.log("Sparrow flying...");
    }
}

class Penguin {
    swim(): void {
        console.log("Penguin swimming...");
    }
}


interface FlyingBird {
    fly(): void;
}

class Sparrow implements FlyingBird {
    fly(): void {
        console.log("Sparrow flying...");
    }
}

class Penguin {
    swim(): void {
        console.log("Penguin swimming...");
    }
}

```

