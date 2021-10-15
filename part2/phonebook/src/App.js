import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const { persons, filterName, setPersons } = props;
  return persons
    .filter((name) =>
      name.name.toLowerCase().includes(filterName.toLowerCase())
    )
    .map((person) => {
      return (
        <>
          <p key={person.id}>
            {person.name} {person.number}
          </p>
          <button onClick={() => deleteData(person, persons, setPersons)}>
            delete
          </button>
        </>
      );
    });
};

const makeRequest = (setPersons) => {
  axios
    .get("api/persons")
    .then((res) => {
      setPersons(res.data);
    })
    .catch((err) => {
      console.log(err.respone);
    });
};

const postData = (newName, newNumber, persons, setPersons) => {
  axios
    .post("api/persons", {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1,
    })
    .then((res) => {
      const newPerson = persons.concat(res.data);
      setPersons(newPerson);
    })
    .catch((err) => console.log(err.response));
};

const putData = (person, setPersons, newNumber, persons) => {
  axios
    .put(`api/persons/${person.id}`, {
      name: person.name,
      number: newNumber,
      id: person.id,
    })
    .then((res) => {
      const newPerson = persons.map((x) =>
        x.id === person.id ? { ...x, number: newNumber } : x
      );
      setPersons(newPerson);
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const deleteData = (person, persons, setPersons) => {
  if (window.confirm(`Delete ${person.name}`)) {
    axios.delete(`api/persons/${person.id}`).then((res) => {
      const newPerson = persons.filter((data) => data.id !== person.id);
      setPersons(newPerson);
    });
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  useEffect(() => {
    makeRequest(setPersons);
  }, []);
  function handleClick(e) {
    e.preventDefault();
    if (persons.filter((name) => name.name === newName).length > 0) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Want to replace the phone number?`
        )
      ) {
        const selectedPerson = persons.filter(
          (name) => name.name === newName
        )[0];
        putData(selectedPerson, setPersons, newNumber, persons);
      }
    } else {
      postData(newName, newNumber, persons, setPersons);
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
      <Persons
        persons={persons}
        filterName={filterName}
        setPersons={setPersons}
      ></Persons>
    </div>
  );
};

export default App;
