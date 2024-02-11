import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.scss'
})
export class TodoAddComponent {
  txtInput: FormControl;
  
  constructor( private store: Store< AppState > ) {
    this.txtInput = new FormControl('', Validators.required);
  }
  
  add(){
    if( this.txtInput.invalid ) return;
    console.log('this.txtInput.value......', this.txtInput.value);
    
    this.store.dispatch( actions.crear({texto: this.txtInput.value}) );
    
    this.txtInput.reset();
  }
  
}
