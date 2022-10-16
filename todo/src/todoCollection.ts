import TodoItem from './todoItems'

export class TodoCollection {
  private nextId: number = 1
  private itemMap = new Map<number, TodoItem>()

  constructor(public userName: string, public todoItems: TodoItem[] = []) {
    todoItems.forEach(item => this.itemMap.set(item.id, item))
  }
  addTodo(task: string, complete: boolean = false): number {
    while (this.getTodoById(this.nextId)) {
      this.nextId++
    }
    this.todoItems.push(new TodoItem(this.nextId, task, complete));
    return this.nextId;
  }
  getTodoById(id: number): TodoItem {
    return this.todoItems.find(item => item.id === id)
  }
  getTodoItems(includeComplete: boolean): TodoItem[] {
    return [...this.itemMap.values()].filter(item => includeComplete || !item.complete)
  }
  markComplete(id: number, complete: boolean) {
    const todoItem = this.getTodoById(id);
    if (todoItem) {
      todoItem.complete = complete
    }
  }
  removeComplete() {
    this.itemMap.forEach(item => {
      if (item.complete) {
        this.itemMap.delete(item.id)
      }
    })
  }
}

