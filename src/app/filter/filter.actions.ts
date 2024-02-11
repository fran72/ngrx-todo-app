import { createAction, props } from '@ngrx/store';

export type validFilters = 'all' | 'completed' | 'pending';

export const setFilter = createAction(
    '[Filter Component] Set filter',
    props<{filter: string}>()
);
