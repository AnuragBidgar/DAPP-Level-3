import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'db.json');

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ badges: [] }));
}

const getDB = () => JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
const saveDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

app.get('/api/badges/:address', (req, res) => {
  const db = getDB();
  const addressBadges = db.badges.filter(b => b.walletAddress === req.params.address);
  res.json(addressBadges);
});

app.post('/api/badges', (req, res) => {
  const { walletAddress, skillName, issuer, category } = req.body;
  
  if (!walletAddress || !skillName || !issuer) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const db = getDB();
  const newBadge = {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(7),
    walletAddress,
    skillName,
    issuer,
    category: category || 'Other',
    timestamp: Date.now()
  };
  
  db.badges.push(newBadge);
  saveDB(db);
  
  res.json(newBadge);
});

app.get('/api/stats', (req, res) => {
  const db = getDB();
  const totalBadges = db.badges.length;
  const uniqueUsers = new Set(db.badges.map(b => b.walletAddress)).size;
  
  res.json({ totalBadges, uniqueUsers });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
