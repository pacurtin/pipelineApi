import axios from 'axios';

/*
*     Functions for making calls to the Pipeline API vi the express server
* */

export function errorHandler(error) {
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    console.log(error.request);
  } else {
    // Something happened in setting up the request and triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
}

// get all person entries
export function getPersons() {
  return axios.get("/persons");
}

// add a new person
export function addPerson(name,email,phone) {
  return axios.post("/persons", {
    name: name,
    email: email,
    phone: phone
  });
}

// edit existing person
export function editPerson(id,name,email,phone) {
  return axios.put("/persons", {
    id: id,
    name: name,
    email: email,
    phone: phone
  });
}
