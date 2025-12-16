import { ActionReducer, MetaReducer } from '@ngrx/store';

const STORAGE_KEY = 'personal-note-taking';

const isBrowser = (): boolean => typeof localStorage !== 'undefined';

const readState = <T>(): T | undefined => {
  if (!isBrowser()) {
    return undefined;
  }

  try {
    const storedState = localStorage.getItem(STORAGE_KEY);
    return storedState ? JSON.parse(storedState) : undefined;
  } catch {
    return undefined;
  }
};

const writeState = <T>(state: T): void => {
  if (!isBrowser()) {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage write errors to avoid breaking the app.
  }
};

export const localStorageMetaReducer: MetaReducer = <State extends Record<string, unknown>>(
  reducer: ActionReducer<State>
) => {
  return (state, action) => {
    const hydratedState = state ?? readState<State>();
    const nextState = reducer(hydratedState, action);
    writeState(nextState);
    return nextState;
  };
};
