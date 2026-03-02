#### Design TaskManagment system LLD

Requirements
1. user should able to create task and update, delete the task.
2. task can have assigne, status(TODO, INPROGRESS, DONE,CLOSED)
3. we can write comments in the task
4. also we maintain history of an task, when user clicks on task history, we show all chnages done in that task
5. whenever we changes something in task we should inform over gmail or slack
6. user should able to filter tasks based on duedate, assignee, createdBy etc
7. we should also support row text search, show relevant task based on title text
8. we might have multiple tags to one task like: Tech, NonTech, CompanyName etc

Non Functional requirements
1. how you will handle if same user updated task status at same time(concurreny)



Solution:

Doubts: can  user move tkt from TODO to done directly -> no, we can mark done only from in progress state

Okay cool, everything seems good, now we will start from api need to support above requirements

API's endpoints

POST: https://task-managment.com/v1/create-user
payload:{
    userName:string,
    password: string,
    email: string
}

response: {message, userId: string }

POST: /v1/create-task

payload:{
    title: string, // madatory
    description?: string,
    dueDate?: Date,
    assigneeId?: string // optional as in the start we might not assign the assignee or later we might update it later
}

response:{
    taskId: string
    message:"task created successfully"
}

POST: /v1/update-task
payload:{
    taskId: string  // mandatory
    title?: string
    description?: string
    dueDate?: Date
    tags
}

GET: /v1/tasks?userId=4345 & dueDate=432 & priority=defsf;

GET: /v1/history ? taskId=325234;


POST: /v1/comment
payload:{
    taskId,
    text: string
}


Now We will design LLD classes which will fulfills above listed requirements

Note: I will use State and observer, strategy design pattern

Model(entity)

Enum TaskStatus {
    TODO='TODO' 
    INPRORESS='IN-PROGRESS'
    COMPLETED ='COMPLETED'
}

interface StatusState{
    reOpen(task: Task): void;
    startTask(task: Task): void
    done(task: Task): void 
}

class TodoState implements StatusState{
    reOpen(task: Task){
        throw Error('we can not open it as it's already open');
    }
    startTask(task: Task){
        task.setStatus(TaskStatus.INPROGRESS);
    }

    done(task: Task){
        throw new Error('first you need to make it in progess before making done');
    }
}

// similary we will implement other states
class InProgressState{

}
class DoneState {

}

class User{
    id: string;
    name: string;
    email: string;
}

class Comment{
 id: string;
 text: string;
 createdBy: User
 task: Task
}

class Tag {
    id: string;
    createdBy: User;
    tasks: Task[] // one tag can belong to multiple tasks
}

// activity log help us to maintain the history
class ActivityLog {
id: string;
description: string //  we can also keep json if multiple things chnages and want to track old values as well
user: User
task: Task
}

interface Observer{
    notify(event: string){
     // need to implement this method for particular observer
    }
}
class ObserverManager{
    observers: Array<Observer>;
    notify(event: string){
        // iterate throufgh each observer and call notify method
    }
}

class Task {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updateAt: Date;
    dueDate: Date (timestamp)
    createdBy: User
    assignee: User
    comments: Comment[]
    activityLogs: ActivityLog[]
    statusState: StatusState
    observerManager: ObserverManager
    tags: Tag[]

    updateStatus(action: 'reopen' | 'done' | 'start'){
        // based on the current state we need a particular method based on action 
    }

    updateDescription(description: string){
      // whenever we update the description we need to notify the observers that something has been modified

      const newlyActivityLog = new ActivityLog(description, user, this);

      this.updateActivityLog(newlyActivityLog);
    }

    updateActivityLog(newlyAddedActivityLog: ActivityLog){
        this.activityLog.push(newlyAddedActivityLog);
    }

    // similary we can add other methods that we need to support
}

class TaskService {
 tasksCollection: Map<string, Task>
 usersCollection: Map<string, User>

 method createTask({
    createdById,
    title, 
    description,
    dueDate = null
    assigneeId = null
 }){
    const user = usersCollection.get(createdById);
    const assignee = usersCollection.get(assigneeId);

    const newTask = new Task({
        title,
        description,
        dueDate,
        user,
        assignee
    });

    return newTask
 }

 updateTask({
    taskId,
    updatedDescription
    statusAction
 }){
     const task = tasksCollection.get(taskId);

     task.updateDescription(updatedDescription);

     // similarly we can handle other updated section 

     tasksCollection[taskId]= task;

     return task;
 }

 // similary we can implement deleteTask as well
}

class CommentManagmentService{
    private commenstCollection: Map<string, Comment>
    private usersCollection: Map<string, User>
    private tasksCollection: Map<string, Task>

    addComment({
        taskId,
        commentText,
        userId
    }){
        const user = usersCollection.get(userId);
        const task = tasksCollection.get(taskId);

        const newComment = new Comment({
            user,
            task,
            commentText
        })

        commentsCollection.set(newComment.id, newComment);
        return newComment
    }
}

// we need to make a seperate service for searching and filter


interface SearchStategy{
    search(params: Objec): Task[]
}

class SearchService {
    prviate tasksCollection: Map<string, Task>
    private seachStrategy: SearchStategy


    getTaskBasedOnAssignee(assigneeId){
        return tasks.filter(task => task.assignee.assingee.id ===assigneeId);
    }

    getTasksBasedOnQueryParams(params){
        this.searchStategy.search(params)
    }

    setStrategy(newStartegy){
        this.searchStrategy = newStartegy;
    }
}


Now we are almots done with LLD now interview might following question

How you will get history of particular task

Answer: we will be having a history service which will be responsible for fetyching task history or in taskService we can add one 
more method which will be responsible for showing history for a particular service


HLD Section: How we will if two different users update the same task status at the same time
 
 Answer: if there is some time difference between both users action , the latest status will be reflected in task. but
 at the same time it happens then we need tp utilize the optamistic locking while updating the status, if version has been upddate we can rollback, so in that manner one of the transaction will fail.

 We can also think of pessimistic lock but there dead lock situation can arises
