const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const wordsFilePath = path.join(__dirname, 'words.json');
const sentencesFilePath = path.join(__dirname, 'sentences.json');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

// GET /api/words
app.get('/api/words', async (req, res) => {
  try {
    const data = await fs.readFile(wordsFilePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading words file:', error);
    res.status(500).json({ error: 'Error reading words' });
  }
});

// POST /api/words
app.post('/api/words', async (req, res) => {
  try {
    const { word, meanings } = req.body;
    const data = await fs.readFile(wordsFilePath, 'utf8');
    const words = JSON.parse(data);
    
    const newId = words.length > 0 ? Math.max(...words.map(w => w.id)) + 1 : 1;
    
    const newWord = {
      id: newId,
      word: word,
      meanings: meanings.map(meaning => ({
        definition: meaning.definition,
        examples: meaning.examples || []
      }))
    };
    
    words.push(newWord);
    await fs.writeFile(wordsFilePath, JSON.stringify(words, null, 2));
    
    res.status(201).json(newWord);
  } catch (error) {
    console.error('Error adding word:', error);
    res.status(500).json({ error: 'Error adding word', details: error.message });
  }
});


// PUT /api/words/:id
app.put('/api/words/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { word, meanings } = req.body;

  try {
    const data = await fs.readFile(wordsFilePath, 'utf8');
    let words = JSON.parse(data);
    
    const wordIndex = words.findIndex(w => w.id === id);
    
    if (wordIndex === -1) {
      return res.status(404).json({ error: 'Word not found' });
    }

    // Update the word
    words[wordIndex] = {
      ...words[wordIndex],
      word,
      meanings
    };

    await fs.writeFile(wordsFilePath, JSON.stringify(words, null, 2));
    
    res.json(words[wordIndex]);
  } catch (error) {
    console.error('Error updating word:', error);
    res.status(500).json({ error: 'Error updating word', details: error.message });
  }
});


// DELETE /api/words/:id
app.delete('/api/words/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const data = await fs.readFile(wordsFilePath, 'utf8');
    let words = JSON.parse(data);
    
    words = words.filter(word => word.id !== id);
    
    words.forEach((word, index) => {
      word.id = index + 1;
    });

    await fs.writeFile(wordsFilePath, JSON.stringify(words, null, 2));
    
    res.status(200).json({ message: 'Word deleted successfully' });
  } catch (error) {
    console.error('Error deleting word:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/random-word', async (req, res) => {
  try {
    const data = await fs.readFile(wordsFilePath, 'utf8');
    const words = JSON.parse(data);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    res.json(randomWord);
  } catch (error) {
    console.error('Error reading words.json:', error);
    res.status(500).json({ error: 'Failed to fetch random word' });
  }
});

app.post('/api/mission', async (req, res) => {
  res.status(200).json({
    mission_type: 0,
    mission: `Dummy mission for ${req.body.word}`,
    example_answer: `Dummy example answer. Definition: ${req.body.meaning}`
  });
});

app.post('/api/feedback', async (req, res) => {
  res.status(200).json({
    score: 5,
    score_reason: "mission",
    message: `Dummy feedback for ${req.body.user_input}`
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});