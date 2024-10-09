class Todo {
    constructor(){
      this.tasks = [];
    }
    add(task){
      this.tasks.push(task);
    }
    remove(index){
      if(index > 0 && index < this.tasks.length){
        this.tasks.splice(index, 1);
        console.log(this.tasks);
      } else {
        console.log("Invalid index");
      }
    }
    update(index, newTask){
      if(index > 0 && index < this.tasks.length){
        this.tasks[index] = newTask;
      } else {
        console.log("Task at the given index doesn't exist");
      }
    }
    getAll(){
      return this.tasks;
    }
    get(index){
      return this.tasks[index];
    }
    clear(){
      this.tasks.length = 0;
    }
}

const todoList = new Todo();
todoList.add("Task 1");
todoList.add("Task 2");
todoList.add("Task 3");
console.log(todoList.getAll());
todoList.remove(2);
console.log(todoList.getAll());