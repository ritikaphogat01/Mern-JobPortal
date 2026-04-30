const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../server/index.ts');
let content = fs.readFileSync(file, 'utf8');

const insertionPoint = "app.get('/api/admin/menu', (_req, res) => res.json([]));";

if (!content.includes('/api/candidates')) {
    const endpoints = `
// Candidate Management
app.get('/api/candidates', async (_req, res) => {
  try { res.json(isDbConnected ? await Candidate.find() : memoryCandidates); }
  catch (e) { res.json([]); }
});
app.post('/api/candidates', async (req, res) => {
  try {
    if (isDbConnected) {
      res.status(201).json(await new Candidate(req.body).save());
    } else {
      const newCand = { status: 'Active', ...req.body, _id: 'cand_' + Date.now(), id: 'cand_' + Date.now() };
      memoryCandidates.push(newCand);
      saveFallback();
      res.status(201).json(newCand);
    }
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});
app.put('/api/candidates/:id', async (req, res) => {
  try {
    if (isDbConnected) {
      res.json(await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } else {
      const idx = memoryCandidates.findIndex(c => c._id === req.params.id || c.id === req.params.id);
      if (idx !== -1) {
        memoryCandidates[idx] = { ...memoryCandidates[idx], ...req.body };
        saveFallback();
        res.json(memoryCandidates[idx]);
      } else { res.status(404).json({ error: 'Not found' }); }
    }
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});
app.delete('/api/candidates/:id', async (req, res) => {
  try {
    if (isDbConnected) {
      await Candidate.findByIdAndDelete(req.params.id);
    } else {
      memoryCandidates = memoryCandidates.filter(c => c._id !== req.params.id && c.id !== req.params.id);
      saveFallback();
    }
    res.json({ success: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});
`;
    content = content.replace(insertionPoint, endpoints + insertionPoint);
    fs.writeFileSync(file, content);
    console.log('Successfully added Candidate CRUD endpoints to index.ts');
} else {
    console.log('Candidate endpoints already exist in index.ts');
}
