const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:qOft08A8i6XRjFpt@sandbox.zy7nd.mongodb.net",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.get('/', (req, res) => {
// 	res.send('Hello World')
// })

// app.get('/hello', (req, res) => {
// 	res.send('Hello BENR2423')
// })

app.post('/login', async (req, res) => {
	const user = await User.login(req.body.username, req.body.password);
	if(user == true) {
		res.send('Login Successful');
	} else {
		res.send("Incorrect username or password");
	}
})

app.post('/register', async (req, res) => {
	const user = await User.register(req.body.username, req.body.password);
	if(user == "User created") {
		res.send("register successfully");
	} else {
		res.send("Failed, username already exists");
	}
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})