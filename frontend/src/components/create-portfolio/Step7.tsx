import React from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

interface Step7Props {
  items: { role: string, org: string, location: string, start: string, end: string, bullets: string }[];
  handleItemChange: (index: number, field: string, value: string) => void;
  handleAddItem: () => void;
  handleRemoveItem: (index: number) => void;
  errors: any;
}

const Step7: React.FC<Step7Props> = ({ items, handleItemChange, handleAddItem, handleRemoveItem, errors }) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Experience</h2>
      {errors.experiences && <p className="text-red-500 text-xs mb-2">{errors.experiences}</p>}
      <div className="grid grid-cols-1 gap-6">
        {items.map((item, index) => (
          <div key={index} className="bg-white/10 rounded-lg p-4">
            <div className="flex justify-end">
              <button onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-400 mb-2">
                <MinusCircleOutlined style={{ fontSize: '20px' }} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Role"
                  value={item.role}
                  onChange={(e) => handleItemChange(index, 'role', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors[`experience_role_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`experience_role_${index}`]}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Organization"
                  value={item.org}
                  onChange={(e) => handleItemChange(index, 'org', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors[`experience_org_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`experience_org_${index}`]}</p>}
              </div>
              <input
                type="text"
                placeholder="Location"
                value={item.location}
                onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Start Date (e.g., Mar 2023)"
                value={item.start}
                onChange={(e) => handleItemChange(index, 'start', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="End Date (e.g., Apr 2025 or Present)"
                value={item.end}
                onChange={(e) => handleItemChange(index, 'end', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                placeholder="Highlights (one per line)"
                value={item.bullets}
                onChange={(e) => handleItemChange(index, 'bullets', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 md:col-span-2"
                rows={3}
              />
            </div>
          </div>
        ))}
        <button onClick={handleAddItem} className="flex items-center justify-center gap-2 text-purple-400 border border-purple-400 rounded-lg py-2 px-4 hover:bg-purple-400 hover:text-white transition-colors">
          <PlusOutlined /> Add Experience
        </button>
      </div>
    </div>
  );
};

export default Step7;