const express = require('express');
const router = express.Router();

// Import DummyDataController
const {
  getUsers: getUsersDummy,
} = require('../controllers/DummyDataController');

// Import UserController
const {
  getUsers: getUser,
  getUsersById,
  addUser,
  editUser,
  deleteUser,
} = require('../controllers/UserController');

router.get('/users-dummy', getUsersDummy);
router.get('/users', getUser);
router.get('/user/:id', getUsersById);
router.post('/user', addUser);
router.patch('/user/:id', editUser);
router.delete('/user/:id', deleteUser);

module.exports = router;
