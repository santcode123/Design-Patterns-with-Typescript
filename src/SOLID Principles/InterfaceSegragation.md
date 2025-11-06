#### Interface segregation principle

Definition: the ISP states that class should not be forced to implement interface it does not use, instead of having large monolithic interface we should split into smaller interface and more specific, each interface servers different purpose.

```
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

class HumanWorker implements Workable, Eatable {
  work() {
    console.log("Working...");
  }
  
  eat() {
    console.log("Eating...");
  }
}

class RobotWorker implements Workable {
  work() {
    console.log("Robot is working...");
  }
}

```s