const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/User');

const db = "mongodb+srv://archana:mydb@cluster0-p6p8r.mongodb.net/test?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended:false}));

mongoose
    .connect(db,{useNewUrlParser: true })
    .then(()=>console.log("DB Connected"))
    .catch(err => console.log(err));

app.get('/',(req,res) => res.json({
        msg: "Hello all Amingo!!!"
}));

app.post('/users',(req,res)=>{
    const newUser = new User(({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }))

    newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err))
});

app.get('/users',(req,res)=>{
    User.find()
        .then(user => res.json(user))
        .catch(err => console.log(err))

}); 

const port = process.env.port || 5000;

app.listen(port, ()=> console.log(`Your application is running @ http://localhost:${port}`));

 