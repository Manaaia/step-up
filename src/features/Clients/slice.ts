import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { "id": 1, "name": "Leelou", "surname": "Dallas" },
  { "id": 2, "name": "Bruce", "surname": "Willis" },
  { "id": 3, "name": "Korben", "surname": "Dallas" }
]

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addClient(state, action) {
      state.push(action.payload)
    },
    deleteClient(state, action) {
      state = state.filter(client => client.id !== action.payload)
      return state
    }
  }
})

export const { addClient, deleteClient } = clientSlice.actions

export default clientSlice.reducer
