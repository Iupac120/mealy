const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please provide a name'],
        trim: true,
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

userSchema.pre('save', async function(){
        const salt = await bcrypt.genSalt(10)
        const userPassword = await bcrypt.hash(this.password, salt)
        return userPassword
})

module.exports = mongoose.model('User',userSchema)