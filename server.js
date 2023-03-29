express = require('express')
const bodyParser = require('body-parser');
const passport = require('./passport')
const portnumber = 4000

app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

computeRouter = require('./routes/compute.js')
app.use('/compute',passport.authenticate('jwt', {session:false}), computeRouter)

const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

app.set("view engine", "ejs")

console.log("Listening on port: ", portnumber)
app.listen(portnumber)