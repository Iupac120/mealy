const User = require('../model/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')


const register = async(req,res) => {
    const duplicate = await User.findOne({email: req.body.email})
    if (duplicate) throw new BadRequestError('You already have an account')
    const newUser = await User.create({...req.body})
    const token = newUser.jwtToken()
    res.status(StatusCodes.CREATED).json({user:{name:newUser.name}, token})
}

module.exports = {
    register
}