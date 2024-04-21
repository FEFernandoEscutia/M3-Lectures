//we can specify what type of value our variable has, or we also can imply that!

const myName: string = "Fernando";
const lastName: string = "Escutia"; // this is my actual last name lol !
const age: number = 31;
console.log(myName.toUpperCase());
//The next error is expected
// console.log(age.toUpperCase()); // we are able to see this error because age is not a string

const alive: boolean = true;
//Typescript for Arrays

//For the arrays we need to declare what type array we have, it is needed to specify what type of element will contain
const pairNumbers: number[] = [2, 4, 6, 8, 10];

const words: string[] = [
  "Amonos chavin!",
  "Ah shi mi perro",
  "The last of us",
  "No ma",
];

//*******************************************************************
//**Typescript for Arrays
//*******************************************************************

const number: number[] = [];
number.push(1);
number.push(5);
number.push(6);
number.push(25);

console.log(number);

//*******************************************************************
//** Functions Typing
//*******************************************************************

const name1: string = "Fernando ";

const greeting = (name: string) => {
  return `What up ma boy ${name}`;
};

console.log(greeting(name1));

greeting("Sam");
greeting("Marissa");
// greeting(5); // our function is expecting a string and not a number, all made by typescript

// we are typing the values for the parameters and the return
const total = (quantity: number, price: number): string => {
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

//? how to do it in typescript

// We always have got to start with a capital "I" and also the letter of the name have got to be capitalized
//in this case "U"

//Since Address its also an interface, we need to create it
interface IAddress {
  street: string;
  city: string;
}

interface IUser {
  name: string;
  age: number;
  email: string;
  active: boolean;
  address: IAddress; // here us the interface that we created previously
}

// using the same example but with the interface

const user1: IUser = {
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

enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

// RESULT
//This type  has te "user" rol
type TUser = {
  name: string;
  age: number;
  email: string;
  active: boolean;
  address: IAddress;
  rol: UserRole.USER;
};

//! IMPORTANT !!
//! When we need to create the property of an object we recommend to use the interfaces

interface User {
  name: string;
  email: string;
  age: number;
}

const user2: User = {
  name: "Carolina",
  email: "Carolina123@gmail.com",
  age: 21,
};

// The next admin user will contain the same properties as a regular user
interface AdminUser extends User { //we are extending the properties from "User"
  adminSince: Date;
}

const user3: AdminUser = {
  name: "Carolina",
  email: "Carolina123@gmail.com",
  age: 21,
  adminSince: new Date(), // we are specifying the date when this user was created **adminSince: 2024-04-21T18:25:53.045Z**
};

console.log(user3);
