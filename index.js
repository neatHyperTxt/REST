const { red } = require('colors');
const express = require('express');
const app = express();
const path = require('path');
const {v4:uuid} = require('uuid');
uuid();
const comments = [
    {
        username:'Joey',
        comment:'How You Doin',
        id:uuid()
    },
    {
        username:'Chandler',
        comment:'Hey There Good Lookin',
        id:uuid()
    },
    {
        username:'James Bond',
        comment:`The Name's Bond, James Bond`,
        id:uuid()
    }
]

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.listen(3000,()=>
{
    console.log("Listening to Port 3000");
})
app.get('/tacos',(req,res)=>
{
    res.send('GET/Tacos Response');
})
app.post('/tacos',(req,res)=>
{
    console.log(req.body);
    const {meat,qty} = req.body;
    res.send(`Okay, Here are your ${qty} ${meat} Tacos`);
})
app.get('/',(req,res)=>
{
    res.render('comments/new');
})
app.get('/comments',(req,res)=>
{
    res.render('comments/index',{comments})
})
app.get('/comments/new',(req,res)=>
{
    res.render('comments/new');
})
app.post('/comments',(req,res)=>
{
    const {username,comment} = req.body;
    comments.push({username,comment,id:uuid()});
    res.redirect('/comments');
})

app.get('/comments/:id',(req,res)=>
{
    const {id} = req.params;
    console.log(id);
    const commen = comments.find(c => c.id=== id);
    res.render('comments/show',{id,commen});
})