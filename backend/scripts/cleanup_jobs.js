const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env.local' });

const uri = process.env.MONGODB_URI;

async function run() {
  await mongoose.connect(uri);
  const JobPost = mongoose.model('JobPost', new mongoose.Schema({ title: String }));
  const jobs = await JobPost.find({});
  console.log('Current Jobs in DB:', JSON.stringify(jobs, null, 2));
  
  // Identify mock jobs (e.g. Sales Executive)
  const toDelete = jobs.filter(j => j.title.toLowerCase().includes('sales executive') || j.title.toLowerCase().includes('senior accountant'));
  if (toDelete.length > 0) {
    console.log('Deleting mock jobs:', toDelete.map(j => j.title));
    await JobPost.deleteMany({ _id: { $in: toDelete.map(j => j._id) } });
  }
  
  process.exit(0);
}
run();
