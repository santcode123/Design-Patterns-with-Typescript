#### Design Stack Overflow

Functional Requirements
1. user should able to register to stack overflow 
2. user should able to post question, answers and comments
3. user can upvote or downvote any answer or questions
4. each question and answer can have multiple comments
5. when some one uplvote your answer or question then my reputation score should increase
6. question creater can mark any answer as accepted.

Non functional requirements
1. we should build a system which can support millions of users, and system should be read heavy
2. concurrency control (resolve conflicts)

Solution:

Doubts:
1. should we support nested comments -> No (out of scope)
2. should we allow questions, answer delection -> No(out of scope)

Now we are clear in the requirements section so let's first indentify entity and then try to build class diagrams

API's endpoints required for given requirements

1. create user: 
end point: /v1/create-user
method: post
payload: {userName, password, age, email}
response: {userId: string}

2. create question
end point: /v1/create-question
method: post
payload: {title, tags, description }
response: {success: boolean, questionId }

3. create answer
end point: /v1/create-answer
method: post
payload: {questionId, text}
response: {qnswerId}

4. create comments
end point: /v1/create-comment
method: post
payload: {type: question or answer, parentId: question id or answer id, text}
response: {comment id}

5. upvote/downvote
endpoint: /v1/vote
method: post
payload: {type: upvote or downvote, parentId: question or answer id, parentType: question or answer}
response:{success}

Now we have discussed the api end point which we need to develop to support all functional requirements

Entities: all the core objecs or class we need to build above system

Lists of entity: user, question, answer, comment, tag, vote

enum UserEvent {
    ANSWER_UPVOTE,
    ANSWER_DOWNVOTE,
    QUESTION_UPVOTE,
    QUESTION_DOWNVOTE
}

interface PostObserver {
    handleEvent(event: UserEvent){
        // we will do something on user events like upvote or downvote or somthing else
    }
}

class ReputationObserver implements PostObserver {
    user: User;
    handleEvent(event: Event){
        // increment value is decided based on event type
      user.increaseRepuation(incrementValue);
    }
}

class User {
    userId,
    name,
    email,
    password,
    reputationScore
}

class Tag {
    tagId,
    tagName
}


class Comment {
    commentId: string,
    text: string,
    user: User,
    parent: Question | Answer
}

class Answer {
    answerId: string,
    text: string,
    user: User,
    question: Question,
    comments: Array<Comment>
    listOfObservers: Array<PostObserver>
    userVotes: Array<Vote>
    triggerReputationEvent(event){
        this.listOfObservers((observer) => observe.handleEvent(event))
    }
}


class Question {
    user: User,
    questionId: number,
    title: string,
    text: string
    tags: Array<Tag>
    userVotes: Array<Vote>
    listOfAnswers: Array<Answer>
    comments: Array<Comment>
    acceptedAnswer: Answer
    listOfObservers: Array<PostObserver>

     triggerReputationEvent(event){
        this.listOfObservers((observer) => observe.handleEvent(event))
    }
}

class Vote {
    voteId: string,
    user: User; // who gave the vote
    parent: Question | Answer -> we can vote to answer or question
}


class StackOverflowService {
    questionsCollection: Map<string, Question>
    answersCollection: Map<string, Answer>
    commentsCollection: Map<string, Comment>
    tags: Set<Tag>
    users: Map<string, User>

    createUser(userName, email, password){
        const user = new User(userName, email, password);

        return user;
    }

    postQuestion(userId, title, body, tags){
        const user = users.get(userId);
        const listOftag = tags.filter((tag) => tag in set);
        const observers = [new ReputationObserver(user)];

        const question = new Question(user, title, text: body, observers);
        questionsCollection.setValue(question.id, question); // trigger observers action
        question.triggerReputationEvent(event) // event is decided based on action

        return question;
    }

    postAnswer(questionId, userId, text){
        const question = questionsCollection(questionId);
        const user = users.get(userId);
        const observers = [new ReputationObserver(user)];

        const answer = new Answer(user, question, observers);

        answersCollection.set(answer.id, answer);
        answer.triggerReputationEvent(event) // event is decided based on action

        return answer;

    }

    postComment(userId, parentId, parentType, text){
       const user = users.get(userId);
       const parentObj = parentype == 'question' ? questionCollection.get(parentId): answersCollection(parentId);

       const comment = new comment(user, parentObj);
    }

    vote(userId,voteValue, parentType, parentId){
        const user = users.get(userId);

        const parentObj = parentType =='Question' ? questionsCollection.get(parentId): answersCollection.get(parentId);
          // Check existing vote
       const existingVote = parent.userVotes.get(userId);
    
    if (existingVote === voteType) {
        return; // Already voted same way
    }
    
    // Update counts
    if (existingVote) {
        // Remove old vote effect
        existingVote === 'upvote' ? parent.upvotes-- : parent.downvotes--;
    }
    
    // Apply new vote
    voteType === 'upvote' ? parent.upvotes++ : parent.downvotes--;
    parent.userVotes.set(userId, voteType);
    
    // Trigger reputation event
    const event = voteType === 'upvote' ? 
        UserEvent.ANSWER_UPVOTE : UserEvent.ANSWER_DOWNVOTE;
    parent.triggerReputationEvent(event);
    }
}



HLD Discussion: 
In above class diagrams we have gone through classes and there relationships and how api flow will happen, now it comes to hld part

To support millions of users we need to have multiple server at multiple geo graphical location, nearest one will server the requests

above requrements seems read heavy so i will recomment to add CDN cache for static values like images, questions etc and also add redis cache for frequent access

We can follow master and slave architecture to increase availability percentage 99.999

How do we hanle concurreny in stack over flow: suppose same users clicked on upvote at the same time, how do you make sure both votes get considered: use version column with optamistic locking and may be we can think of distributed lock or pessimistic locks as well.