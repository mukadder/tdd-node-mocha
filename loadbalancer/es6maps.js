/**
 * Created by mukadder on 3/8/17.
 */
// es6
let emp = {
    firstname: 'nattatorn',
    lastname: null,
    age: 25,
    friends: ['mike', 'aof', 'earth', 'big'],
    emails: ['nat@gmail.com', 'nat-work@gmail.com', 'nat@facebook.com'],
    github: ['nat@github.com', 'nat-test@github.com'],
    bitbucket: ['nat@bitbucket.com']
}

let {friends: _myFriends, emails: _myEmails, github: _git_emails, bitbucket: _bitbucket_emails } = emp;

function sayHello({firstname: myFirstName, lastname: myLastName}){
    return `hello! ${myFirstName || '(No first name)'} ${myLastName || '(No last name)'}, I'm glad to see you again.`
}

function knowFrineds(myFriends){
    return render = myFriends.map(v => `
i know ${v}.`);
}

function haveEmails(...myEmails){
    let type_emails = [], emails = [];
    for(type of myEmails){

        type.map((v, i) => {
                if(i === 0){
                    v = `firstitem: ${v}`;
                }
                emails.push(v);
            }
        )
    }
    return {type_emails, emails}
}

console.log(sayHello(emp)); // hello! nattatorn (No last name), I'm glad to see you again.
console.log(knowFrineds(_myFriends)); // ["↵i know mike.", "↵i know aof.", "↵i know earth.", "↵i know big."]
console.log(haveEmails(_myEmails, _git_emails, _bitbucket_emails));