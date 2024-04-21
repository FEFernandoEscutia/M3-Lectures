"use strict";
//we can specify what type of value our variable has, or we also can imply that!
const myName = "Fernando";
const lastName = "Escutia"; // this is my actual last name lol !
const age = 31;
console.log(myName.toUpperCase());
//The next error is expected
// console.log(age.toUpperCase()); // we are able to see this error because age is not a string
const alive = true;
//Typescript for Arrays
//For the arrays we need to declare what type array we have, it is needed to specify what type of element will contain
const pairNumbers = [2, 4, 6, 8, 10];
const words = [
    "Amonos chavin!",
    "Ah shi mi perro",
    "The last of us",
    "No ma",
];
//*******************************************************************
//**Typescript for Arrays
//*******************************************************************
const number = [];
number.push(1);
number.push(5);
number.push(6);
number.push(25);
console.log(number);
//*******************************************************************
//** Functions Typing
//*******************************************************************
const name1 = "Fernando ";
const greeting = (name) => {
    return `What up ma boy ${name}`;
};
console.log(greeting(name1));
greeting("Sam");
greeting("Marissa");
// greeting(5); // our function is expecting a string and not a number, all made by typescript
// we are typing the values for the parameters and the return
const total = (quantity, price) => {
    return `The total amount for you ${quantity} items, is ${quantity * price} dollars`;
};
console.log(total(5, 10));
//*******************************************************************
//**Interfaces
//*******************************************************************
// the regular way to create an object
const user = {
    name: "Fernando",
    age: 31,
    email: "fernand123@gmail.com",
    active: true,
    address: {
        street: "village street",
        city: "las Vegas",
    },
};
// using the same example but with the interface
const user1 = {
    name: "Fernando",
    age: 31,
    email: "fernand123@gmail.com",
    active: true,
    address: {
        street: "village street",
        city: "las Vegas",
    },
};
//*******************************************************************
//**Personalized Types
//*******************************************************************
//to be able to create a personalized type we have to use the word type and name it with a capital "T"
// and the first letter has got to be capital as well in this specific example is the letter "U"
//! **enum** in this example we want to integrate a "rol" to our user, but we want it to have specific values
//? example===> role: "admin", "user", guest
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
    UserRole["GUEST"] = "guest";
})(UserRole || (UserRole = {}));
const user2 = {
    name: "Carolina",
    email: "Carolina123@gmail.com",
    age: 21,
};
const user3 = {
    name: "Carolina",
    email: "Carolina123@gmail.com",
    age: 21,
    adminSince: new Date(), // we are specifying the date when this user was created 
};
console.log(user3);
