import styled from "styled-components"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import FlashMessage from "../../../ui/FlashMessage"
import { addNewClient, selectAllClients } from "../slice"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "../../../store"

const AddClient = ({ ...restProps }) => {
  const dispatch = useDispatch()<any>
  const clients = useSelector(selectAllClients)
  const [name, setName] = useState('')
  const [shouldShow, setShouldShow] = useState(false)
  const navigateToClients = useNavigate()
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave =
  [name].every(Boolean) && addRequestStatus === 'idle'

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const reinitializeForm = () => {
    setName('')
  }

  const handleClick = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')

        await dispatch(
          addNewClient({
            id: clients.length + 1,
            name: name,
          })
        ).unwrap()

        reinitializeForm()

        setShouldShow(true)

        setTimeout(() => {
          setShouldShow(false)
          setAddRequestStatus('idle')
          // navigateToClients('/clients')
        }, 2000)
      } catch (err) {
        console.error('Failed to save the client: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  return (
    <div>
      <FlashMessage shouldShow={ shouldShow } message="Client added" />
      <div { ...restProps }>
        <h2>Add a new client</h2>
        <label htmlFor="name">Name: </label>
        <input name="name" type="text" onChange={ handleNameChange } value={ name }/>
        <button onClick={ handleClick }>Add</button>
        <Link to="/clients"><button>Back</button></Link>
      </div>
    </div>
  )
}

export default styled(AddClient)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  button {
    margin-top: 10px;
  }
`
