import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/filter/filter.actions';
import { clearCompleted } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  standalone: true,
  imports: [],
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.scss'
})
export class TodoFooterComponent {
  
  activeFilter: string = 'all';
  filters: string[] = ['all' , 'completed' , 'pending'];
  pending: number = 0;
  
  constructor( private store: Store<AppState> ){}
  
  ngOnInit(){
    // this.store.select('filter').subscribe( res =>  this.activeFilter = res );
    this.store.subscribe( state => {
      this.activeFilter = state.filter;
      this.pending      = state.todos.filter( todo => !todo.completado ).length;
    })
    
  }
  
  clearCompleted() {
    this.store.dispatch( clearCompleted() );
  }
  
  setFilter(filter: string) {
    this.store.dispatch( actions.setFilter({ filter: filter }) );
  }

}
