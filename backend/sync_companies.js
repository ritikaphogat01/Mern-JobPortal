const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env.local' });

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/token_db';

const CompanySchema = new mongoose.Schema({ 
  name: String, industry: String, status: { type: String, default: 'Active' }, 
  activeJobs: { type: Number, default: 0 }, location: String 
}, { timestamps: true });

const JobPostSchema = new mongoose.Schema({ 
  company: String, category: String, location: String, status: String 
});

const Company = mongoose.model('Company', CompanySchema);
const JobPost = mongoose.model('JobPost', JobPostSchema);

async function sync() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to DB');

    const jobs = await JobPost.find();
    console.log(`Found ${jobs.length} jobs`);

    const companiesMap = new Map();

    jobs.forEach(job => {
      if (!job.company) return;
      const name = job.company.trim();
      if (!companiesMap.has(name)) {
        companiesMap.set(name, {
          activeJobs: 0,
          industry: job.category,
          location: job.location
        });
      }
      if (job.status === 'active' || job.status === 'paid') {
        companiesMap.get(name).activeJobs++;
      }
    });

    console.log(`Unique companies found: ${companiesMap.size}`);

    for (const [name, data] of companiesMap.entries()) {
      await Company.findOneAndUpdate(
        { name },
        { 
          $set: { 
            activeJobs: data.activeJobs,
            industry: data.industry,
            location: data.location,
            status: 'Active'
          }
        },
        { upsert: true }
      );
      console.log(`Synced: ${name} (${data.activeJobs} jobs)`);
    }

    console.log('Sync complete!');
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await mongoose.disconnect();
  }
}

sync();
