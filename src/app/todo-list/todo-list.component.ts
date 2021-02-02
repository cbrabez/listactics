import { Component, OnInit } from '@angular/core';
import { TodosService } from '../service/todos.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
public todos = [];
constructor(private todosService: TodosService) { }
ngOnInit() {
    this.findAllTodos();
  }
findAllTodos() {
    this.todosService.findAllTodos().subscribe( res => {
      this.todos = res;
    });
  }
updateToDo(id, day) {
    this.todosService.updateTodo(id, { day: day });
  }
}