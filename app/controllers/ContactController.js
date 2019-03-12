const express = require('express')
const _ = require('lodash')
const router = express.Router() 
const { Contact } = require('../models/Contact')
const { authUser } = require("../middlewares/auth")

// localhost:3000/contacts
router.get('/', authUser, function (req, res) {
    Contact.find({
        user: req.user._id
    })
        .then(function (contacts) {
            res.send(contacts)
        })
        .catch(function (err) {
            res.send(err)
        })
})

// localhost:3000/contacts
router.post('/', authUser, function (req, res) {
    const body = _.pick(req.body,["name","email","mobile","city"]) 
    const contact = new Contact(body)
    contact.user = req.user._id
    contact.save()
        .then(function (contact) {
            res.send({
                contact,
                notice: 'successfully created a contact'
            })
        })
        .catch(function (err) {
            res.send(err)
        })
})

// localhost:3000/contacts/:id
router.get('/:id', authUser, function (req, res) {
    const id = req.params.id
    Contact.findOne({
        user: req.user._id,
        _id: id 
    })
        .then(function (contact) {
            if (contact) {
                res.send(contact)
            } else {
                res.status('404').send({})
            }
        })
        .catch(function (err) {
            res.send(err)
        })
})

//localhost:3000/contacts/:id
router.delete('/:id', authUser, function (req, res) {
    const id = req.params.id
    Contact.findOneAndDelete({
        _id: id, 
        user: req.user._id 
    })
        .then(function (contact) {
            if (contact) {
                res.send({
                    contact,
                    notice: 'successfully removed the contact'
                })
            } else {
                res.status('404').send({})
            }
        })
        .catch(function (err) {
            res.send(err)
        })
})

//localhost:3000/contacts/:id
router.put('/:id', authUser, function (req, res) {
    const id = req.params.id
    const body = _.pick(req.body,["name","email","mobile","city"])
    Contact.findOneAndUpdate({ _id: id, user: req.user._id}, body, { new: true, runValidators: true })
        .then(function (contact) {
            if (contact) {
                res.send({
                    contact,
                    notice: 'successfully udated the contact'
                })
            } else {
                res.status('404').send({})
            }
        })
        .catch(function (err) {
            res.send(err)
        })
})

module.exports = {
    contactRouter: router  
}