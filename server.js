"use strict";

var app = require("express")();
var morgan = require("morgan");
var errorhandler = require("errorhandler");
var parser = require("body-parser");
var mongoose = require('mongoose');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/edx-course-db')

var mongoose = require('mongoose')
//mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/edx-course-db')

app.use(parser.json())
app.use(morgan('dev'))
app.use(errorhandler())

// Next, define Post and Comment schemas. Post has references (refs) to Comment using ObjectId type:

const Accounts = mongoose.model('Account', 
  { name: String,
    balance: Number
  } 
 )
 
//Use save(), remove(), find() and findById() Mongoose methods to save, remove and find documents. 

app.get('/accounts', (req, res) => {
    Accounts.find({}, (err, accounts) => {
        if (err) return res.status(400).send({Error: err})
        res.status(200).send(accounts)
    })
});

app.get('/account/:id', (req,res) => {
    Accounts.findById(req.params.id, (err, account) => {
        if (err) return res.status(400).send({Error: err})
        
        res.status(200).send(account)
    })
})

app.post("/account", (req, res) => {
    var account = new Accounts(req.body);
    account.save((err, account) => {
        if (err) return res.status(400).send({Error: err})
        console.log('Saved: ', account)
        res.status(201).send({accountId: account._id})
    })
});

app.put('/accounts/:id', (req, res) => {
    Accounts.findById(req.params.id, (err, account) => {
        if (err) return res.status(400).send({Error: err})

        account.save((err, account) => {
            if (err) return res.status(400).send({Error: err})

            res.status(200).send(account)
        })
    })
});

app.delete('/accounts/:id', (req,res) => {
    Accounts.findById(req.params.id, (err, account) => {
        if (err) return res.status(400).send({Error: err})

        Accounts.remove(req.params.id, (err, account) => {
            if (err) return res.status(400).send({Error: err})
            res.status(204).send()
        })
    })
});

console.log("Monta el servicio")
app.listen(3000);