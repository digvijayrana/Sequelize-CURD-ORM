const express =  require('express')
const app = express()
const cors = require('cors');
const path = require('path')

app.use(cors());
app.use(express({ limit: "100mb",parameterLimit:1000000,extended:true, }));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const postRoute = require('./routes/post')
app.use('/',express.static(path.join(__dirname, './public/uploads')));
app.use('/posts',postRoute)

app.get('/',(req,res)=>{
    res.send("Hello world")

});

module.exports = app