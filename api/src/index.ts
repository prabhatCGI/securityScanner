import { scanSchema } from './models/scanModel';
require('./dbConnenction/databaseConnection');
const mongoose = require('mongoose');
const cors = require('cors');

import express, { Express } from 'express';


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
    deleteSchema.findOneAndDelete(({ id: delId }))
})


// Server Listening
app.listen(4000, () => {
    console.log("Welcome to Typescript Express");
})