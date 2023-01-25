require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const helmet = require('helmet');
const connectDB = require('./database/dbconnect');
const indexRoute = require('./router/user.router');








const app = express();
connectDB();




const port = process.env.PORT || 3079;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.use(helmet());
app.use(xss());



app.use('/intern', indexRoute );








app.listen(port, ()=>{
     console.log(`Backend-Intern is on port:http://localhost:${port}`);
  console.log(process.env.DEVELOPMENT? 'development' : 'production');
})