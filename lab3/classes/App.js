import Todo from "./Todo.js";

export default class App {
  constructor() {
    this.setupEventListeners();
    this.loadFromStorage();
  }

  setupEventListeners() {
    document.querySelector("#add-item-text").addEventListener("keyup", this.createItem.bind(this));
  }

  createItem(e) {
    if(e.keyCode == "13") {
      let todoTitle = document.querySelector("#add-item-text").value;
      let todoItem = {
        "title": todoTitle,
        "done": "false"
      }
      let todo = new Todo(todoItem);
      todo.add();
      todo.saveToStorage();
      this.reset();
    }
  }

  loadFromStorage() {
    let loadLocalTodoList = JSON.parse(localStorage.getItem("todos"));
    loadLocalTodoList ? loadLocalTodoList.forEach(todoTitle => {
        let todoItem = new Todo(todoTitle);
        let li = todoItem.add();
      }): null;

    console.table(loadLocalTodoList);
  }

  reset() {
    document.querySelector("#add-item-text").value = "";
  }
}
