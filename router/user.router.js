const express = require('express');
const { createUser, loginPage, viewAll, viewSingleUser, updateUser, deleteUsers, deleteUserByEmail } = require('../controller/user.controller');
const router = express.Router();




router.post('/create', createUser );
router.post('/login', loginPage);
router.get('/viewUsers', viewAll);
router.get('/viewUser/:email', viewSingleUser);
router.put('/update/:email', updateUser);
router.delete('/deleteAll', deleteUsers);
router.delete('/deleteUser/:email', deleteUserByEmail);







module.exports = router;