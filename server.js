const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const _axios = require('axios');
const axiosRetry = require('axios-retry');
const axios = _axios.create();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path');


// https://github.com/softonic/axios-retry/issues/87
const retryDelay = (retryNumber = 0) => {
  const seconds = Math.pow(2, retryNumber) * 1000;
  const randomMs = 1000 * Math.random();
  return seconds + randomMs;
};

// adds some resiliency against network errors
axiosRetry(axios, {
  retries: 2,
  retryDelay,
  // retry on Network Error & 5xx responses
  retryCondition: axiosRetry.isRetryableError,
});

const port = process.env.PORT;
const API = process.env.API_URL;
const KEY = process.env.API_KEY;


app.use('/', express.static(path.join(__dirname, 'front-end/build')));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// get all people
app.get('/persons', function(req,res) {
  axios
    .get(API+"/persons?start=0&api_token="+KEY)
    .then(response=>{
      res.send(response.data);
    })
    .catch(err=>{
      console.error(err);
    });
});

// add new person
app.post('/persons', function(req,res) {
  axios.post(API+'/persons?api_token='+KEY, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  }).then(response=>{
    res.send(response.data);
  })
  .catch(err=>{
    console.error(err);
  });
});

// update person details
app.put('/persons', function(req,res) {
  axios.put(API+'/persons/'+req.body.id+'?api_token='+KEY, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  }).then(response=>{
    res.send(response.data);
  })
    .catch(err=>{
      console.error(err);
    });
});
