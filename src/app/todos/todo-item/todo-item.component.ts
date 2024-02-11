import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Todo } from 'src/app/models/todo.model';
import * as actions from '../todo.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  
  @Input() todo: Todo;
  @ViewChild('textInputFisico') textInputFisico: ElementRef;
  
  chkCompletado: FormControl;
  txtInput: FormControl;
  
  editando: boolean = false;
  
  private todoSubscription: Subscription;
  
  constructor( private store: Store<AppState> ) { }
  
  ngOnInit() {
    this.chkCompletado = new FormControl( this.todo.completado );
    this.txtInput      = new FormControl( this.todo.texto , Validators.required );
  
    this.chkCompletado.valueChanges.subscribe( value => {
      console.log('value......', value);
      this.store.dispatch( actions.changeToggle( {id: this.todo.id} ));
    });
    
    // Agregué esto para el chkCompletado sea marcado
    this.todoSubscription = this.store.select('todos').subscribe( todos => {
      const currentTodo = todos.find(t => t.id === this.todo.id);
      if (currentTodo && this.chkCompletado.value !== currentTodo.completado) {
        this.chkCompletado.setValue(currentTodo.completado, { emitEvent: false });
      }
    });
    
  }
  
  ngOnDestroy(): void {
    if (this.todoSubscription) {
      this.todoSubscription.unsubscribe();
    }
  }
  
  
  editar() {
    this.editando = true;
    this.txtInput.setValue( this.todo.texto );
    
    setTimeout( () => { 
      this.textInputFisico.nativeElement.select();
    }, 100); 
    
  }
  
  finishEdit(){
    this.editando = false;
    
    if (this.txtInput.invalid) return;
    if (this.txtInput.value === this.todo.texto) return;
    
    this.store.dispatch( actions.editar( {id: this.todo.id, texto : this.txtInput.value} ));
  }
  
  borrar(){
    this.store.dispatch( actions.borrar( {id: this.todo.id} ));
  }

}
