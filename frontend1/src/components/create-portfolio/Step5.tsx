import React from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

interface Step5Props {
  items: { title: string, description: string, tech: string, thumbnail: string, github: string, live: string, collaborators: string }[];
  handleItemChange: (index: number, field: string, value: string) => void;
  handleAddItem: () => void;
  handleRemoveItem: (index: number) => void;
  errors: any;
}

const Step5: React.FC<Step5Props> = ({ items, handleItemChange, handleAddItem, handleRemoveItem, errors }) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Projects</h2>
      {errors.projects && <p className="text-red-500 text-xs mb-2">{errors.projects}</p>}
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
                  placeholder="Project Title"
                  value={item.title}
                  onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors[`project_title_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`project_title_${index}`]}</p>}
              </div>
              <input
                type="url"
                placeholder="Thumbnail URL"
                value={item.thumbnail}
                onChange={(e) => handleItemChange(index, 'thumbnail', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="md:col-span-2">
                <textarea
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 md:col-span-2"
                  rows={3}
                />
                {errors[`project_description_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`project_description_${index}`]}</p>}
              </div>
              <input
                type="text"
                placeholder="Tech Stack (comma separated)"
                value={item.tech}
                onChange={(e) => handleItemChange(index, 'tech', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 md:col-span-2"
              />
              <input
                type="url"
                placeholder="GitHub URL"
                value={item.github}
                onChange={(e) => handleItemChange(index, 'github', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="url"
                placeholder="Live URL"
                value={item.live}
                onChange={(e) => handleItemChange(index, 'live', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Collaborators (comma separated)"
                value={item.collaborators}
                onChange={(e) => handleItemChange(index, 'collaborators', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 md:col-span-2"
              />
            </div>
          </div>
        ))}
        <button onClick={handleAddItem} className="flex items-center justify-center gap-2 text-purple-400 border border-purple-400 rounded-lg py-2 px-4 hover:bg-purple-400 hover:text-white transition-colors">
          <PlusOutlined /> Add Project
        </button>
      </div>
    </div>
  );
};

export default Step5;