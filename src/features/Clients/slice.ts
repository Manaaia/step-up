import { createSlice, createEntityAdapter, EntityId, Dictionary, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getClients, addClient } from "../../services/api";
import { Entities, RootState, Selector } from "../../store";
import { Client } from "./type";

// export enum FetchStatus {
//   Fetching = 'Fetching',
//   Success = 'Success',
//   Failure = 'Failure',
// }

// interface ClientRootState {
//   status: FetchStatus,
//   ids: EntityId[],
//   entities: Dictionary<Client>,
// }

// const clientAdapter = createEntityAdapter<Client>()

// export const initialState: ClientRootState = clientAdapter.getInitialState({
//   status: FetchStatus.Fetching,
// })

type ClientStateProps = {
  clients: Client[]
  status: string
  error: string | null | undefined
}

const initialState: ClientStateProps = {
  clients: [],
  status: 'idle',
  error: null
}

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  const response = await getClients()
  return response
})

export const addNewClient = createAsyncThunk('clients/addNewClient', async (initialClient: Client) => {
    const response = await addClient(initialClient)
    return response
  }
)

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    deleteClient(state, action) {
      state.clients = state.clients.filter(client => client.id !== action.payload)
      return state
    },
    updateClient(state, action) {
      const existingClient = state.clients.find(client => client.id === action.payload.id)
      if (existingClient) {
        existingClient.name = action.payload.name
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.clients = state.clients.concat(action.payload)
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewClient.fulfilled, (state, action: any) => {
        state.clients.push(action.payload)
        state.status = 'idle'
      })
  }
})

export const { deleteClient, updateClient } = clientSlice.actions

export default clientSlice.reducer

export const selectAllClients = (state: RootState) => state.clients.clients

export const selectClientById = (state: RootState, clientId: number) =>
  state.clients.clients.find(client => client.id === clientId)

  // export const {
  //   selectAll: selectAllClients,
  //   selectById: selectClientById,
  // } = clientAdapter.getSelectors<RootState>(state => state.clients)

  // export const selectIsFetching: Selector<boolean> = state => state.clients.status === FetchStatus.Fetching

  // export const selectHasError: Selector<boolean> = state => state.clients.status === FetchStatus.Failure

  // export default slice
