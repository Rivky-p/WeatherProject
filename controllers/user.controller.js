const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const mailer = require('../mailer');


const newUser = async (req, res) => {
    console.log("*****new user*****");
    try {
        let user = new User(req.body);
        await user.save();
        mailer.sendMail(user.email);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}



const loginUser = async (req, res) => {
    let user = await User.findOne({ email: req.body.email, password: req.body.password })
    if (user) {
        let token = jwt.sign(user._id.toJSON(), process.env.SECRET);
        res.status(200).json({ token })
    }
    res.status(200).send('the user was not found');

}



const getHistoryByjwt = async (req, res) => {
    try {
        let userId = req.userId;
        let user = await User.findById(userId).populate({
            path: 'requestsHistory'
        });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}


const getUserByJwt = async (req, res) => {
    try {
        let user = await User.findById(req.userId).populate('requestsHistory');
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).send(error)
    }
}


const updateUserByJwt = async (req, res) => {
    try {
        console.log(req.userId);
        await User.findByIdAndUpdate(req.userId, req.body);
        res.status(200).json({ message: 'user was updated successfully' });
    }
    catch (error) {
        res.status(500).send(error)
    }
}


module.exports = { newUser, loginUser, getHistoryByjwt, getUserByJwt, updateUserByJwt }