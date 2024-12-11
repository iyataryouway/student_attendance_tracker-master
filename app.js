const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;
const uri = process.env.MONGO_URI;
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger.yaml');
const authRoutes = require('./routes/authRoutes.js');
const studentRoutes = require('./routes/studentRoutes.js');
const cookieParser = require('cookie-parser');


app.set('view engine', 'ejs');
app.set('views', './views');


//Serve the definition file
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use('/', authRoutes);
app.use('/', studentRoutes);



//Connect to MongoDB
mongoose.connect(uri).then(
    async () =>{
      console.log('Connected to Mongo DB.');
  
      app.listen(PORT, () =>{
        console.log(`Connected on port ${PORT}`);
    });
    }
).catch((err) =>{ console.log(`Error connecting to database: ${err}`) });
