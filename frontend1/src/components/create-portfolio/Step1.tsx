
import React from 'react';

interface Step1Props {
  formData: any;
  handleChange: (input: any) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (input: any) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: any;
}

const Step1: React.FC<Step1Props> = ({ formData, handleChange, handleFileChange, errors }) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            value={formData.name || ''}
            onChange={handleChange('name')}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            value={formData.email || ''}
            onChange={handleChange('email')}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone || ''}
          onChange={handleChange('phone')}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="md:col-span-2">
          <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            id="location"
            placeholder="City, Country"
            value={formData.location || ''}
            onChange={handleChange('location')}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="avatar" className="block text-sm font-medium mb-2">Avatar</label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleFileChange('avatar')}
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="resume" className="block text-sm font-medium mb-2">Resume/CV</label>
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange('resume')}
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Step1;
