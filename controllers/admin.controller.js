const Admin = require("../models/Admin.model");
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const mailer = require('../mailer');

const createAdmin = async (req, res) => {
    try {
        let admin = new Admin(req.body);
        await admin.save();
        mailer.sendMail(admin.email);
        res.status(200).json({ admin });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getAllUsers = async (req, res) => {
    try {
        let users = await User.find().populate('requestsHistory')
        if (users) {
            res.status(200).json({ users })
        }
        else res.status(200).send('there are no users')
    } catch (error) {
        res.status(500).json({ error })
    }
}

const loginAdmin = async (req, res) => {
    try {
        let admin = await Admin.findOne({ email: req.body.email, password: req.body.password })
        if (admin) {
            let token = jwt.sign(admin._id.toJSON(), process.env.SECRET);

            res.status(200).json({ token })
        }
        res.status(200).send('the admin was not found');

    } catch (error) {
        res.status(500).json({ error });
    }
}

const updateAdminByJwt = async (req, res) => {
    try {
        await Admin.findByIdAndUpdate(req.adminId, req.body);
        res.status(200).send('admin was updated successfully');
    } catch (error) {
        res.status(500).json({ error });
    }
}

const deleteUserById = async (req, res) => {
    try {
        let user = await User.findById(req.body.userId);
        await user.remove();
        res.status(200).send('user was deleted');
    } catch (error) {
        res.status(500).json({ error });
    }
}
module.exports = { createAdmin, loginAdmin, updateAdminByJwt, deleteUserById ,getAllUsers}