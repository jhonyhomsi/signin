const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(bodyParser.json());

// Add CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

// Replace with your own connection string
const connectionString = 'mongodb+srv://jhony-33:Serafim12@cluster0.j3va4xj.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('AppDatabase');
    const usersCollection = db.collection('users');

    app.post('/login', (req, res) => {
      const userData = req.body;
      usersCollection.findOne({ username: userData.username, password: userData.password })
        .then(result => {
          if (result) {
            res.sendStatus(200);
            console.log("connected!");
          } else {
            console.log("error!");
            res.sendStatus(401);
          }
        })
        .catch(error => {
          console.error(error);
          res.sendStatus(500);
        });
    });

    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  })
  .catch(error => console.error(error));