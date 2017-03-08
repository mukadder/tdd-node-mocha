/**
 * Created by mukadder on 3/8/17.
 */
[0, 1, 2, 3, 4].reduce( (prev, curr) => prev + curr ) // 10


let flattened = [[0, 1], [2, 3], [4, 5]].reduce((prev, curr) => {
    prev.concat(curr)
}, [])

console.log(flattened) // [0, 1, 2, 3, 4, 5]

let developers = [
    { name: 'Joe', age: 23, gender: 'male' },
    { name: 'Sue', age: 28, gender: 'male'  },
    { name: 'Jon', age: 32, gender: 'female'  },
    { name: 'Bob', age: 24, gender: 'male'  }
]


let totalAge = developers.reduce((prev, curr) => {
    prev + curr.age;
}, 0);

console.log(totalAge) // 107


let selectByGender = developers.reduce((prev, curr, index) => {
    prev[curr.gender].push(curr)
    return prev
}, {female: [], male: []})

console.log(selectByGender)

// {
//     "female": [{
//         "name": "Jon",
//         "age": 32,
//         "gender": "female"
//     }],
//     "male": [{
//         "name": "Joe",
//         "age": 23,
//         "gender": "male"
//     }, {
//         "name": "Sue",
//         "age": 28,
//         "gender": "male"
//     }, {
//         "name": "Bob",
//         "age": 24,
//         "gender": "male"
//     }]
// }

let array = [[1, 2], [3, 4], [5, 6]].reduce((prev, curr, index) => {
    return prev.concat(curr)
},[])

console.log(array) //[1, 2, 3, 4, 5, 6]



let developerList = developers.reduce((prev, curr, index) => {
    prev.push(curr.name)
    return prev
},[])


console.log(developerList.join(', ')) // Joe, Sue, Jon, Bob



// example - 1
var numbers = [1, 2, 3, 4]
var newNumbers = []

for(var i = 0; i < numbers.length; i++) {
    var number = numbers[i]
    newNumbers.push(number)

    if(number % 2 === 0) {
        newNumbers.push(number)
    }
}

console.log("The final numbers are", newNumbers); // [1, 2, 2, 3, 4, 4]

// example - 2
let numbers = [1, 2, 3, 4];
let newNumbers = numbers.reduce((newArray, number) => {
    newArray.push(number);

    if(number % 2 === 0) {
        newArray.push(number)
    }
    return newArray
}, [])

console.log("The final numbers are", newNumbers); // [1, 2, 2, 3, 4, 4]


// example
[
    { doctorNumber: "#9",  playedBy: "Christopher Eccleston", yearsPlayed: 1 },
    { doctorNumber: "#10", playedBy: "David Tennant",         yearsPlayed: 6 },
    { doctorNumber: "#11", playedBy: "Matt Smith",            yearsPlayed: 4 },
    { doctorNumber: "#12", playedBy: "Peter Capaldi",         yearsPlayed: 1 }
]

// example - 1
doctors = doctors.filter(function(doctor) {
    return doctor.begin > 2000; // if truthy then keep item
}).map(function(doctor) {
    return { // return what new object will look like
        doctorNumber: "#" + doctor.number,
        playedBy: doctor.actor,
        yearsPlayed: doctor.end - doctor.begin + 1
    };
});

console.log(JSON.stringify(doctors, null, 4));


// example - 2
doctors = doctors.reduce(function(memo, doctor) {
    if (doctor.begin > 2000) { // this serves as our `filter`
        memo.push({ // this serves as our `map`
            doctorNumber: "#" + doctor.number,
            playedBy: doctor.actor,
            yearsPlayed: doctor.end - doctor.begin + 1
        });
    }
    return memo;
}, []);

console.log(JSON.stringify(doctors, null, 4));
