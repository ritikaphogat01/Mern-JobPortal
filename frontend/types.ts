
export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  imageUrl?: string;
  location: string;
  salary: string;
  type: string;
  postedAt: string;
  category: string;
  experience: string;
  education: string;
  isFeatured?: boolean;
  status?: 'active' | 'pending' | 'expired' | 'rejected';
  description: string;
  responsibilities: string[];
  requirements: string[];
  workMode: 'Remote' | 'Onsite' | 'Hybrid';
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  jobTitle: string;
  company: string;
  status: 'Applied' | 'Viewed' | 'Shortlisted' | 'Interview' | 'Offered' | 'Rejected';
  appliedDate: string;
}

export interface Talent {
  id: string;
  name: string;
  role: string;
  location: string;
  expectedSalary: string;
  experience: string;
  education: string;
  skills: string[];
  imageUrl: string;
  availability: string;
  bio: string;
  isVerified?: boolean;
  profileCompletion: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  jobsCount: string;
  imageUrl: string;
  subCategories?: any[];
}

export enum AppScreen {
  SPLASH = 'splash',
  LOGIN = 'login',
  HOME = 'home',
  SEARCH = 'search',
  HIRE_SEARCH = 'hire_search',
  DETAILS = 'details',
  TALENT_DETAILS = 'talent_details',
  FAVORITES = 'favorites',
  CHATS = 'chats',
  MENU = 'menu',
  PROFILE = 'profile',
  TRACKER = 'tracker',
  RECRUITER_DASHBOARD = 'recruiter_dashboard',
  POST_JOB = 'post_job',
  ADMIN_LOGIN = 'admin_login',
  ADMIN = 'admin',
  AI_COACH = 'ai_coach',
  COMPANY_PROFILE = 'company_profile',
  PACKAGE_SELECTION = 'package_selection',
  PAYMENT_METHOD = 'payment_method',
  RECRUITER_AUTH = 'recruiter_auth',
  PRIVACY_POLICY = 'privacy_policy',
  TERMS_CONDITIONS = 'terms_conditions',
  RETURN_POLICY = 'return_policy',
  REFUND_POLICY = 'refund_policy',
  ALL_CATEGORIES = 'all_categories',
  SERVICE_DETAILS = 'service_details',
  ROLE_SELECTION = 'role_selection'
}

// Business & Monetization Types
export type PlanRole = 'EMPLOYER' | 'EMPLOYEE';
export type PlanStatus = 'Active' | 'Inactive';

export interface PricingPlan {
  id: string;
  role: PlanRole;
  name: string;
  durationDays: number;
  price: number;
  features: string[];
  credits: {
    jobPosts?: number;
    featuredJobs?: number;
    resumeUnlocks?: number;
    profileBoostDays?: number;
    premiumAlerts?: number;
  };
  status: PlanStatus;
  isRecommended: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  userName: string;
  role: PlanRole;
  planId: string;
  planName: string;
  startDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired' | 'Paused' | 'Cancelled';
  creditsRemaining: any;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  planName: string;
  amount: number;
  status: 'Success' | 'Failed' | 'Pending' | 'Refunded';
  method: string;
  date: string;
}

export interface Coupon {
  id: string;
  code: string;
  role: 'BOTH' | 'EMPLOYER' | 'EMPLOYEE';
  discountType: 'FLAT' | 'PERCENT';
  value: number;
  validUntil: string;
  usageLimit: number;
  usageCount: number;
}

export interface AuditLogEntry {
  id: string;
  adminName: string;
  action: string;
  target: string;
  timestamp: string;
  details: string;
}

export interface Notification {
  _id?: string;
  id: string;
  userEmail: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type?: 'shortlist' | 'application' | 'general';
}
