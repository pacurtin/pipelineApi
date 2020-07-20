import React from 'react';
import PersonsTable from "./PersonsTable";
/*
    Basic frontend to allow adding person in the pipeline API
 */

function App() {
  return (
    <div className="App">
      <PersonsTable persons={[]}/>
    </div>
  );
}

export default App;
