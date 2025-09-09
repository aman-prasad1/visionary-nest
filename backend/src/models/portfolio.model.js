import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  tech: [{
    type: String,
    trim: true
  }],
  thumbnail: {
    type: String,
    trim: true
  },
  links: [{
    label: String,
    href: String
  }],
  collaborators: [{
    type: String,
    trim: true
  }],
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  issuer: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  validTill: Date,
  fileUrl: String,
  verified: {
    type: Boolean,
    default: false
  },
  relatedSkills: [String]
});

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
});

const experienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    trim: true
  },
  org: {
    type: String,
    required: true,
    trim: true
  },
  location: String,
  start: Date,
  end: Date,
  current: {
    type: Boolean,
    default: false
  },
  bullets: [String]
});

const educationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  org: {
    type: String,
    required: true,
    trim: true
  },
  dateRange: String,
  bullets: [String]
});

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  taglineLeft: String,
  taglineHighlight: String,
  taglineRight: String,
  subTagline: String,
  aboutShort: String,
  yearsExperience: Number,
  projectsCount: Number,
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: String,
  location: String,
  avatarUrl: String,
  resumeUrl: String,
  social: {
    github: String,
    website: String,
    linkedin: String,
    twitter: String,
    instagram: String
  },
  projects: [projectSchema],
  certificates: [certificateSchema],
  skills: [skillSchema],
  tools: [String],
  experiences: [experienceSchema],
  education: [educationSchema],
  isPublic: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
portfolioSchema.index({ userId: 1 });
portfolioSchema.index({ 'skills.name': 'text', 'projects.title': 'text', 'projects.description': 'text' });

// Add text index for search functionality
portfolioSchema.index(
  {
    'taglineLeft': 'text',
    'taglineHighlight': 'text',
    'taglineRight': 'text',
    'aboutShort': 'text',
    'skills.name': 'text',
    'projects.title': 'text',
    'projects.description': 'text',
    'experiences.role': 'text',
    'experiences.org': 'text',
    'education.title': 'text',
    'education.org': 'text'
  },
  {
    weights: {
      'taglineHighlight': 10,
      'taglineLeft': 5,
      'taglineRight': 5,
      'projects.title': 3,
      'projects.description': 2,
      'skills.name': 4,
      'experiences.role': 3,
      'experiences.org': 2,
      'education.title': 3,
      'education.org': 2,
      'aboutShort': 1
    },
    name: 'portfolio_text_search'
  }
);

export const Portfolio = mongoose.model('Portfolio', portfolioSchema);
