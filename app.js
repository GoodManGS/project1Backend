// app.js

const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Configure CORS
app.use(cors({
  origin: 'https://localhost:4200',
  credentials: true,
}));

// Middleware
app.use(bodyParser.json());
// ... any other middleware ...

// Routes
// Example route
app.get('/api/hello', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// SSL/TLS Certificates
const sslOptions = {
  key: fs.readFileSync('../certs/localhost-key.pem'),
  cert: fs.readFileSync('../certs/localhost.pem'),
};

// Start HTTPS Server
const PORT = process.env.PORT || 3000;

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`HTTPS Server running on https://localhost:${PORT}`);
});
