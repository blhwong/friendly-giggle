require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

const entry = process.env.NODE_ENV === 'production' ? 'build' : 'public';

app.use(express.static(path.resolve(__dirname, entry)));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, entry, 'index.html'));
});

app.listen(process.env.PORT);
