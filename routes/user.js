const express = require('express');
const { getUser, getUsers, updateUser, deleteUser } = require('../controllers/user');

const router = express.Router();

router.route('/')
        .get(getUsers);

router.route('/:id')
        .get(getUser)
        .put(updateUser)
        .delete(deleteUser);

module.exports = router;