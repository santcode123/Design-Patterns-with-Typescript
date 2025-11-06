#### OOPS Concepts

1. Encapsulation: in oops concepts encapsulation means hiding the proptery or methods from outer worlds that not need to be shared, we can use private or protected keys to hide them from their instance, from their instance you can not access those encapsulated details.

using encapsulation concepts class works as a signle unit, all methods and properties works together as unit.

Note: Encapsulation is not about hiding the properies it allows the properties access through getter and setting in a controlled 
manner. we can put many condition on getter and setter as per our requirements
```
// Encapsulation using private modifier

class Employee {
    // Private fields (encapsulated data)
    private int id;
    private String name;

    // Setter methods 
    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter methods
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}

public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee();
        
        // Using setters
        emp.setId(101);
        emp.setName("Geek");

        // Using getters
        System.out.println("Employee ID: " + emp.getId());
        System.out.println("Employee Name: " + emp.getName());
    }
}

```

2. Inheritance:  we can inherit the properties or methods from the base or parent class using inheritance concepts, it helps us to reduce code duplication and change the bahaviour as per child class implementation. note that private properties or methods are not inherited.

 Inheritance is also known as "is-a" relationship


 code example:


 ```

 // Superclass (Parent)
class Animal {
    void eat() {
        System.out.println("Animal is eating...");
    }

    void sleep() {
        System.out.println("Animal is sleeping...");
    }
}

// Subclass (Child) - Inherits from Animal
class Dog extends Animal {
    void bark() {
        System.out.println("Dog is barking!");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();

        // Inherited methods (from Animal)
        myDog.eat();    
        myDog.sleep();  

        // Child class method
        myDog.bark();   
    }
}

```

3. Polymorphism (many form): there are two type of polymorphism , one is method overriding and method overloading, c++, java supports both form of polymorphism but js supports only method overriding.

method overloading(compile time): we can define same name methods but with defferent arguments then it picks method based how based on params

Method overriding: child class can override the parent method and different child classes can have different implementation for the same method.


code example:


```


// Java Program to Demonstrate
// Method Overloading and Overriding

// Parent Class
class Parent {
    // Overloaded method (compile-time polymorphism)
    public void func() {
        System.out.println("Parent.func()");
    }

    // Overloaded method (same name, different parameter)
    public void func(int a) {
        System.out.println("Parent.func(int): " + a);
    }
}

// Child Class
class Child extends Parent {
    // Overrides Parent.func(int) (runtime polymorphism)
    @Override
    public void func(int a) {
        System.out.println("Child.func(int): " + a);
    }
}

public class Main {
    public static void main(String[] args) {
        Parent parent = new Parent();
        Child child = new Child();
        // Dynamic dispatch
        Parent polymorphicObj = new Child();  

        // Method Overloading (compile-time)
        parent.func();       
        parent.func(10);    

        // Method Overriding (runtime)
        child.func(20);     

        // Polymorphism in action
        polymorphicObj.func(30);  
    }
}

```



4. Abstraction: We define an interface or abstract class which defines the essentials method or properties that needs to be implementated

Example

```

// Abstract class representing a Vehicle (hiding implementation details)
abstract class Vehicle {
    // Abstract methods (what it can do)
    abstract void accelerate();
    abstract void brake();
    
    // Concrete method (common to all vehicles)
    void startEngine() {
        System.out.println("Engine started!");
    }
}

// Concrete implementation (hidden details)
class Car extends Vehicle {
    @Override
    void accelerate() {
        System.out.println("Car: Pressing gas pedal...");
        // Hidden complex logic: fuel injection, gear shifting, etc.
    }
    
    @Override
    void brake() {
        System.out.println("Car: Applying brakes...");
        // Hidden logic: hydraulic pressure, brake pads, etc.
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle myCar = new Car();
        myCar.startEngine();  
        myCar.accelerate();   
        myCar.brake();        
    }
}


```
