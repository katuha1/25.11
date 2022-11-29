const http = require("http");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require("jsonfile");
const app = express();

const server = http.createServer(app);
const port = 3000;
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(cors());
app.use(morgan("dev"));
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.use(express.static("views"));
// ---

const JsonFile = path.join(__dirname, "/data.json")

function parameters() {
  return {listTask: jsonfile.readFileSync(JsonFile)}
}


app.post('/dashboard/addtask', urlencodedParser, (request, response) => {
  if (!request.body) return response.sendStatus(400)
  const data_task = {
	task_id: parameters().listTask.length+1,
	head: request.body.head,
    description: request.body.desc,
    date: request.body.date,
    author: request.body.author,
    statusTask: "wait"
  };
  
  jsonfile.readFile(JsonFile, (error, object) => {
	  if (error) throw error
	  object.push(data_task);
	  jsonfile.writeFile(JsonFile, object, { spaces: 2 }, (error) => {
		  if (error) throw error;
	  });
  });
  response.redirect(303, '/dashboard')
});

app.post('/dashboard/deletetask/:id', (request, response) => {
  jsonfile.readFile(JsonFile, (error, object) => {
    if (error) throw error
    for(let i = 0; i < object.length; i++) {
      if (object[i].task_id == request.params.id) {
        object.splice(i, 1)
      }
    }
	
    jsonfile.writeFile(JsonFile, object, { spaces: 2 }, (error) => {
      if (error) throw error;
    });
  });
  response.redirect(303, '/dashboard');
});


app.get('/dashboard', function (request, response) {
  response.render('dashboard', parameters())
})

// ---
server.listen(port, () => {
	console.log("\x1b[35m%s\x1b[0m", `The server is running on the port ${port}`);
	console.log("\x1b[32m%s\x1b[0m", `http://localhost:${port}/`);
});




