import React, { useState } from "react";

const Filter = (props) => {
  const { filterFunction } = props;
  return (
    <p>
      filter shown with<input onChange={(e) => filterFunction(e)}></input>
    </p>
  );
};

const PersonForm = (props) => {
  const { handleNameChange, handleNumberChange, handleClick } = props;
  return (
    <form>
      <div>
        name:{" "}
        <input type="text" id="name" onChange={(e) => handleNameChange(e)} />
      </div>
      <div>
        number:
        <input
          type="text"
          id="number"
          onChange={(e) => handleNumberChange(e)}
        ></input>
      </div>
      <div>
        <button type="submit" onClick={(e) => handleClick(e)}>
          add
        </button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  const { persons, filterName } = props;
  return persons
    .filter((name) =>
      name.name.toLowerCase().includes(filterName.toLowerCase())
    )
    .map((person) => {
      return (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      );
    });
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  function handleClick(e) {
    e.preventDefault();
    if (persons.filter((name) => name.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      });
      setPersons(newPerson);
    }
  }
  function handleNameChange(e) {
    setNewName(e.target.value);
  }
  function handleNumberChange(e) {
    setNewNumber(e.target.value);
  }
  function filterFunction(e) {
    setFilterName(e.target.value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterFunction={filterFunction}></Filter>
      <h3>add a new</h3>
      <PersonForm
        handleClick={handleClick}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      ></PersonForm>
      <h3>Numbers</h3>
      <Persons persons={persons} filterName={filterName}></Persons>
    </div>
  );
};

export default App;
