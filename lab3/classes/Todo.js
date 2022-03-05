export default class Todo {
  constructor(title) {
    // HINT🤩
    this.title = title;
    // done - use a constructor to set basic property values
  }

  createElement() {
    // HINT🤩
    let li = document.createElement("li");
    let todo = this.disectTodo(this.title);
    li.innerHTML = todo[1];
    li.classList.add(`prior-${todo[0]}`);
    return li;
    // done - this method will create the HTML structure with the correct classes, based on the todo priority
    // done - let newNote = document.createElement("li");
    // done - check if the todo item includes a priority like medium: to generate the correct classnames
    // don't forget to hook up an event listener for the click event
    // done - return newNote;
  }

  disectTodo(title) {
    const priorities = ["low", "medium", "high"];
    let determinePriority = title;
    let determineTask;
    const regex = /(^\w+)\:\s?(.*)/;
    const match = regex.exec(title);

    if(match) {
      determinePriority = match[1];
      determineTask = match[2];
      if (priorities.indexOf(determinePriority) > -1){
        return [determinePriority, determineTask];
      } else {
        return [determinePriority = "medium", determineTask];
      }
    } else {
      return [determinePriority = "medium", determineTask = title];
    }
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
