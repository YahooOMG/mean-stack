authSecret = 'FQVupPZpkYxd3jjlgas_WI4F0NdJJVpZVIfHN4Z0VL' +
'fXTOBtSTg7-9re758AWL24hAqLsBlDXYjc0VQMgPZegoy' +
'AKrOVegpI3JKWGhKQFwhNIx7gF3SlgA8B7k6xLxS_IKhzPlthL' +
'OMyRtp5E42Sa8u2p5FwMvSNVgMJmCjig8AjaQP3IMSbHiZQEfzS2Y8WRuraWsdOR0qKXQ' +
'-jBHstDVgBm4er6lUiEL4ixn6lByrarJt41JxFuVQbAzId1k_4FJruez5KSAU2Ayd_rAUsKLGc8dxHArJ6I28M_Ie2126JJMzN2Z9v_vCAS1zLqMRVk' +
'-yTD87F90c_rHczI-7nqQ';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

mongoose
  .connect(
    'mongodb+srv://karen:V8lVAYPwy2253n3I@cluster0-1qhch.mongodb.net/node-angular?retryWrites=true',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to Database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
