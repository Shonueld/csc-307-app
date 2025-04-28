import userModel from "../models/user.js";

function getUsers(name, job) {
  const filter = {};
  if (name) filter.name = name;
  if (job) filter.job = job;
  return userModel.find(filter);
}


function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function deleteUserById(id) { //wasnt in original code
    return userModel.findByIdAndDelete(id);
  }

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById,
};