
import React from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

interface Step4Props {
  items: { name: string; level: string }[];
  handleItemChange: (index: number, field: string, value: string) => void;
  handleAddItem: () => void;
  handleRemoveItem: (index: number) => void;
  errors: any;
}

const Step4: React.FC<Step4Props> = ({ items, handleItemChange, handleAddItem, handleRemoveItem, errors }) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Skills</h2>
      {errors.skills && <p className="text-red-500 text-xs mb-2">{errors.skills}</p>}
      <div className="grid grid-cols-1 gap-6">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Skill (e.g., React)"
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="number"
                placeholder="Level (0-100)"
                value={item.level}
                onChange={(e) => handleItemChange(index, 'level', e.target.value)}
                className="w-32 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-400">
                <MinusCircleOutlined style={{ fontSize: '20px' }} />
              </button>
            </div>
            {errors[`skill_name_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`skill_name_${index}`]}</p>}
            {errors[`skill_level_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`skill_level_${index}`]}</p>}
          </div>
        ))}
        <button onClick={handleAddItem} className="flex items-center justify-center gap-2 text-purple-400 border border-purple-400 rounded-lg py-2 px-4 hover:bg-purple-400 hover:text-white transition-colors">
          <PlusOutlined /> Add Skill
        </button>
      </div>
    </div>
  );
};

export default Step4;
