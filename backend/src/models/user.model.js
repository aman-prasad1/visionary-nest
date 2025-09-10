
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Portfolio } from "./portfolio.model.js";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "User Password is required"],
      minlength: 8,
    },
    bio: {
      type: String,
      maxlength: 200,
      default: "",
    },
    avatar: {
      public_id: { 
        type: String,
        required: false
      },
      public_url: {
        type: String,
        required: false
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      enum: ['student', 'teacher', 'recruiter', 'other'],
      default: 'student',
      required: true
    },
    portfolioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Portfolio',
      default: null
    },
    headline: {
      type: String,
      maxlength: 120,
      default: ""
    },
    skills: [{
      type: String,
      trim: true
    }],
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      website: String,
      behance: String,
      dribbble: String,
      medium: String
    },
    isProfileComplete: {
      type: Boolean,
      default: false
    },
    refreshToken: {
      type: String
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Create a portfolio when a new user signs up
userSchema.post('save', async function(doc, next) {
  try {
    if (this.isNew) {
      const portfolio = new Portfolio({
        userId: this._id,
        email: this.email,
        social: {
          github: this.socialLinks?.github,
          linkedin: this.socialLinks?.linkedin,
          website: this.socialLinks?.website
        }
      });
      
      const savedPortfolio = await portfolio.save();
      await User.findByIdAndUpdate(this._id, { portfolioId: savedPortfolio._id });
    }
  } catch (error) {
    console.error('Error creating portfolio for new user:', error);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
};

export const User = mongoose.model("User", userSchema);
