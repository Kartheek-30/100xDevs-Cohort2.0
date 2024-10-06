/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
    constructor(){
      this.tasks = [];
    }
    add(task){
      this.tasks.push(task);
    }
    remove(index){
      if(index >= 0 && index < this.tasks.length){
        this.tasks.splice(index, 1);
      } else {
        console.log("Invalid index");
      }
    }
    update(index, newTask){
      if(index >= 0 && index < this.tasks.length){
        this.tasks[index] = newTask;
      } else {
        console.log("Task at the given index doesn't exist");
      }
    }
    getAll(){
      return this.tasks;
    }
    get(index){
      if(index >= 0 && index < this.tasks.length){
        return this.tasks[index];
      } else{
        return null;
      }
    }
    clear(){
      this.tasks.length = 0;
    }
}

module.exports = Todo;
