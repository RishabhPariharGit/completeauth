require('dotenv').config();
const express = require('express')
const connectDB = require ('./Dbconn/dbconn')
const cors = require('cors');
const routes = require('./Routes/Route')
const app = express()
const port = 3000

app.use(cors());

connectDB();
app.use(express. json());

app.use('/', routes);
app.post('/register',routes);
app.post('/login',routes);
app.get('/protected',routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
