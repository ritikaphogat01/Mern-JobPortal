const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env.local' });

const uri = process.env.MONGODB_URI;

const fullCategories = [
  { name: 'Accounting / Finance', icon: 'payments', subCategories: [{ name: 'Accountant', icon: 'calculate' }, { name: 'Chartered Accountant', icon: 'workspace_premium' }, { name: 'Billing Clerk', icon: 'receipt' }, { name: 'Financial Analyst', icon: 'analytics' }] },
  { name: 'Automobile', icon: 'directions_car', subCategories: [{ name: 'Mechanic', icon: 'build' }, { name: 'Driver', icon: 'drive_eta' }, { name: 'Auto Electrician', icon: 'electric_bolt' }, { name: 'Body Shop Technician', icon: 'car_repair' }] },
  { name: 'Beauty / Salon', icon: 'face', subCategories: [{ name: 'Hairdresser', icon: 'content_cut' }, { name: 'Beautician', icon: 'spa' }, { name: 'Makeup Artist', icon: 'brush' }, { name: 'Nail Technician', icon: 'colorize' }] },
  { name: 'Cleaner / Housekeeper', icon: 'cleaning_services', subCategories: [{ name: 'House Cleaner', icon: 'home' }, { name: 'Commercial Cleaner', icon: 'business' }, { name: 'Laundry Worker', icon: 'local_laundry_service' }] },
  { name: 'Construction', icon: 'construction', subCategories: [{ name: 'Civil Engineer', icon: 'engineering' }, { name: 'Mason / Bricklayer', icon: 'foundation' }, { name: 'Carpenter', icon: 'handyman' }, { name: 'Painter', icon: 'format_paint' }] },
  { name: 'Cook / Chef', icon: 'restaurant', subCategories: [{ name: 'Head Chef', icon: 'restaurant_menu' }, { name: 'Sous Chef', icon: 'food_bank' }, { name: 'Baker', icon: 'bakery_dining' }, { name: 'Kitchen Helper', icon: 'kitchen' }] },
  { name: 'Customer Service / Call Centre', icon: 'support_agent', subCategories: [{ name: 'Call Centre Agent', icon: 'phone' }, { name: 'Customer Support Executive', icon: 'headset_mic' }, { name: 'Chat Support', icon: 'chat' }] },
  { name: 'Data Management & Analysis', icon: 'analytics', subCategories: [{ name: 'Data Entry Operator', icon: 'keyboard' }, { name: 'Data Analyst', icon: 'bar_chart' }, { name: 'Database Admin', icon: 'storage' }] },
  { name: 'Design', icon: 'draw', subCategories: [{ name: 'Graphic Designer', icon: 'design_services' }, { name: 'UI/UX Designer', icon: 'devices' }, { name: 'Interior Designer', icon: 'chair' }, { name: 'Fashion Designer', icon: 'checkroom' }] },
  { name: 'Driver / Delivery', icon: 'delivery_dining', subCategories: [{ name: 'Delivery Rider', icon: 'two_wheeler' }, { name: 'Truck Driver', icon: 'local_shipping' }, { name: 'Personal Driver', icon: 'directions_car' }] },
  { name: 'Education', icon: 'school', subCategories: [{ name: 'Primary Teacher', icon: 'child_care' }, { name: 'High School Teacher', icon: 'menu_book' }, { name: 'Academic Counselor', icon: 'psychology' }, { name: 'Librarian', icon: 'local_library' }] },
  { name: 'Engineering', icon: 'engineering', subCategories: [{ name: 'Mechanical Engineer', icon: 'settings' }, { name: 'Electrical Engineer', icon: 'electric_bolt' }, { name: 'Civil Engineer', icon: 'foundation' }, { name: 'Chemical Engineer', icon: 'science' }] },
  { name: 'Event Management & Operations', icon: 'event', subCategories: [{ name: 'Event Coordinator', icon: 'event_note' }, { name: 'Event Decorator', icon: 'celebration' }, { name: 'AV Technician', icon: 'videocam' }] },
  { name: 'Handyman / Technician', icon: 'handyman', subCategories: [{ name: 'Plumber', icon: 'plumbing' }, { name: 'AC Technician', icon: 'ac_unit' }, { name: 'Electrician', icon: 'electrical_services' }, { name: 'Painter', icon: 'format_paint' }] },
  { name: 'HR / Admin', icon: 'badge', subCategories: [{ name: 'HR Executive', icon: 'people' }, { name: 'Admin Assistant', icon: 'admin_panel_settings' }, { name: 'Recruitment Officer', icon: 'person_add' }] },
  { name: 'Information Technology', icon: 'computer', subCategories: [{ name: 'Software Developer', icon: 'code' }, { name: 'System Admin', icon: 'dns' }, { name: 'Data Entry Operator', icon: 'keyboard' }, { name: 'Technical Support', icon: 'support' }] },
  { name: 'Legal Services', icon: 'gavel', subCategories: [{ name: 'Lawyer', icon: 'account_balance' }, { name: 'Legal Assistant', icon: 'description' }, { name: 'Paralegal', icon: 'policy' }] },
  { name: 'Logistics & Distribution', icon: 'local_shipping', subCategories: [{ name: 'Warehouse Staff', icon: 'warehouse' }, { name: 'Logistics Coordinator', icon: 'route' }, { name: 'Inventory Manager', icon: 'inventory' }] },
  { name: 'Manufacturing / Warehouse', icon: 'factory', subCategories: [{ name: 'Production Worker', icon: 'precision_manufacturing' }, { name: 'Quality Inspector', icon: 'verified' }, { name: 'Forklift Operator', icon: 'forklift' }] },
  { name: 'Marine Captain / Crew', icon: 'directions_boat', subCategories: [{ name: 'Marine Captain', icon: 'anchor' }, { name: 'Deck Officer', icon: 'sailing' }, { name: 'Marine Engineer', icon: 'engineering' }] },
  { name: 'Marketing / Advertising', icon: 'campaign', subCategories: [{ name: 'Marketing Executive', icon: 'trending_up' }, { name: 'Digital Marketer', icon: 'ads_click' }, { name: 'Content Writer', icon: 'edit_note' }, { name: 'SEO Specialist', icon: 'manage_search' }] },
  { name: 'Media, Art & Entertainment', icon: 'movie', subCategories: [{ name: 'Journalist', icon: 'newspaper' }, { name: 'Photographer', icon: 'camera_alt' }, { name: 'Video Editor', icon: 'movie_edit' }, { name: 'Actor', icon: 'theater_comedy' }] },
  { name: 'Medical / Healthcare', icon: 'medical_services', subCategories: [{ name: 'Nurse', icon: 'local_hospital' }, { name: 'Lab Technician', icon: 'biotech' }, { name: 'Pharmacy Assistant', icon: 'medication' }, { name: 'Home Caretaker', icon: 'home_health' }] },
  { name: 'Real Estate', icon: 'apartment', subCategories: [{ name: 'Real Estate Agent', icon: 'real_estate_agent' }, { name: 'Property Manager', icon: 'domain' }, { name: 'Leasing Consultant', icon: 'key' }] },
  { name: 'Restaurant Operations', icon: 'lunch_dining', subCategories: [{ name: 'Restaurant Manager', icon: 'restaurant' }, { name: 'Waiter / Waitress', icon: 'room_service' }, { name: 'Cashier', icon: 'point_of_sale' }] },
  { name: 'Sales / Business Development', icon: 'trending_up', subCategories: [{ name: 'Sales Executive', icon: 'sell' }, { name: 'Business Dev Manager', icon: 'handshake' }, { name: 'Store Manager', icon: 'storefront' }, { name: 'Field Sales Rep', icon: 'map' }] },
  { name: 'Secretarial / Front Office', icon: 'desk', subCategories: [{ name: 'Receptionist', icon: 'front_desk' }, { name: 'Office Secretary', icon: 'edit_calendar' }, { name: 'Data Entry Clerk', icon: 'keyboard' }] },
  { name: 'Security / Guard', icon: 'security', subCategories: [{ name: 'Security Guard', icon: 'shield' }, { name: 'CCTV Operator', icon: 'videocam' }, { name: 'Bouncer', icon: 'security' }] },
  { name: 'Sports & Fitness', icon: 'fitness_center', subCategories: [{ name: 'Personal Trainer', icon: 'sports_gymnastics' }, { name: 'Yoga Instructor', icon: 'self_improvement' }, { name: 'Sports Coach', icon: 'sports' }] },
  { name: 'Travel & Hospitality', icon: 'hotel', subCategories: [{ name: 'Hotel Receptionist', icon: 'hotel' }, { name: 'Travel Agent', icon: 'flight' }, { name: 'Tour Guide', icon: 'tour' }, { name: 'Housekeeping', icon: 'cleaning_services' }] },
  { name: 'Others', icon: 'more_horiz', subCategories: [] },
];

const schema = new mongoose.Schema({ name: String, icon: String, subCategories: [{ name: String, icon: String }] }, { collection: 'jobcategories' });
const JobCategory = mongoose.model('JobCategory', schema);

mongoose.connect(uri).then(async () => {
  console.log('Connected...');
  await JobCategory.deleteMany({});
  console.log('Old categories deleted.');
  const result = await JobCategory.insertMany(fullCategories);
  console.log(`✅ Inserted ${result.length} categories with sub-categories!`);
  process.exit(0);
}).catch(err => { console.error(err); process.exit(1); });
