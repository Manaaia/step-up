import { Client } from "../features/Clients/type"

const token = JSON.stringify({"anaka:user":1})

export const apiUrl = "http://127.0.0.1:8080"

export const options = {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`,
  },
}

export async function getClients() {
  let clients
  const response = await fetch(`${apiUrl}/v2/clients`, options)
  clients = await response.json()
  return clients
}

// TODO: this shit does not work. API times out when not 503
export async function addClient(clientElement: Client) {
  const name = clientElement.name

  const client = {
    name: name,
    accountantReference: "bleu",
    categories: [2],
  }

  console.log(JSON.stringify(client))

  const response = await fetch(`${apiUrl}/v2/clients`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(client)
  })

  // const data = await response.json()
  // return data
}
