import { Component } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Todo } from 'src/app/models/todo.model';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, FilterPipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  
  todos: Todo[] = [];
  activeFilter: string;
  
  constructor( private store: Store<AppState>, ) {
    
    // this.store.select('todos').subscribe( (todos: any) => this.todos = todos );
    this.store.subscribe( (state: AppState) => {
      this.todos = state.todos;
      this.activeFilter = state.filter;
    });
    
  }

}
