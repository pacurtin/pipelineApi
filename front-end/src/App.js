import React, {useEffect, useState} from 'react';
import PersonsTable from "./PersonsTable";
import PersonForm from "./PersonForm";
import {addPerson, errorHandler, getPersons} from "./apiCalls";

/*
    Basic frontend to allow adding person in the pipeline API
 */
function App() {

  const [persons,setPersons] = useState([]);

  // useEffect with no dependencies will only run once
  useEffect(() =>
    {
      getPersons()
        .then((response) => {
          setPersons(response.data.data);
        })
        .catch((error) => {
          errorHandler(error);
        });
    }, []
  );

  return (
    <div className="App">
      <h2>Add a Person</h2>
      <PersonForm onSubmit={addPerson}/>
      <h2>Existing Persons</h2>
      <PersonsTable persons={persons}/>
    </div>
  );
}

export default App;
