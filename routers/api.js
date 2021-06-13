const router = require('express').Router();
const User = require('../controllers/user.controller');
const Weather = require('../controllers/weather.controller');
const Admin = require('../controllers/admin.controller');
const { checkUserJwt, checkAdminJwt } = require('../middlewares/check-Permission');


router.post('/newUser', User.newUser);
router.get('/getHistoryByjwt/', checkUserJwt, User.getHistoryByjwt);
router.post('/loginUser', User.loginUser);
router.get('/getUserByJwt', checkUserJwt, User.getUserByJwt);
router.patch('/updateUserByJwt', checkUserJwt, User.updateUserByJwt);


router.get('/getWeatherByCityName/:cityName', checkUserJwt, Weather.getWeatherByCityName);
router.delete('/deleteFromHistoryByWeatherId', checkUserJwt, Weather.deleteFromHistoryByWeatherId);
router.get('/getWeatherById/:weatherId', Weather.getWeatherById);

router.get('/getAllUsers', checkAdminJwt, Admin.getAllUsers);
router.post('/createAdmin', Admin.createAdmin);
router.post('/loginAdmin', Admin.loginAdmin);
router.patch('/updateAdminByJwt', checkAdminJwt, Admin.updateAdminByJwt);
router.delete('/deleteUserById', checkAdminJwt, Admin.deleteUserById);

module.exports = router;