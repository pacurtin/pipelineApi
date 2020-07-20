import React from 'react';
import PersonsTable from "./PersonsTable";
/*
    Basic frontend to allow adding person in the pipeline API
 */

function App() {

  function createData(name, email, phone) {
    return { name, email, phone };
  }

  const persons = [
    createData('Jimmy', "Jim@gmail.com", "5041234567"),
    createData('John', "John@gmail.com", "5047654321"),
    createData('Reginald', "Reginald@gmail.com", "5041234123")
  ];

  return (
    <div className="App">
      <PersonsTable persons={persons}/>
    </div>
  );
}

export default App;
