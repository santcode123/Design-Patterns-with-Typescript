## In this section we will learn how we handle concurrency control


#### what is critical section
In java or other multi thread language, if we access some shared resources we want to make sure nothing duplication should happen , code which access the shared resources is known critical section, in java we can add lock to avoid race conditions and all

### How to solve concurrency problems 

1.(using syncronized for critical section) we can add lock on critical section, but will it work for distribiuted systems?

Suppose in distributed system we have s1,s2,s3 servers and three requests came at same time then above locking system will not work because each code running in different process and different machine.


2. Distributed concurrency control
  a. optimistic concurrency control (OCC)
  b. pessimistic concurrency control (PCC)

Beofore learning above thing we much be aware of below concepts

1. what is usage of transaction
2. what is db locking
3. what is isolation level.

#### What is transaction 
Transactions help us to achive the integrity and consistency in database.

Example: suppose we want to transfer money from to A to B, and somehow crediting amount to b failed then we need to revert the changes
made in A's database, which is known as rollback in database transaction.


#### What is database locking


Note: We have already covered in the HLD videos