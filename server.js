const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;
const API = process.env.API_URL;
const KEY = process.env.API_KEY;


app.get('/', (req, res) => res.send('Hello World! Server running.'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// get all people
app.get('/persons', function(req,res) {
  axios.get(API+"/persons?start=0&api_token="+KEY).then(response=>{
    res.send(response.data);
  });
});
