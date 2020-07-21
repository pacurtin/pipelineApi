import React, {useEffect, useState} from 'react';
import PersonsTable from "./PersonsTable";
import PersonForm from "./PersonForm";
import {addPerson, errorHandler, getPersons} from "./apiCalls";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';


/*
    Basic frontend to allow adding person in the pipeline API
 */
function App() {

  const [persons,setPersons] = useState([]);
  const [open,setOpen] = useState(false);
  const [message,setMessage] = useState('');
  const [severity,setSeverity] = useState('error');


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

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleSnackClose = () => {
    setOpen(false);
  };

  const displayMessage = (newMessage, newSeverity) => {
    if(newMessage && newSeverity){
      setMessage(newMessage);
      setSeverity(newSeverity);
      setOpen(true);
    }
  };

  function updateTable(newPerson) {
    setPersons(prevState => {
      return prevState.concat(newPerson);
    })
  }

  function newPerson(name,email,phone){
    addPerson(name,email,phone)
      .then((response) => {
        updateTable(response.data.data);
        displayMessage('Person added successfully.', 'success');
      })
      .catch((error) => {
        errorHandler(error);
        displayMessage('Failed to add person. Please try again', 'error');
      });
  }

  return (
    <div className="App">
      <h2>Add a Person</h2>
      <PersonForm onSubmit={newPerson}/>
      <h2>Existing Persons</h2>
      <PersonsTable persons={persons}/>
      <Snackbar
        anchorOrigin={{'vertical':'top', 'horizontal':'right'}}
        open={open}
        autoHideDuration={5000}
        onClose={handleSnackClose}>
        <Alert
          onClose={handleSnackClose}
          severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
