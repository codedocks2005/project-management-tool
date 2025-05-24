const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Dummy login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@example.com' && password === '1234') {
    res.json({ token: 'dummy-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Updated Kanban data with 3 lists
app.get('/api/kanban', (req, res) => {
  res.json({
    lists: [
      {
        id: 1,
        name: 'To Do',
        cards: [
          { id: 1, name: 'Card 1', content: 'Some content', date: '4 May' },
        ],
      },
      {
        id: 2,
        name: 'In Progress',
        cards: [
          { id: 3, name: 'Card 3', content: 'Working on it...', date: '6 May' },
        ],
      },
      {
        id: 3,
        name: 'Done',
        cards: [
          { id: 2, name: 'Card 2', content: 'Done content', date: '5 May' },
        ],
      },
    ],
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
