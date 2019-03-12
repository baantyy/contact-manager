const express = require("express")
const _ = require("lodash")
const router = express.Router()
const { User } = require("../models/User")
const { authUser } = require("../middlewares/auth")
const { userAccess } = require("../middlewares/access")

//localhost:3000/users/register
router.post("/register",function(req,res){
    const body = _.pick(req.body,["username","email","password"])
    //whitelist parameters
    //delete body.roles
    const user = new User(body)
    user.save()
        .then(function(user){
            res.send(user)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/users/login
router.post("/login",function(req,res){
    const body = _.pick(req.body,["email","password"])
    //body.ip = req.headers['x-real-ip'] || req.connection.remoteAddress

    User.findByCredentials(body.email,body.password)
        .then(function(user){
            if(user.tokens.length < 3){
                return user.generateToken()
            }else{
                res.send({notice: "Already logged in 3 times"})
            }
        })
        .then(function(token){
            res.setHeader("x-auth",token).send({})
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/users/account
router.get("/account",authUser,function(req,res){
    const { user } = req
    res.send(user)
})

//localhost:3000/users/logout
router.delete("/logout",authUser,function(req,res){
    const { user, token } = req
    //User.findByIdAndUpdate(user._id,{$pull: {tokens: {token: token}}})
    User.findByIdAndUpdate(user._id,{ tokens: [] })
        .then(function(){
            res.send("successfully logged out")
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    userRouter : router
}