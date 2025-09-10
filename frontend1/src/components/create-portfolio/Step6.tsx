import React from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

interface Step6Props {
  items: { name: string, issuer: string, date: string, validTill: string, fileUrl: string, relatedSkills: string }[];
  handleItemChange: (index: number, field: string, value: string) => void;
  handleAddItem: () => void;
  handleRemoveItem: (index: number) => void;
  errors: any;
}

const Step6: React.FC<Step6Props> = ({ items, handleItemChange, handleAddItem, handleRemoveItem, errors }) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Certificates</h2>
      {errors.certificates && <p className="text-red-500 text-xs mb-2">{errors.certificates}</p>}
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
                  placeholder="Certificate Name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors[`certificate_name_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`certificate_name_${index}`]}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Issuer"
                  value={item.issuer}
                  onChange={(e) => handleItemChange(index, 'issuer', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors[`certificate_issuer_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`certificate_issuer_${index}`]}</p>}
              </div>
              <input
                type="text"
                placeholder="Date (e.g., Dec 2023)"
                value={item.date}
                onChange={(e) => handleItemChange(index, 'date', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Valid Till (e.g., Dec 2025)"
                value={item.validTill}
                onChange={(e) => handleItemChange(index, 'validTill', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="url"
                placeholder="File URL"
                value={item.fileUrl}
                onChange={(e) => handleItemChange(index, 'fileUrl', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 md:col-span-2"
              />
              <input
                type="text"
                placeholder="Related Skills (comma separated)"
                value={item.relatedSkills}
                onChange={(e) => handleItemChange(index, 'relatedSkills', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 md:col-span-2"
              />
            </div>
          </div>
        ))}
        <button onClick={handleAddItem} className="flex items-center justify-center gap-2 text-purple-400 border border-purple-400 rounded-lg py-2 px-4 hover:bg-purple-400 hover:text-white transition-colors">
          <PlusOutlined /> Add Certificate
        </button>
      </div>
    </div>
  );
};

export default Step6;