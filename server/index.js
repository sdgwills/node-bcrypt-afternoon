require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController')

const app = express();
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json());
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}))

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log(`Database INITIALIZED!`);
})

app.post('/auth/register', authCtrl.register)

app.listen(SERVER_PORT, () => {
  console.log(`I see dead people on port ${SERVER_PORT}`);
});
