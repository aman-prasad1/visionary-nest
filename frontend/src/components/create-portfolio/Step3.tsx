import React from 'react';

interface Step3Props {
  formData: any;
  handleChange: (input: any) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: any;
}

const Step3: React.FC<Step3Props> = ({ formData, handleChange, errors }) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Social Links</h2>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <input
            type="url"
            placeholder="GitHub URL"
            value={formData.social?.github || ''}
            onChange={handleChange('social.github')}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.github && <p className="text-red-500 text-xs mt-1">{errors.github}</p>}
        </div>
        <div>
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={formData.social?.linkedin || ''}
            onChange={handleChange('social.linkedin')}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.linkedin && <p className="text-red-500 text-xs mt-1">{errors.linkedin}</p>}
        </div>
        <input
          type="url"
          placeholder="Website URL"
          value={formData.social?.website || ''}
          onChange={handleChange('social.website')}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </div>
  );
};

export default Step3;