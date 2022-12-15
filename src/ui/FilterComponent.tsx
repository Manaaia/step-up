import styled from "styled-components"
import React, { useState } from "react"

type Element = {
  id: number,
  name: string,
  surname: string,
}

type FilterContentProps = {
  list: Element[],
  setter: React.Dispatch<React.SetStateAction<Element[]>>,
}

const FilterContent: React.FC<FilterContentProps> = ({
  list,
  setter,
}) => {
  const [filter, setFilter] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const handleFilterClick = () => {
    setter(list.filter((element: Element) => {
      return element.name.includes(filter) || element.surname.includes(filter) || `${ element.name } ${ element.surname }`.includes(filter)
    } ))
  }

  return (
    <div>
      <input type="text" onChange={ handleChange } value={ filter } />
      <button onClick={ handleFilterClick }>Filter</button>
    </div>
  )
}

type FilterProps = {
  isOpen: boolean,
  list: Element[],
  setter: React.Dispatch<React.SetStateAction<Element[]>>,
}

export const Filter: React.FC<FilterProps> = ({ isOpen, list, setter }) => {
  return (
    <div>
      <p>Filter</p>
      { isOpen && <FilterContent list={ list } setter= { setter } /> }
    </div>
  )
}

export const FilterComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  padding: 10px;
`
