import Todo from "./Todo.js";

export default class App {
  constructor() {
    console.log("🍕");
    // HINT🤩
    // set up the enter Key
    this.setupEventListeners();
    this.loadFromStorage();
    // when the app loads, we can show previously saved items from localstorage
  }

  setupEventListeners() {
    console.log("👂🏽");
    // HINT🤩
    // done - pressing the enter key in the text field triggers the createItem function
    document.querySelector("#add-item-text").addEventListener("keyup", this.createItem.bind(this));
    // done - read up on .bind() -> we need to pass the current meaning of this to the eventListener
    // done - while testing, feel free to console.log(this) to see what's in it
  }

  createItem(e) {
    // HINT🤩
    
    if(e.keyCode == "13") {
      let todoTitle = document.querySelector("#add-item-text").value;
      let todo = new Todo(todoTitle);
      todo.add();
      todo.saveToStorage();
      this.reset();
    }
    // done - this function should create a new todo by using the Todo() class
    // done - new Todo(text) 
    // done - todo.add();
    // done - todo.saveToStorage();
    // done - if you used bind() in the previous function, you'll notice that this refers to the current class instance
    // done - clear the text field with .reset() after adding the item
    // done - if (e.key === "Enter")
  }

  loadFromStorage() {
    // HINT🤩
    let loadLocalTodoList = JSON.parse(localStorage.getItem("todos"));
    console.log(loadLocalTodoList);
    
    
    // load all items from storage here and add them to the screen
    // use the Todo class to create the elements
  }

  reset() {
    // done - this function should reset the form / clear the text field
    document.querySelector("#add-item-text").value = "";
  }
}
