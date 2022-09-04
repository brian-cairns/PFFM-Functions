const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const header = { 'content-type': 'application/json' }

const { MongoClient } = require('mongodb')
const uri = process.env.DB_URI
const dbName = 'PFFMdb'
const client = new MongoClient(uri)

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', async (req, res) => {
    const staffName = req.body.staff;
    const clientName = req.body.client;
    
})