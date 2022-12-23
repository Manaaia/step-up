import { configureStore, EntityId } from '@reduxjs/toolkit'
import clientsReducer from './features/Clients/slice'

export const store = configureStore({
  reducer: {
    clients: clientsReducer
  }
})

export type Entities<T> = Record<EntityId, T>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type Selector<S> = (state: RootState) => S
