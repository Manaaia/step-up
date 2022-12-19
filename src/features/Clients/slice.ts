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
    }
  }
})

export const { addClient } = clientSlice.actions

export default clientSlice.reducer
