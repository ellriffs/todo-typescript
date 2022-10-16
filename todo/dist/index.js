"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItems_1 = require("./todoItems");
const todoCollection_1 = require("./todoCollection");
let todos = [
    new todoItems_1.default(1, "Buy Flowers"), new todoItems_1.default(2, "Get Shoes"),
    new todoItems_1.default(3, "Collect Tickets"), new todoItems_1.default(4, "Call Joe", true)
];
let collection = new todoCollection_1.TodoCollection("Elliot", todos);
console.clear();
console.log(`${collection.userName}'s Todo List`);
collection.removeComplete();
collection.getTodoItems(true).forEach(item => item.printDetails());
