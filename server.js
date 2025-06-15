const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello, SYNCE-BE!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
