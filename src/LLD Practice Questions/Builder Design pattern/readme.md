#### Builder Design Pattern

Description: Suppose we have a student class, in the student class many properties are optional and we want to gererate instance of student.how we can achieve this

Note: in typescript these things can be achieved throgh construction as well but in java and c++ we do not destructuring concept so we left construction overload option which is not extensible if many properties are optional

constrcution overload:

constructor(p1,p2)

constructor(p1,p3,p3).

...

many more, so this solution is not extensible and practicle