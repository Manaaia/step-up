import FlashMessage from "../../../ui/FlashMessage"
import { useSelector, useDispatch } from "react-redux"
import { updateClient } from "../slice"
import { Link, useNavigate, useParams } from "react-router-dom"
import React, { useState } from "react"
import styled from "styled-components"

const Client = ({ ...restProps }) => {
  const clients = useSelector((state: any) => state.clients)
  const dispatch = useDispatch()
  const params = useParams()
  const client = clients.find((client: any) => client.id === parseInt(params.id))
  const [name, setName] = useState(client.name)
  const [surname, setSurname] = useState(client.surname)
  const [shouldShow, setShouldShow] = useState(false)
  const navigateToClients = useNavigate()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value)
  }

  const reinitializeForm = () => {
    setName('')
    setSurname('')
  }

  const handleClick = () => {
    dispatch(
      updateClient({
        id: client.id,
        name: name,
        surname: surname
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
        <label htmlFor="surname">Surname: </label>
        <input name="surname" type="text" onChange={ handleSurnameChange } value={ surname } />
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
