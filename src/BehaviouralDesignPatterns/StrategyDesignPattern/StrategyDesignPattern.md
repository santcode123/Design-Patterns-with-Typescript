#### Strategy design pattern
 Strategy is a behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable
 1.  use this design pattern when we need to change algorithms on run time or want to accomplish the same task in different manner

 I will give an example there we can apply strategy pattern.

 Example: Create a calculater that will accept two number and has four button +, -, *, / for the operation , once user clicks on any of the button show the output based on pressed operation

 Solution without Strategy design patter:

``
class CalculatorApp {
    public doCalculation(){
        const a = parseInt(prompt("Enter the first number:") ||"0");
        const b = parseInt(prompt("Enter the first number:") ||"0");

        const action  = (prompt("Enter operation name") || '+');

        switch(action){
            case '+' : {
                return a+b;
            }
            case '-': {
                return a-b;
            }
            case '*': {
                return a*b;
            }
            default: {
                return a/b;
            }
            
        }

    }
}

function clientCode(){
    const calculator = new CalculatorApp();
    calculator.doCalculation();
}
``

Solution with Strategy design pattern:

``
interface OperationsStrategy {
    execute(a: number, b: number): number;
}

class AddStrategy implements OperationsStrategy{
    execute(a, b){
        return a+b;
    }
} 

class SubtractStrategy implements OperationsStrategy{
    execute(a, b){
        return a-b;
    }
} 

class MultiplyStrategy implements OperationsStrategy{
    execute(a, b){
        return a*b;
    }
} 

class DivideStrategy implements OperationsStrategy{
    execute(a, b){
        return b ? a/b: Infinity;
    }
} 

class BaseCalculator{
    OperationsStrategy strategy;
    
    constructor(OperationsStrategy strategyObj){
        this.strategy = strategyObj;
    }

    runCmd(a, b){
       return this.strategy.execute(a,b);
    }
}



function clientCode(){
     const a = parseInt(prompt("Enter the first number:") ||"0");
     const b = parseInt(prompt("Enter the first number:") ||"0");

     const action  = (prompt("Enter operation name") || '+');

     let calculator =  null;
    
     switch(action){
        case '+': {
            calculator = new BaseCalculator(new AddStrategy());
            break;
        }
        case '-': {
            calculator = new BaseCalculator(new SubtractStrategy());
            break;
        }
        // do rest of the thing
     }

   const ans = calcultor.runCmd(a,b);
}
``


Example 2:

Suppose we have three types of vehicle sports vehicle, normal vehicle, offload vehicle, they have different implementation of drive method, but it might happen two vehicle types can have same implementation, in  future we can add more vehicle variant


```

interface DriveStrategy{
    drive();
}

class  SportsDriveStrategy{
    drive(){
        // implementation for sports drive
    }
}

class NormalDriveStrategy {
    drive(){
        // implementation for normal drive
    }
}

class OffRoadDriveStategy {
    drive(){
        // off road drive strategy
    }
}


class Vehicle {
    private driveStrategy: DriveStrategy;

    constructor(strategy: DriveStrategy){
        this.driveStrategy.drive();
    }
}

class SportsVehicle extends Vehicle(){

    constructor(){
        supur(new SportsDriveStrategy());
    }
}

class OffRoadVehcile extends Vehicle {
    constructor(){
        super(new OffRoadDriveStrategy())
    }
}

```

