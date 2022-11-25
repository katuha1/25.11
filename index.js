const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");


const app = express();
const server = http.createServer(app);
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by");

app.use((err, req, res, next) => {
	logger.error(err.stack);
	res.status(500).send("Вы сломали сервер!");
});

app.use((err, req, res, next) => {
	if (error instanceof ForbiddenError) {
		return res.status(403).send({
			status: "forbidden",
			message: error.message,
		});
	}
});

app.set('view engine', 'pug')

app.use(express.static("views"));

app.use('/dashboard', function (request, response) {
  response.render('dashboard')
})

app.post('/login', function(request, response, next) {
	let req = request.body;
	
	// Запись в файл пиши здесь
	
	
	// Посмотри вывод в консоли
	console.log(req)
	
	// Нужно записывать в словарь.
	// Пример: 
	// {
	//	1: {taskName: '', description: '', datetask: '', author: ''}, 
	// 	2: {taskName: '', description: '', datetask: '', author: ''},
	// 	3: {taskName: '', description: '', datetask: '', author: ''}
	// }
	// Номер записки: Данные записки
	
})
	
	
	next();
  (request, response) => {
  response.render('dashboard')
};

server.listen(port, () => {
	console.log("\x1b[35m%s\x1b[0m", `The server is running on the port ${port}`);
	console.log("\x1b[32m%s\x1b[0m", `http://localhost:${port}/`);
});
