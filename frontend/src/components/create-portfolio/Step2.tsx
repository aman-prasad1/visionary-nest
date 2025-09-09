
import React from 'react';

interface Step2Props {
  formData: any;
  handleChange: (input: any) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: any;
}

const Step2: React.FC<Step2Props> = ({ formData, handleChange, errors }) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Tagline and About</h2>
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Tagline Left"
              value={formData.taglineLeft || ''}
              onChange={handleChange('taglineLeft')}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Tagline Highlight"
              value={formData.taglineHighlight || ''}
              onChange={handleChange('taglineHighlight')}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Tagline Right"
              value={formData.taglineRight || ''}
              onChange={handleChange('taglineRight')}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        </div>
        <input
          type="text"
          placeholder="Sub Tagline"
          value={formData.subTagline || ''}
          onChange={handleChange('subTagline')}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          placeholder="About Short"
          value={formData.aboutShort || ''}
          onChange={handleChange('aboutShort')}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={4}
        />
        {errors.aboutShort && <p className="text-red-500 text-xs mt-1">{errors.aboutShort}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="number"
              placeholder="Years of Experience"
              value={formData.yearsExperience || ''}
              onChange={handleChange('yearsExperience')}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="number"
              placeholder="Projects Count"
              value={formData.projectsCount || ''}
              onChange={handleChange('projectsCount')}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        </div>
      </div>
    </div>
  );
};

export default Step2;
