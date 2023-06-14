const mongoose = require('mongoose');
//import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TaskSchema = Schema({
  title: String,
  description: String,
  deadline:String,
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('tasks', TaskSchema);


