const express = require('express');
const cors = require('cors');
require('dotenv').config();

require('./config/database');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// app.use('/api/v1', require('./routes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
