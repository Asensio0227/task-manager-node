const express = require('express')
const routes = express.Router();
const {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/task');

routes.route('/').get(getAllTask).post(createTask);
routes.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);


module.exports = routes;