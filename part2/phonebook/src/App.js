import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  function handleClick(e) {
    e.preventDefault();
    if (persons.filter((name) => name.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = persons.concat({ name: newName, number: newNumber });
      setPersons(newPerson);
    }
  }
  function handleNameChange(e) {
    setNewName(e.target.value);
  }
  function handleNumberChange(e) {
    setNewNumber(e.target.value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filter shown with<input></input>
      </p>
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <p>
            {person.name} {person.number}
          </p>
        );
      })}
    </div>
  );
};

export default App;
