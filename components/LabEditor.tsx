
import React from 'react';
import type { Lab } from '../types';

interface LabEditorProps {
  labs: Lab[];
  onLabNameChange: (index: number, newName: string) => void;
}

// A palette of colors for the labs
const LAB_COLORS = [
    { text: 'text-teal-900', bg: 'bg-teal-100', border: 'border-teal-300', ring: 'focus:ring-teal-500' },
    { text: 'text-orange-900', bg: 'bg-orange-100', border: 'border-orange-300', ring: 'focus:ring-orange-500' },
    { text: 'text-lime-900', bg: 'bg-lime-100', border: 'border-lime-300', ring: 'focus:ring-lime-500' },
    { text: 'text-cyan-900', bg: 'bg-cyan-100', border: 'border-cyan-300', ring: 'focus:ring-cyan-500' },
    { text: 'text-fuchsia-900', bg: 'bg-fuchsia-100', border: 'border-fuchsia-300', ring: 'focus:ring-fuchsia-500' },
];


const LabEditor: React.FC<LabEditorProps> = ({ labs, onLabNameChange }) => {
  return (
    <div className="bg-green-100 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-green-800 mb-4">قائمة المعامل</h2>
      <div className="space-y-3">
        {labs.map((lab, index) => {
           const color = LAB_COLORS[index % LAB_COLORS.length];
           return (
            <div key={index} className="flex items-center">
              <label className={`w-20 font-semibold ${color.text}`}>معمل {index + 1}:</label>
              <input
                type="text"
                value={lab}
                onChange={(e) => onLabNameChange(index, e.target.value)}
                className={`flex-grow p-2 border rounded-lg focus:ring-2 focus:border-transparent transition ${color.bg} ${color.text} ${color.border} ${color.ring}`}
              />
            </div>
           );
        })}
      </div>
    </div>
  );
};

export default LabEditor;
