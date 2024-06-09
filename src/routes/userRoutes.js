const express = require('express');
const { createUser, updateUser, listUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.get('/users', listUsers);

module.exports = router;
