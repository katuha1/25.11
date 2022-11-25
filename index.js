const http = require("http");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const server = http.createServer(app);
const port = 3000;
const urlencodedParser = bodyParser.urlencoded({extended: false})

app.use(cors());
app.use(morgan("dev"));
app.disable("x-powered-by");

app.set('view engine', 'pug')
app.use(express.static("views"));
// ---

app.get('/dashboard', function (request, response) {
  response.render('dashboard')
})

app.post('/dashboard', urlencodedParser, function (request, response) {
  if (!request.body) return response.sendStatus(400)
  console.log(JSON.stringify(request.body))
  response.render('dashboard')
})

// ---
server.listen(port, () => {
	console.log("\x1b[35m%s\x1b[0m", `The server is running on the port ${port}`);
	console.log("\x1b[32m%s\x1b[0m", `http://localhost:${port}/`);
});




