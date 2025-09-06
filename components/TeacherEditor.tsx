import React from 'react';
import type { Teacher } from '../types';

interface TeacherEditorProps {
  teachers: Teacher[];
  onTeacherNameChange: (index: number, newName: string) => void;
}

// A palette of colors for the teachers
const TEACHER_COLORS = [
    { text: 'text-red-900', bg: 'bg-red-100', border: 'border-red-300', ring: 'focus:ring-red-500' },
    { text: 'text-green-900', bg: 'bg-green-100', border: 'border-green-300', ring: 'focus:ring-green-500' },
    { text: 'text-blue-900', bg: 'bg-blue-100', border: 'border-blue-300', ring: 'focus:ring-blue-500' },
    { text: 'text-yellow-900', bg: 'bg-yellow-100', border: 'border-yellow-300', ring: 'focus:ring-yellow-500' },
    { text: 'text-indigo-900', bg: 'bg-indigo-100', border: 'border-indigo-300', ring: 'focus:ring-indigo-500' },
    { text: 'text-pink-900', bg: 'bg-pink-100', border: 'border-pink-300', ring: 'focus:ring-pink-500' },
    { text: 'text-gray-900', bg: 'bg-gray-100', border: 'border-gray-300', ring: 'focus:ring-gray-500' },
];


const TeacherEditor: React.FC<TeacherEditorProps> = ({ teachers, onTeacherNameChange }) => {
  return (
    <div className="bg-purple-100 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-purple-800 mb-4">قائمة المعلمين</h2>
      <div className="space-y-3">
        {teachers.map((teacher, index) => {
           const color = TEACHER_COLORS[index % TEACHER_COLORS.length];
           return (
             <div key={index} className="flex items-center">
               <label className={`w-20 font-semibold ${color.text}`}>معلم {index + 1}:</label>
               <input
                 type="text"
                 value={teacher}
                 onChange={(e) => onTeacherNameChange(index, e.target.value)}
                 className={`flex-grow p-2 border rounded-lg focus:ring-2 focus:border-transparent transition ${color.bg} ${color.text} ${color.border} ${color.ring}`}
               />
             </div>
           );
        })}
      </div>
    </div>
  );
};

export default TeacherEditor;