import React, {useEffect, useState} from 'react';
import PersonsTable from "./PersonsTable";
import PersonForm from "./PersonForm";
import {addPerson, editPerson, errorHandler, getPersons} from "./apiCalls";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";


/*
    Basic frontend to allow adding person in the pipeline API
 */
function App() {

  const [persons,setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackOpen,setSnackOpen] = useState(false);
  const [message,setMessage] = useState('');
  const [severity,setSeverity] = useState('error');
  const [editDialogOpen,setEditDialogOpen] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // useEffect with no dependencies will only run once
  useEffect(() =>
    {
      getPersons()
        .then((response) => {
          setPersons(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          errorHandler(error);
          setLoading(false);
          displayMessage('Failed to retrieve Persons data. Try refreshing the page.', 'error');
        });
    }, []
  );

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const displayMessage = (newMessage, newSeverity) => {
    if(newMessage && newSeverity){
      setMessage(newMessage);
      setSeverity(newSeverity);
      setSnackOpen(true);
    }
  };

  function addPersonToTable(newPerson) {
    setPersons(prevState => {
      return prevState.concat(newPerson);
    })
  }

  function editPersonInTable(changedPerson) {
    setPersons(prevState => {
      return prevState.map( existingPerson => {
        return existingPerson.id===changedPerson.id ? changedPerson : existingPerson
      });
    })
  }

  function clearFormData(){
    setId('');
    setName('');
    setPhone('');
    setEmail('');
    setEditDialogOpen(false);
  }

  function newPerson(){
    addPerson(name,email,phone)
      .then((response) => {
        addPersonToTable(response.data.data);
        displayMessage('Person added successfully.', 'success');
        clearFormData();
      })
      .catch((error) => {
        errorHandler(error);
        displayMessage('Failed to add person. Please try again', 'error');
      });
  }

  function changePerson(){
    editPerson(id,name,email,phone)
      .then((response) => {
        editPersonInTable(response.data.data);
        displayMessage('Person edited successfully.', 'success');
        clearFormData();
      })
      .catch((error) => {
        errorHandler(error);
        displayMessage('Failed to edit person. Please try again', 'error');
      });
  }

  const openEditDialog = (id, name, email, phone) => {
    setId(id);
    setName(name);
    setPhone(phone);
    setEmail(email);
    setEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    clearFormData();
    setEditDialogOpen(false);
  };

  return (
    <div className="App">
      <h2>Add a Person</h2>
      <PersonForm
        onSubmit={newPerson}
        name={editDialogOpen?'':name}
        setName={setName}
        email={editDialogOpen?'':email}
        setEmail={setEmail}
        phone={editDialogOpen?'':phone}
        setPhone={setPhone}
      />
      <h2>Existing Persons</h2>
      <PersonsTable
        persons={persons}
        openEditModal={openEditDialog}
        loading={loading}
      />
      <Snackbar
        anchorOrigin={{'vertical':'top', 'horizontal':'right'}}
        open={snackOpen}
        autoHideDuration={5000}
        onClose={handleSnackClose}>
        <Alert
          onClose={handleSnackClose}
          severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Dialog
        onClose={handleDialogClose}
        aria-labelledby="edit-person"
        open={editDialogOpen}>
        <DialogTitle id="edit-person">Edit Person</DialogTitle>
        <PersonForm
          onSubmit={changePerson}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
        />
      </Dialog>
    </div>
  );
}

export default App;
