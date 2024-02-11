import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.model';

@Pipe({
  name: 'todoFilter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(todos: Todo[], filter: string): unknown {
    
    switch(filter){
      
      case 'completed':
        return todos.filter( todo => todo.completado);
        
      case 'pending':
        return todos.filter( todo => !todo.completado);
     
      default:
        console.log('all......', todos);
        return todos;
           
    }
    
  }

}
