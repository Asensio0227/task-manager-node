const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTask = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
});

const createTask = asyncWrapper(async (req, res) => {
  const tasks = await Task.create(req.body)
  res.status(201).json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const tasks = await Task.findOne({ _id: taskID });
  if (!tasks) {
    return next(createCustomError(`No task with id : ${taskID}`))
  }

  res.status(200).json({ tasks })
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const tasks = await Task.findOneAndDelete({ _id: taskID });

  if (!tasks) {
    return next(createCustomError(`No task with id : ${taskID}`))
  }

  res.status(200).json({ tasks });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })
})


module.exports = {
  getAllTask,
  createTask,
  getTask,
  deleteTask,
  updateTask
};