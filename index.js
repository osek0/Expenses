const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const expenses = require('./routes/expenses');

mongoose.connect('mongodb://localhost:27017/expenses', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log('Connected to MongoDB successfully!'))
  .catch(() => console.log('Could not connect to MongoDB'));

const app = express();

app.use(express.json());
app.use(cors());
app.use('/exp', expenses);

app.listen(5001, () => console.log('Listening on port 5001'));