import { scanSchema } from './models/scanModel';
require('./dbConnenction/databaseConnection');
const mongoose = require('mongoose');
const cors = require('cors');

import express, { Express, response } from 'express';


const app: Express = express();
app.use(cors());
const schemaScan: any = new mongoose.model("Scan", scanSchema)


app.use(express.json())


// Get API CALL

app.get('/allScans', (req, res, next) => {
    schemaScan.find().then((result: any) => {
        console.log(result);
        res.status(200).json({
            allData: result
        })
    })
        .catch((error: any) => {
            console.log(error);
        })
})


// POST API CALL

app.post('/savescan', async (req, res) => {
    console.log("Inside Post Function");
    const DataToSave = new schemaScan({
        id: new mongoose.Types.ObjectId(),
        status: req.body.status,
        repositoryName: req.body.repositoryName,
        findings: [{ type: req.body.findings[0].type, ruleID: req.body.findings[0].ruleID, location: { path: req.body.findings[0].location.path, positions: { begin: { line: req.body.findings[0].location.positions.begin.line } } }, metadata: { description: req.body.findings[0].metadata.description, severity: req.body.findings[0].metadata.severity } }],
        queuedAt: req.body.queuedAt,
        scanningAt: req.body.scanningAt,
        finishedAt: req.body.finishedAt
    })
    let resp = await DataToSave.save()
    res.json(resp);
})


// DELETE API CALL
app.delete('/delete/:id', (req, res) => {
    console.log("Listening")
    let delId = req.params.id;
    const deleteSchema: any = new mongoose.model("Scan", scanSchema)
    deleteSchema.findByIdAndDelete(req.params.id).then((blog: any)=>{
        if (!blog)
        {
            return res.status(404).send();
        }
        res.send(blog);
    }).catch((error: any)=>{
        res.send(500).send(error);
    })
    // res.send("Deleted ID");

})

// PUT API CALL

app.put("/put/:id",(req,res)=>{
    const getOneSchema: any = new mongoose.model("Scan", scanSchema)
    getOneSchema.findOne({_id:req.params.id},{$set:{
        status: req.body.status,
        repositoryName: req.body.repositoryName,
        findings: [{ type: req.body.findings[0].type, ruleID: req.body.findings[0].ruleID, location: { path: req.body.findings[0].location.path, positions: { begin: { line: req.body.findings[0].location.positions.begin.line } } }, metadata: { description: req.body.findings[0].metadata.description, severity: req.body.findings[0].metadata.severity } }],
        queuedAt: req.body.queuedAt,
        scanningAt: req.body.scanningAt,
        finishedAt: req.body.finishedAt
    }}).then((result: any)=>{
        res.status(200).json(result)
    }).catch((err: any)=>{console.log(err)})
})



// Get Single Data API CALL

app.get("/getOneRecord/:id",(req,res)=>{
    const getRecordSchema: any = new mongoose.model("Scan", scanSchema)
    getRecordSchema.findOne({_id: req.params.id}).then((result: any)=>{
        res.status(200).json({
            allData: result
        })
    }).catch((err: any)=>{console.log(err)})
})


// Server Listening
app.listen(4000, () => {
    console.log("Welcome to Typescript Express");
})