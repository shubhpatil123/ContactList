const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact =require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'VIEWS'));
app.use(express.urlencoded());
app.use(express.static('assests'));
//creting our own middleware
//app.use(function(req,res,next){
  //  console.log('middleware 2 called');
   // next();
//})

var contactList = [
    {
        name:"Shubham",
        phone:"1111111111"
    },
    {
        name: "Tony Stark",
        phone: "123456789"
    },
    {
        name: "Coding Ninjas",
        phone: "2316537634"
    }
]


app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in Fetching contacts from DB');
            return;
        }

        return res.render('home',{title:"My Contact List",
        contact_list: contacts
    });
    });
    
});


app.get('/practice',function(req,res){
    return res.render('practice',{
        title:" Let us play with EJS"
    });
})


app.post('/create-contact', function(req,res){
   // contactList.push({
  //      name: req.body.name,
    //    phone:req.body.phone
    //});
   // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err, newContact){
        if(err){
            console.log('error in creating a contact!');
        return;}
        console.log('********',newContact);
        return res.redirect('back');
    } );

    //console.log(req.body);
    //return res.redirect('/practice');
});

app.get('/delete-contact', function(req,res){
    // get the id from query in the url
    let id= req.query.id;

    // find the contact in the database using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }

    return res.redirect('back');
    
});
});


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server',err);
    
    }
    console.log('Yup! My express server is running on port:',port);
});