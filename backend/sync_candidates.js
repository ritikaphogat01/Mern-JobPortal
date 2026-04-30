const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env.local' });

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/token_db';

const CandidateSchema = new mongoose.Schema({ 
  name: String, role: String, status: { type: String, default: 'Active' }, 
  email: String, mobile: String, experience: String, skills: String, resumeUrl: String 
}, { timestamps: true });

const ApplicationSchema = new mongoose.Schema({ 
  applicantName: String, applicantEmail: String, resumeUrl: String, qualification: String 
});

const Candidate = mongoose.model('Candidate', CandidateSchema);
const Application = mongoose.model('Application', ApplicationSchema);

async function sync() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to DB');

    const apps = await Application.find();
    console.log(`Found ${apps.length} applications`);

    const usersMap = new Map();

    apps.forEach(app => {
      if (!app.applicantEmail) return;
      const email = app.applicantEmail.toLowerCase().trim();
      if (!usersMap.has(email)) {
        usersMap.set(email, {
          name: app.applicantName,
          resumeUrl: app.resumeUrl,
          qualification: app.qualification
        });
      }
    });

    console.log(`Unique candidates found: ${usersMap.size}`);

    for (const [email, data] of usersMap.entries()) {
      await Candidate.findOneAndUpdate(
        { email },
        { 
          $set: { 
            name: data.name,
            resumeUrl: data.resumeUrl,
            status: 'Active'
          }
        },
        { upsert: true }
      );
      console.log(`Synced Candidate: ${email}`);
    }

    console.log('Candidate Sync complete!');
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await mongoose.disconnect();
  }
}

sync();
