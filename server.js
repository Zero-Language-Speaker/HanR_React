const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Path to words.json in the root of your project folder
const wordsFilePath = path.join(__dirname, 'words.json');

const sentencesFilePath = path.join(__dirname, 'sentences.json');

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your React app's URL
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
    const { word, meaning } = req.body;
    const data = await fs.readFile(wordsFilePath, 'utf8');
    const words = JSON.parse(data);
    
    // Determine the next ID by finding the maximum ID and adding 1
    const newId = words.length > 0 ? Math.max(...words.map(w => w.id)) + 1 : 1;
    
    const newWord = {
      id: newId,
      word,
      meaning
    };
    
    words.push(newWord);
    await fs.writeFile(wordsFilePath, JSON.stringify(words, null, 2));
    
    res.status(201).json(newWord);
  } catch (error) {
    console.error('Error adding word:', error);
    res.status(500).json({ error: 'Error adding word', details: error.message });
  }
});

app.get('/api/sentences', async (req, res) => {
  try {
    const data = await fs.readFile(sentencesFilePath, 'utf8');
    const sentences = JSON.parse(data);
    res.json(sentences);
  } catch (error) {
    console.error('Error reading sentences:', error);
    res.status(500).json({ error: 'Error reading sentences' });
  }
});

app.post('/api/sentences', async (req, res) => {
  try {
    const newSentence = req.body;
    const data = await fs.readFile(sentencesFilePath, 'utf8');
    const sentences = JSON.parse(data);
    sentences.push(newSentence);
    await fs.writeFile(sentencesFilePath, JSON.stringify(sentences, null, 2));
    res.status(201).json(newSentence);
  } catch (error) {
    console.error('Error adding sentence:', error);
    res.status(500).json({ error: 'Error adding sentence' });
  }
});

// DELETE /api/words/:id
app.delete('/api/words/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const data = await fs.readFile(wordsFilePath, 'utf8');
    let words = JSON.parse(data);
    
    // Filter out the word to delete
    words = words.filter(word => word.id !== id);
    
    // Reassign IDs to ensure they are consecutive
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});