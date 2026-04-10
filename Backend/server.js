const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the Frontend directory
const frontendPath = path.join(__dirname, '../Frontend');
app.use(express.static(frontendPath));

// Middleware
app.use(express.json());

// A simple API endpoint
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from your simple backend server! Mission Accomplished. 🚀' });
});

// For any other routes, send the main index.html file
app.use((req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
