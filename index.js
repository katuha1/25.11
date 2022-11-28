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
let file = jsonfile.readFileSync(JsonFile);
let parameters = (task_id) => {
	return {
      listTask: file,
  }
}

app.post('/dashboard/addtask', urlencodedParser, (request, response) => {
  if (!request.body) return response.sendStatus(400)
  const data_task = {
	task_id: file.length+1,
	head: request.body.head,
    description: request.body.desc,
    date: request.body.date,
    author: request.body.author,
    statusTask: "wait"
  };
  
  jsonfile.readFile(JsonFile, (error, object) => {
	  if (error) throw error
	  object.push(data_task);
	  file.push(data_task);
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
		file.splice(i, 1)
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

/*
app.delete('/dashboard/deleteTask/:id', (req, res) => {
  jsonfile.readFile(filePath, (err, obj) => {
    if (err) throw err
    let fileObj = obj;
    for(let i = 0; i < fileObj.length; i++) {
      if (fileObj[i].id == req.params.id) {
        fileObj.splice(i, 1)
        file.splice(i, 1)
      }
    }
    jsonfile.writeFile(filePath, fileObj, { spaces: 2 }, (err) => {
      if (err) throw err;
    })
  })
  res.redirect(303, '/dashboard')
})

app.put('/dashboard/updateTask/:id', urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400)
  let prev = file[req.params.id];
  console.log(req.body.worker)
  const user = {
    id: prev.id,
    priority: prev.priority,
    info: req.body.info,
    dl: req.body.deadline,
    header: prev.header,
    worker: req.body.worker,
    tag: req.body.tag,
    color: prev.color,
    openStatus: true,
    expandStatus: false,
    progress: req.body.progressBar
  }
  console.log(user)
  jsonfile.readFile(filePath, (err, obj) => {
    if (err) throw err
    let fileObj = obj;
    for (let i = 0; i < fileObj.length; i++) {
      if(fileObj[i].id == req.params.id) {
        fileObj[i] = user
        file[i] = user
      }
    }
    jsonfile.writeFile(filePath, fileObj, { spaces: 2 }, (err) => {
      if (err) throw err;
    })
  })
})

app.post('/dashboard/closeTask/:id', (req, res) => {
  jsonfile.readFile(filePath, (err, obj) => {
    if (err) throw err
    let fileObj = obj;
    for (let i = 0; i < fileObj.length; i++) {
      if(fileObj[i].id == req.params.id) {
        fileObj[i].openStatus = false
        fileObj[i].progress = 100
        file[i].progress = 100
        file[i].openStatus = false
      }
    }
    jsonfile.writeFile(filePath, fileObj, { spaces: 2 }, (err) => {
      if (err) throw err;
    })
  })
  res.redirect('/dashboard')
})

app.post('/dashboard/resetTask/:id', (req, res) => {
  jsonfile.readFile(filePath, (err, obj) => {
    if (err) throw err
    let fileObj = obj;
    for (let i = 0; i < fileObj.length; i++) {
      if(fileObj[i].id == req.params.id) {
        fileObj[i].openStatus = true
        fileObj[i].progress = 90
        file[i].openStatus = true
        file[i].progress = 90
      }
    }
    jsonfile.writeFile(filePath, fileObj, { spaces: 2 }, (err) => {
      if (err) throw err;
    })
  })
  res.redirect('/dashboard/closedTasks')
})
*/

// ---
server.listen(port, () => {
	console.log("\x1b[35m%s\x1b[0m", `The server is running on the port ${port}`);
	console.log("\x1b[32m%s\x1b[0m", `http://localhost:${port}/`);
});




