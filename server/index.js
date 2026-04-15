import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

let people = [];

const validate = (name) => {
  if (typeof name !== 'string') return false;
  if (name.trim().length < 2) return false;
  return true;
};

app.get('/api/visits', (req, res) => {
  res.json(people);
});

app.post('/api/visits', (req, res) => {
  try {
    const { name, action } = req.body;

    if (!validate(name)) {
      return res.status(400).json({ error: 'Invalid name' });
    }

    if (action === 'enter') {
      if (!people.includes(name)) people.push(name);
    }

    if (action === 'exit') {
      people = people.filter((p) => p !== name);
    }

    res.json({ ok: true, people });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
