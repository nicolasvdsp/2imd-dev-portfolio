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
    console.log(title);
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
    this.buildSubExpression(priorities);
    const regex = /(^\w+)\:\s?(.*)/; //what about 1 lange regex die of met of zonder priority detecteert? dan is de dubbele if beneden misschien weg?
    const match = regex.exec(title);

    if(match) {
      priority = match[1];
      todo = match[2];
      if (priorities.indexOf(priority) > -1){
        return [priority, todo];
      } else {
        return [priority = "medium", todo];
      }
    } else {
      return [priority = "medium", todo = title];
    }
  }

  buildSubExpression(priorities) {
    let subExpr = '';
    for(let i = 0; i<priorities.length; i++) {
      subExpr += `^${priorities[i]}|`
    }
    console.log(subExpr);
  }

  //   const regex = /(^low|^medium|^high)\:\s?(.*)/;
  //   if(match) {
  //     priority = match[1];
  //     todo = match[2];
  //     return [priority, todo];
  //   } else {
  //     return [priority = "medium", todo = title];
  //   }
  // }

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
