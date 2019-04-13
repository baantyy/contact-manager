const mongoose = require('mongoose')
const axios = require('axios')
const { genderApiKey, placeApiKey } = require('../../config/api_keys')

const Schema = mongoose.Schema
const contactSchema = new Schema({
    //user input
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    }, 
    city: {
        type: String
    },

    // generate
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    gender: {
        type: String
    },
    geo: {
        lat: String,
        lng: String
    }
})

function genderApi(name){
    const url = `https://gender-api.com/get?name=${name}&key=${genderApiKey}`
    return axios.get(url)
        .then(function(res){
            if(res.data.errmsg){
                return Promise.reject("Invalid Api Key")
            }else{
                return Promise.resolve(res.data.gender)
            }
        })
        .catch(function(err){
            return Promise.reject(err.message)
        })
}

function geoPlaceApi(city){
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}&inputtype=textquery&fields=geometry&key=${placeApiKey}`   
    return axios.get(url)
        .then(function(res){
            if(res.data.errmsg){
                return Promise.reject("Invalid Api Key")
            }else{
                const geo = {}
                geo.lat = res.data.candidates[0].geometry.location.lat
                geo.lng = res.data.candidates[0].geometry.location.lng
                return Promise.resolve(geo)
            }                
        })
        .catch(function(err){
            return Promise.reject(err.message)
        })
}

//pre hooks
contactSchema.pre("save",function(next){
    const contact = this
    if(contact.isNew){    

        return Promise.all([genderApi(contact.name), geoPlaceApi(contact.city)])
            .then(function(values){
                contact.gender = values[0]
                contact.geo.lat = values[1].lat
                contact.geo.lng = values[1].lng
                next()
            })
            .catch(function(err){
                contact.gender = ""
                contact.geo.lat = ""
                contact.geo.lng = ""
                next()
                //return Promise.reject(err.message)
            })
        
    }else{
        next()
    }
})

const Contact = mongoose.model('Contact', contactSchema) 

module.exports = {
    Contact
}