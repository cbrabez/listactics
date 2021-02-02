import { Component, OnInit } from '@angular/core';
import { TodosService } from '../service/todos.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FilterPipe } from '../shared/pipes/my-filter.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
constructor(private todosService: TodosService) { }
private todoLimit = 5;
public todos = [];
public mondayTodos = [];
public tuesdayTodos = [];
public wednesdayTodos = [];
public thursdayTodos = [];
public fridayTodos = [];
public saturdayTodos = [];
public sundayTodos = [];
public lastCreatedFiveTodos = [];
filterMonday = {day: 1};

ngOnInit() {
    this.findLastCreatedTodos();
    this.findAllTodos();
    this.findMondayTodos();
    this.findTuesdayTodos();
    this.findWednesdayTodos();
    this.findThursdayTodos();
    this.findFridayTodos();
    this.findSaturdayTodos();
    this.findSundayTodos();
  }

  findAllTodos() {
    this.todosService.findAllTodos().subscribe( res => {
      this.todos = res;
      console.log(this.todos)
    });
  }
// getting todos for every day of the week
// REFACTOR TO LESS CODE
findMondayTodos(){
  this.todosService.findMondayTodos().subscribe( res => {
    this.mondayTodos = res;
    console.log(this.mondayTodos)
  });
}

findTuesdayTodos(){
  this.todosService.findTuesdayTodos().subscribe( res => {
    this.tuesdayTodos = res;
  });
}

findWednesdayTodos(){
  this.todosService.findWednesdayTodos().subscribe( res => {
    this.wednesdayTodos = res;
  });
}

findThursdayTodos(){
  this.todosService.findThursdayTodos().subscribe( res => {
    this.thursdayTodos = res;
  });
}

findFridayTodos(){
  this.todosService.findFridayTodos().subscribe( res => {
    this.fridayTodos = res;
  });
}

findSaturdayTodos(){
  this.todosService.findSaturdayTodos().subscribe( res => {
    this.saturdayTodos = res;
  });
}

updateToDo(id, day) {
  this.todosService.updateTodo(id, { day: day });
}

findSundayTodos(){
  this.todosService.findSundayTodos().subscribe( res => {
    this.sundayTodos = res;
  });
}

// end getting weekly todos

deleteTask(id: string){
  console.log("hey from deleteTRask" + id)
  this.todosService.deleteTodo(id);

}

findLastCreatedTodos() {
    this.todosService.findLastCreatedTodos(this.todoLimit).subscribe( res => {
      this.lastCreatedFiveTodos = res;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // alternativ zu ner TagesID könnte ich die container id nutzen um die tasks des Tagen zuzuweisen
      // console.log(item)
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}