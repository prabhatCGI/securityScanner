// import { mongoose } from 'mongoose';
const mongoose = require('mongoose');

// Database Schema 

export const scanSchema = new mongoose.Schema({
    id: {type: mongoose.ObjectId},
    status: {type:String},
    repositoryName: {type:String},
    findings:[{type:{type:String}, ruleID: {type:String}, location:{path:{type:String}, positions:{begin:{line:{type:Number}}}}, metadata:{description:{type:String}, severity:{type:String}}}],
    queuedAt: {type:Date},
    scanningAt: {type:Date},
    finishedAt: {type:Date}
}) 

// Testing and Export
const scanTest = new mongoose.model("Scan", scanSchema);
console.log(Date.now())
module.exports = mongoose.model("Scan", scanSchema);
let data = scanTest.find({});
console.log(data);