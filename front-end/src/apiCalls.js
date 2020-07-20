import axios from 'axios';

/*
*     Functions for making calls to the Pipeline API vi the express server
* */

// get all person entries
export function getPersons() {
  return axios.get("/persons");
}
