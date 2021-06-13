const jwt = require('jsonwebtoken');
const UserModel=require('../models/User.model');
const AdminModel=require('../models/Admin.model');

const checkUserJwt = async (req, res, next) => {
    let token = req.headers['authorization'];
    let userId = jwt.verify(token, process.env.SECRET);
    let user = await UserModel.findById(userId);
    if (user) {
        req.userId = userId;
        next();
    }
    else res.send("authorization failed, user not found");
}



const checkAdminJwt = async (req, res, next) => {
    let token = req.headers['authorization'];
    console.log("token!!!!!!", token);
    let adminId = jwt.verify(token, process.env.SECRET);
    let admin = await AdminModel.findById(adminId);
    if (admin) {
        req.adminId = adminId;
        next();
    }
    else res.send("authorization failed, admin not found");
}

module.exports = {checkUserJwt,checkAdminJwt};