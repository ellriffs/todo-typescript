import TodoItem from "./todoItems";
import { TodoCollection } from "./todoCollection";
import * as inquirer from 'inquirer'
import {JsonTodoCollection} from './jsonTodo'

let todos: TodoItem[] = [
  new TodoItem(1, "Buy Flowers"), new TodoItem(2, "Get Shoes"),
  new TodoItem(3, "Collect Tickets"), new TodoItem(4, "Call Joe", true)
]

let collection: TodoCollection = new JsonTodoCollection("Elliot", todos)
let showCompleted = true

const displayTodoList = (): void => {
  console.log(`${collection.userName}'s Todo List` + `(${collection.getItemCounts().incomplete} items to do)`)
  collection.getTodoItems(showCompleted).forEach(item => item.printDetails())
}

const promptAdd = (): void => {
  console.clear()
  inquirer.prompt({ type: 'input', name: 'add', message: 'Enter Task!' }).then(answers => {
    if (answers['add'] !== "") {
      collection.addTodo(answers['add'])
    }
    promptUser()
  })
}

const promptCompleted = (): void => {
  console.clear()
  inquirer.prompt({ type: 'checkbox', name: 'complete', message: 'Mark Tasks Complete', choices: collection.getTodoItems(showCompleted).map((item) => ({ name: item.task, value: item.id, checked: item.complete })) })
    .then(answers => {
      let completedTasks = answers["complete"] as number[];
      collection.getTodoItems(true).forEach(item => collection.markComplete(item.id, completedTasks.find(id => id === item.id) != undefined));
      promptUser()
    })
}

enum Commands {
  Add = 'Add New Task',
  Complete = 'Complete Task',
  Toggle = 'Show/Hide Completed',
  Purge = 'Remove Completed Task',
  Quit = "Quit"
}

const promptUser = (): void => {
  console.clear()
  displayTodoList()
  inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Choose option',
    choices: Object.values(Commands),
    //badProperty: true
  }).then(answers => {
    switch (answers["command"]) {
      case Commands.Toggle:
        showCompleted = !showCompleted
        promptUser()
        break;
      case Commands.Add:
        promptAdd()
        break;
      case Commands.Complete:
        if (collection.getItemCounts().incomplete > 0) {
          promptCompleted()
        } else {
          promptUser()
        }
        break;
      case Commands.Purge:
        collection.removeComplete()
        promptUser()
        break;
    }
  })
}

promptUser()

console.clear()
console.log(`${collection.userName}'s Todo List` + `(${collection.getItemCounts().incomplete} items to do)`)
collection.getTodoItems(true).forEach(item => item.printDetails())