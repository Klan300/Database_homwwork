'use strict';
const express = require('express');
const MongoClient = require('mongodb').MongoClient; 
const assert = require('assert');
const fetch = require("node-fetch");
const Word = require('./model/game')
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'pantip';
// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true })

// Constants
const PORT = 8080;

// App
const app = express();

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const col = db.collection('students');

  app.use(express.json())

  app.get('/', (req, res) => {
    // Get first two documents that match the query
    col.find({}).toArray(function(err, docs) {
      assert.equal(null, err);
      res.send(JSON.stringify(docs));
      // client.close();
    });
  });

  app.post('/add', async (req,res) => {
    const payload = req.body;
    const word = new Word(payload);
    await col.insertOne(word);
    console.log('finish');
    res.sendStatus(200)
  })

  app.get('/:word', (req,res) => {
    const { word } = req.params
    const result = col.find({"word" : word})
    res.send(JSON.stringify(word));
  })

});


app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`)
