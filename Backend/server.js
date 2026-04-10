const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes (so the Vercel frontend can access this backend)
app.use(cors());

// Middleware
app.use(express.json());

// A simple API endpoint
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from your backend server running on EC2! 🚀' });
});

// Basic health check for EC2
app.use('/', (req, res) => {
    res.send('Backend is running and accepting requests!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
