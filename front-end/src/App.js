import React, {useEffect, useState} from 'react';
import PersonsTable from "./PersonsTable";
import NewPerson from "./NewPerson";
import {errorHandler, getPersons} from "./apiCalls";

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
      <h2>Persons</h2>
      <NewPerson addPerson={null}/>
      <PersonsTable persons={persons}/>
    </div>
  );
}

export default App;
