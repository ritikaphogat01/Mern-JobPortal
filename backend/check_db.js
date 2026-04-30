const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env.local' });

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/token_db';

const JobCategorySchema = new mongoose.Schema({ 
  name: String, 
  icon: String, 
  jobsCount: { type: Number, default: 0 },
  subCategories: [{ name: String, icon: String }]
});
const JobCategory = mongoose.model('JobCategory', JobCategorySchema);

mongoose.connect(uri)
  .then(async () => {
    const count = await JobCategory.countDocuments();
    console.log('Category Count:', count);
    const cats = await JobCategory.find().limit(5);
    console.log('First 5 Categories:', cats.map(c => c.name));
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection failed:', err);
    process.exit(1);
  });
