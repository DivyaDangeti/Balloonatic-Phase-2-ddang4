/*  JS utilities for Balloonatic Asylum Phase 2.
    CSCI-6655-02-F21: Web-DB Application Development @ UNH 
    Dr. Ted Markowitz (tmarkowitz@newhaven.edu) 
    Latest update: 10/15/21 
*/

"use strict";

let DEBUG = false; // flag for adding console.log output during debugging

if (!DEBUG) {
    console.log(`Set DEBUG flag to true for more detailed output.`);
}

const fs = require('fs'); // used later to read in JSON files

// Global variables accessible everywhere in module
// "users", "products", and "quotes" can be used to mimic
// a simple DB once they are read into your server code.

let users = []; // array of User objects
let products = []; // array of Product objects
let quotes = []; // array of customer quotes as strings
let buffer = {}; // buffer used by fs.readFileSync
let jsonObject = {}; // holds parsed data from JSON file

/* ********************************************************************* */
// Class def & constructor for making new Balloonatic Asylum User objects.
// You can use this to create new users (don't forget to append them to
// your 'users' array) from the User Registration page. 
/* ********************************************************************* */

class User {
    constructor() {
	let firstName = "";
	let lastName = "";
	let email = "";
	let password = "";
	let address = "";
	let city = "";
	let state = "";
	let country = "";
	let postalCode = "";
	let phone = "";
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    greetings() {
        console.log(`Hi, my name is ${this.getFullName()}.`);
    }

    describe() {
        console.log(`First Name: ${this.firstName}.`);
        console.log(`Last Name: ${this.lastName}.`);
        console.log(`Email: ${this.email}`);
        console.log(`Password: ${this.password}`);
        console.log(`Address: ${this.address}`);
        console.log(`City: ${this.city}`);
        console.log(`State: ${this.state}`);
        console.log(`Country: ${this.country}`);
        console.log(`Postal Code: ${this.postalCode}`);
        console.log(`Phone: ${this.phone}`);
    }
}

/* ************************************************************** */
// Here we read in our list of users once from an external JSON file.
// We return an array of User objects created from that data.
// Since this is done at server startup, using fs.readFileSync is OK.
// Use fs.readFile -- its async version -- if you read files during
// normal processing to avoid blocking the event-loop. Later we will
// read users in directly from the DB as needed.
/* ************************************************************** */

// Load the global array of all known user objects from the JSON file

try {
    buffer = fs.readFileSync("./data/balloonatic-users.json");
    jsonObject = JSON.parse(buffer);
    users = [...jsonObject]; // works fine to copy simple arrays
    console.log(`There are ${users.length} users in the DB.`);
    if (DEBUG) {
	console.log(users);
    }
} catch (err) {
    if (err.code === 'ENOENT') {
	console.error('File not found!');
    } else {
	throw err; // could be other error too
    }
}

// Here's an example of a new user being created and then filling in
// their fields. We add it to the global users array and check
// to see if we can find it.

let testUser = new User();
testUser.firstName = "Tim";
testUser.lastName = "Marlowe",
testUser.email = "tmarl@example.com";
testUser.password = "TM120252";

users.push(testUser);
const [lastUser] = users.slice(-1);
console.log(`Last user added: ${JSON.stringify(lastUser, null, 2)}`);

let obj = users.find(u => u.email === "tmarl@example.com");
if (obj) console.log(`Found user: ${obj.email}`);

/* ************************************************************** */
// Here we read in our customer quotes once from JSON file.
// We return an array of strings created from that data.
// Since this is done at server startup using fs.readFileSync is OK.
// Use fs.readFile -- its async version -- if you read files during
// normal processing to avoid blocking the event-loop.
// Later we will read quotes in directly from the DB. 
/* ************************************************************** */

// Load the global array of all customer quotes from the JSON file

try {
    buffer = fs.readFileSync("./data/balloonatic-quotes.json");
    jsonObject = JSON.parse(buffer);
    quotes = [...jsonObject]; // works fine to copy simple arrays
    console.log(`There are ${quotes.length} quotes in the DB.`);
    if (DEBUG) {
	console.log(quotes);
    }
} catch (err) {
    if (err.code === 'ENOENT') {
	console.error('File not found!');
    } else {
	throw err; // could be other error too
    }
}

/* **************************************************************** */
// Here we read in an array of products from an external JSON file.
/* **************************************************************** */

/* Object constructor for new Balloonatic products */

class Product {
    constructor(
        productName = "unknown", // name as a string
        productID = "unknown", // product's unique ID as a string
        imageURL = "unknown", // URL to picture of product
        category = "unknown", // "standard", "industrial"
        color = "unknown", // "red", "green", "blue", "yellow", "orange", "purple", "black", "white", "silver" or "gold"
        manufacturer = "unknown", // manufacturer's name as a string
        material = "unknown", // latex or vinyl as a string
        size = "unknown", // "small", "medium", "large", "x-large", "xx-large"
        price = -Infinity, // per unit price as a number
        quantityInStock = -Infinity // total # available to sell
    ) {
        this.productName = productName;
        this.productID = productID;
        this.imageURL = imageURL;
        this.category = category;
        this.color = color;
        this.manufacturer = manufacturer;
        this.material = material;
        this.size = size;
        this.unitPrice = price;
        this.quantityInStock = quantityInStock;
    }

    describe() {
        console.log(`I am a "${this.productName}"`);
        console.log(`Product ID: ${this.productID}`);
        console.log(`Product image: ${this.imageURL}`);
        console.log(`Category: ${this.category}`);
        console.log(`Color: ${this.color}`);
        console.log(`Manufacturer: ${this.manufacturer}`);
        console.log(`Material: ${this.material}`);
        console.log(`Size: ${this.size}`);
        console.log(`Unit price: $${this.unitPrice.toFixed(2)}`);
        console.log(`Quantity in stock: ${this.quantityInStock}`);
    }
}

/* ************************************************************** */
// Here we read in our Product objects once from an external JSON file.
// We return an array of Product objects created from that data.
// Since this is done at server startup, using fs.readFileSync is OK.
// Use fs.readFile -- its async version -- if you read files during
// normal processing to avoid blocking the event-loop.
// Later we will read products in directly from the DB. 
/* ************************************************************** */

try {
    buffer = fs.readFileSync("./data/balloonatic-products.json");
    jsonObject = JSON.parse(buffer);
    products = [...jsonObject]; // works fine to copy simple arrays
    console.log(`There are ${products.length} products in the DB.`);
    if (DEBUG) {
	console.log(products);
    }
} catch (err) {
    if (err.code === 'ENOENT') {
	console.error('File not found!');
    } else {
	throw err; // could be other error too
    }
}

/* *************************************************** */
/* Load up array with two-letter statecodes for the US */
/* These can be used in the User Registration form      */
/* *************************************************** */

const stateCodes = [
    "AL",
    "AK",
    "AS",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FM",
    "FL",
    "GA",
    "GU",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MH",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "MP",
    "OH",
    "OK",
    "OR",
    "PW",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VI",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
];

console.log(`List of US state codes is loaded.`);

// Print out state codes
if (DEBUG) console.log(`${stateCodes}`);

module.exports = {
    users,
    models: {
        User,
    },
    products,
    quotes,
    buffer,
    jsonObject,
    stateCodes
}