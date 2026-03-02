#### Booking movie ticket application

Fuunctional Requirements

1. A theater has multiple screens(audi), each screen runs a movie for a particular time, shows are run on screens
2. assuming all user are registered and logged in the application
3. once user choose a show and selects the seats for booking then we should start user booking session which means other user will see them  as not available seat.
4. after seat selection user will process for payment failure or success will happen.

5. if payment fails , after certain time or maximum retries we should mark seats available
6. user can search movies by name, city or language etc
7. pricing depens on seat type (primium, normal) (it can highly depend on row and column number as well)



Non functional requirements
1. we should handle concurrency gracefully, two users should not able to book same seat.
2. scalable for millions of users
3. send mail or mobile notifcation for ticket confirmation.

