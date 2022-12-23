import FlashMessage from "../../../ui/FlashMessage"
import { useSelector, useDispatch } from "react-redux"
import { selectClientById, updateClient } from "../slice"
import { Link, useNavigate, useParams } from "react-router-dom"
import React, { useState } from "react"
import styled from "styled-components"
import { RootState } from "../../../store"
import { Client as ClientType } from "../type"


const Client = () => {
  const { clientId } = useParams()
  const client: ClientType | undefined = useSelector((state: RootState) => selectClientById(state, Number(clientId)))
  if (!client) return (<div>Client not found</div>)

  return (
    <ClientForm client={ client } />
  )
}

type ClientFormProps = {
  client: ClientType
}

const ClientForm:React.FC<ClientFormProps> = ({ client, ...restProps }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState(client.name)
  const [shouldShow, setShouldShow] = useState(false)
  const navigateToClients = useNavigate()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const reinitializeForm = () => {
    setName('')
  }

  const handleClick = () => {
    dispatch(
      updateClient({
        id: client.id,
        name: name,
      })
    )

    reinitializeForm()

    setShouldShow(true)

    setTimeout(() => {
      setShouldShow(false)
      navigateToClients('/clients')
    }, 2000)

  }

  return (
    <div>
      <FlashMessage shouldShow={ shouldShow } message="Client updated" />
      <div { ...restProps }>
        <h2>Update client</h2>
        <label htmlFor="name">Name: </label>
        <input name="name" type="text" onChange={ handleNameChange } value={ name }/>
        <button onClick={ handleClick }>Update</button>
        <Link to="/clients"><button>Back</button></Link>
      </div>
    </div>
  )
}

export default styled(Client)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  button {
    margin-top: 10px;
  }
`
