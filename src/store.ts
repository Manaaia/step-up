import { configureStore } from '@reduxjs/toolkit'
import clientsReducer from './features/Clients/slice'

export default configureStore({
  reducer: {
    clients: clientsReducer
  }
})
