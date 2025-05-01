const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const cropRoutes = require('./routes/crop');
const soilRoutes = require('./routes/soil');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/crop', cropRoutes);
app.use('/api/soil', soilRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('🌱 Bhoomitra Backend is running');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
