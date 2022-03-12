export default class Todo {
  constructor(todo) {
    this.title = todo.title;
    this.done = todo.done;
  }

  createElement() {
    let li = document.createElement("li");
    let title = this.disectTodo(this.title);

    let todo = title[1];
    let priority = title[0];
    li.innerHTML = todo;
    li.prototype = this;
    li.classList.add(`prior-${priority}`);
    if(this.done === true) {
      li.classList.add('done');
    };

    li.addEventListener("click", this.markDone.bind(li));
    return li;
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
    console.log(`innerHTML = ${this.innerHTML}`);
    if(!this.classList.contains('done')) {
      this.classList.add(`done`);
      let getLocalTodoList = JSON.parse(localStorage.getItem("todos"));
      getLocalTodoList.forEach(localTodoItem => {
        if(localTodoItem.title === this.prototype.title) {
          localTodoItem.done = true;
          console.log(localTodoItem);
        }
      });
      localStorage.setItem("todos", JSON.stringify(getLocalTodoList));

      console.table(getLocalTodoList);
    } else {
      this.remove();
    }
    
  }

  add() {
    let todo = this.createElement();
    document.querySelector("#todo-list").appendChild(todo);
    return todo;
  }

  saveToStorage() {
    let localTodoList = JSON.parse(localStorage.getItem("todos"));
    let todoItem = {
      title: this.title,
      done: this.done
    }
    if(localTodoList === null) {
      localTodoList = [];
      localTodoList.push(todoItem);
      // localTodoList.push(this.title);
      localStorage.setItem("todos", JSON.stringify(localTodoList));
    } else {
      localTodoList = JSON.parse(localStorage.getItem("todos"));
      localTodoList.push(todoItem);
      // localTodoList.push(this.title);
      localStorage.setItem("todos", JSON.stringify(localTodoList));
    }
    // console.log(JSON.parse(localStorage.getItem("todos")));
  }
}
