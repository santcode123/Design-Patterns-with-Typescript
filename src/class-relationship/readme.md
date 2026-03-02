### Class Relationships

1. Association: if class A has B and B also has A, is known bidirectional association, also we can write one to many or many to many relationship based on scenarios, if it's directional association then we represents by arrow where arrow points to child class, which means A -> B, A has B, and instance of B does not depend on A

2. Arregation: Association is broader form, in which aggrestion is a subset and represent the relationship between two class as follows, A <>---> B, which means A has B, and instance of B is not controlled by A, it's independent of A, for example take an example of professor and department classes, where professor instance does not dependent of department class, if department has been shutdown (destroyed) we can assign that professor to some other department.


3. composition: composition is little strict and tight coupled relationship, suppose A <filled>----> B, which means A has B and instance of B is tightly coupled with A, if A has been destroyed the automatically B will also get destroyed. For example Room and House are two classes where House has-a relationship with Room, and it's composition because if we destroy House, Rooms will automcatically get destroyed.

4. Dependency Injection: passing a object from constructor is know dependency injection.