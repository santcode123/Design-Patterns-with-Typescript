#### Visitor Design Pattern

Definition: Suppose in one class we want to add some functionality , we might endup adding more functionality based on business requirements, so we are changing the classes which might impact the already production running code, to avoid that we are going to use the visitor pattern which uses two dispatch actions.

Example: Suppose we have a class HotelRoom, in which we want to support getPrice, sanitize, decorate etc functionality in that room. we can utilize the visitor design pattern to solve the problem.
