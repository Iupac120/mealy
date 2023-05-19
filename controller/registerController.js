const User = require('../model/User')
const {createCustomError} = require('../errors/custom-error')

const register = async(req,res) => {
 try{
    const {name, password} = req.body
 }catch(err){
    return next(createCustomError('Something went wrong with registration',500))
 }
}

module.exports = {
    register
}