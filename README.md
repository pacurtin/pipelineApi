Run `npm i` in the pipelineApi directory to get the server dependencies and then `npm i` in the front-end directory to get the client dependencies.
<br/>
<br/>
Then run `npm start` from pipelineApi to start the server. Visit `http://localhost:3001` to try the demo.
<br/>
<br/>
For dev mode run `npm run-script start-server` from pipelineApi dir and `npm start` from front-end dir.
<br/><br/>
<br/><br/>
<strong>Alternatively</strong> use docker compose.
<br/><br/>
Run `npm run docker-build` followed by `npm run docker-up` in the pipelineApi directory. This launches the express server on 3001 with a mongoDB image.
