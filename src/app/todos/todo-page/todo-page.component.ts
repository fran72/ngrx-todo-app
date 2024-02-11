import { Component } from '@angular/core';
import { TodoAddComponent } from '../todo-add/todo-add.component';
import { TodoFooterComponent } from '../todo-footer/todo-footer.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [
    CommonModule,
    TodoAddComponent,
    TodoListComponent,
    TodoFooterComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss'
})
export class TodoPageComponent {
  
  allComplete: boolean = false;
  
  constructor( private store: Store<AppState>){}

  markAll(){
    this.allComplete = !this.allComplete;
    this.store.dispatch( actions.markAll( {allComplete: this.allComplete }));
    console.log('ssss......', this.allComplete);
  }
  
}
