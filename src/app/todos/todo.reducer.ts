import { createReducer, on } from '@ngrx/store';
import { borrar, changeToggle, clearCompleted, crear, editar, markAll } from './todo.actions';
import { Todo } from '../models/todo.model';

export const initialState: Todo[] = [
    new Todo('salvar el mundo'),
    new Todo('comprar palomitas'),
    new Todo('mejor robar palomitas'),
    new Todo('que no te pillen', true),
];

export const todoReducer = createReducer(
    initialState,
    on(crear, (state, { texto }) => [ ...state, new Todo( texto ) ]), // no haces push, para evitar mutar accidentalmente el state
    on(changeToggle, (state, { id }) => state.map( todo => (todo.id === id) ? { ...todo, completado: !todo.completado } : todo ) ),
    on(editar, (state, { id, texto }) => state.map( todo => (todo.id === id) ? { ...todo, texto: texto } : todo ) ),
    on(borrar, (state, { id }) => state.filter( todo => todo.id !== id )),
    on(markAll, (state, { allComplete }) => state.map( todo => ( { ...todo,  completado: allComplete } ) )),
    on(clearCompleted, (state ) => state.filter( todo => !todo.completado )),
);
 


