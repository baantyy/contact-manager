const express = require("express")
const _ = require("lodash")
const router = express.Router()
const { User } = require("../../models/User")
const { Contact } = require("../../models/Contact")
const { authUser } = require("../../middlewares/auth")
const { userAccess } = require("../../middlewares/access")

//localhost:3000/admin/contacts
router.get("/contacts",authUser,userAccess,function(req,res){
    Contact.find()
        .then(function(){
            res.send(contacts)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/admin/users
router.get("/users",authUser,userAccess,function(req,res){
    User.find()
        .then(function(users){
            res.send(users)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/admin/users
router.post("/users",authUser,userAccess,function(req,res){
    const body = _.pick(req.body,["username","email","password","roles"])
    const user = new User(body)
    user.save()
        .then(function(user){
            res.send(user)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/admin/users/:id
router.put("/users/:id",authUser,userAccess,function(req,res){
    const id = req.params.id
    const body = _.pick(req.body,["allowAccess"])
    User.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then(function (user) {
            if (user) {
                res.send({
                    user,
                    notice: 'successfully udated user access'
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
    adminRouter : router
}