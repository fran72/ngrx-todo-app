import { createAction, props } from '@ngrx/store';

export const crear = createAction(
    '[Todo Component] Crear todo',
    props<{texto: string}>()
);

export const changeToggle = createAction(
    '[Todo Component] Change toggle',
    props<{id: number}>()
);

export const editar = createAction(
    '[Todo Component] Editar todo',
    props<{id: number, texto: string}>()
);

export const borrar = createAction(
    '[Todo Component] Borrar todo',
    props<{id: number}>()
);

export const markAll = createAction(
    '[Todo Component] Completar todo',
    props<{allComplete: boolean}>()
);

export const clearCompleted = createAction(
    '[Todo Component] Clear completed todo'
);
