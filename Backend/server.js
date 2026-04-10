const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/message', (req, res) => {
  res.status(200).json({ message: 'Hello from EC2 backend' });
});

app.get('/health', (req, res) => {
  res.status(200).send('ok');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
