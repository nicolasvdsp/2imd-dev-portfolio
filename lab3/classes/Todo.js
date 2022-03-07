export default class Todo {
  constructor(title) {
    // HINT🤩
    this.title = title;
    // done - use a constructor to set basic property values
  }

  createElement() {
    // HINT🤩
    let li = document.createElement("li");
    let title = this.disectTodo(this.title);
    // console.log(title);
    let todo = title[1];
    let priority = title[0];
    li.innerHTML = todo;
    li.classList.add(`prior-${priority}`);
    return li;
    // done - this method will create the HTML structure with the correct classes, based on the todo priority
    // done - let newNote = document.createElement("li");
    // done - check if the todo item includes a priority like medium: to generate the correct classnames
    // don't forget to hook up an event listener for the click event
    // done - return newNote;
  }

  disectTodo(title) {
    const priorities = ["low", "medium", "high"];
    let priority;
    let todo;
    const regex = this.buildRegularExpression(priorities); //(^${prior[i]}+)\:\s?(.*)/
    const match = regex.exec(title);

    if(match) {
          priority = match[1];
          todo = match[2];
          return [priority, todo];
    } else {
          return [priority = "medium", todo = title];
    }
  }

  buildRegularExpression(priorities) {
    let subExpr = '';
    for(let i = 0; i<priorities.length; i++) {
      i != priorities.length-1 ? subExpr += `^${priorities[i]}|` : subExpr += `^${priorities[i]}`; //output: ^low|^medium|^high
    }
    const expression = `(${subExpr})\:\s?(.*)`; //output: (^low|^medium|^high)\:\s?(.*)
    let regex = new RegExp(expression); //output: /(^low|^medium|^high)\:\s?(.*)/
    return regex;
  }

  markDone(e) {
    console.log(this.innerHTML);
    this.classList.add(`done`);
    // HINT🤩
    // this function should mark the current todo as done, by adding the correct CSS class
    // if the item is clicked, but was already marked as done, remove the item from the list
  }

  add() {
    // HINT🤩
    // done - this function should append the note to the screen somehow
    let todo = this.createElement();
    document.querySelector("#todo-list").appendChild(todo);
    return todo;
    // done - let todo = this.createElement(); // should return a full <li> with the right classes and innerHTML
  }

  saveToStorage() {
    // HINT🤩
    let localTodoList = JSON.parse(localStorage.getItem("todos"));
    if(localTodoList === null) {
      localTodoList = [];
      localTodoList.push(this.title);
      localStorage.setItem("todos", JSON.stringify(localTodoList));
    } else {
      localTodoList = JSON.parse(localStorage.getItem("todos"));
      localTodoList.push(this.title);
      localStorage.setItem("todos", JSON.stringify(localTodoList));
    }
    console.log(JSON.parse(localStorage.getItem("todos")));
    // https://www.codegrepper.com/code-examples/javascript/add+array+to+localstorage
    // done - localStorage only supports strings, not arrays
    // done - if you want to store arrays, look at JSON.parse and JSON.stringify
  }
}
