const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please provide a name'],
        trim: true,
    },
    email:{
        type: String,
        required: [true, 'please enter your email'],
        minlength: 3,
        maxlength: 50,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'please provide a name'],
        trim: true,
        minlength:[6,'password must be grater than 6 character'],
        maxlength:[10,'password must not be greater than 10 character']
    }
},{
    timestamps: true
})

userSchema.pre('save', async function(next){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
})
userSchema.methods.jwtToken = function (){
    return jwt.sign({userId:this._id, name:this.name},process.env.ACCESS_TOKEN,{expiresIn:process.env.ACCESS_LIFETIME})
}

module.exports = mongoose.model('User',userSchema)