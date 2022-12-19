import styled from "styled-components"
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import FlashMessage from "../../../ui/FlashMessage"
import { addClient } from "../slice"

const AddClient = ({ ...restProps }) => {
  const clients = useSelector((state: any) => state.clients)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [shouldShow, setShouldShow] = useState(false)

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
      addClient({
        id: clients.length + 1,
        name: name,
        surname: surname
      })
    )

    reinitializeForm()

    setShouldShow(true)

    setTimeout(() => {
      setShouldShow(false)
    }, 2000)
  }

  return (
    <div>
      <FlashMessage shouldShow={ shouldShow } message="Client added" />
      <div { ...restProps }>
        <h2>Add a new client</h2>
        <label htmlFor="name">Name: </label>
        <input name="name" type="text" onChange={ handleNameChange } value={ name }/>
        <label htmlFor="surname">Surname: </label>
        <input name="surname" type="text" onChange={ handleSurnameChange } value={ surname } />
        <button onClick={ handleClick }>Add</button>
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
