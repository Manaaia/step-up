import styled from "styled-components"
import React, { useState } from "react"

type FilterProps = {
  filterValue: string
  setFilterValue: (filter: string) => void,
  listToFilter: any[]
  filter: (listToFilter: any[], filter: string) => void
}

export const Filter: React.FC<FilterProps> = ({
  filterValue,
  setFilterValue,
  listToFilter,
  filter,
  ...restProps
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value)
  }

  const handleFilterClick = () => {
    filter(listToFilter, filterValue)
  }

  const handleResetClick = () => {
    setFilterValue('')
    filter(listToFilter, '')
  }

  return (
    <FilterComponent { ...restProps }>
        <p>Filter</p>
        { isOpen &&
          <div>
            <a className="reset-filter" onClick={ handleResetClick }>Reset</a>
            <input type="text" onChange={ handleChange } value={ filterValue } />
            <button className="filter-button" onClick={ handleFilterClick }>Filter</button>
          </div>
        }
      <button title="toggle" className="toggle-button" onClick={ () => setIsOpen(!isOpen) }>v</button>
    </FilterComponent>
  )
}


const FilterComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  border-radius: 15px;
  padding: 5px 15px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background-color: rgb(173, 216, 230);
  color: white;

  .toggle-button {
    background-color: rgb(173, 216, 230);
    border: none;
    border-radius: 50%;
    padding: 3px 12px;
    color: white;
    text-align: center;
    display: inline-block;
    font-size: 28px;
    cursor: pointer;
  }

  .toggle-button:hover {
    background-color: rgb(89, 173, 201);
  }

  input {
    border: none;
    border-radius: 15px;
    padding: 5px 15px;
    margin-right: 10px;
    margin-left: 10px;
  }

  .filter-button {
    background-color: rgb(173, 216, 230);
    border: 1px solid white;
    border-radius: 15px;
    padding: 5px 15px;
    color: white;
    text-align: center;
    display: inline-block;
    cursor: pointer;
  }

  .filter-button:hover {
    background-color: rgb(89, 173, 201);
    border-color: rgb(173, 216, 230);
  }

  .reset-filter {
    color: white;
    text-decoration: underline;
    cursor: pointer;
  }

  .reset-filter:hover {
    color: rgb(89, 173, 201);
  }
`
