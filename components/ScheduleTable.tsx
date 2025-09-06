import React from 'react';
import type { Schedule, Day, Period, Lab, Teacher } from '../types';
import { DAYS, PERIODS } from '../constants';

interface ScheduleTableProps {
  schedule: Schedule;
  teachers: Teacher[];
  labs: Lab[];
  onScheduleChange: (day: Day, period: Period, lab: Lab, teacher: Teacher) => void;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedule, teachers, labs, onScheduleChange }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">جدول توزيع الحصص على المعامل</h2>
      <table className="w-full border-collapse text-center">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-3 border border-blue-400">الحصة / اليوم</th>
            {DAYS.map(day => (
              <th key={day} className="p-3 border border-blue-400" colSpan={labs.length}>{day}</th>
            ))}
          </tr>
          <tr className="bg-blue-100 text-blue-800 font-semibold">
             <th className="p-2 border border-blue-300"></th>
             {DAYS.map(day => 
                labs.map(lab => (
                    <th key={`${day}-${lab}`} className="p-2 border border-blue-300 whitespace-nowrap">{lab}</th>
                ))
             )}
          </tr>
        </thead>
        <tbody>
          {PERIODS.map(period => (
            <tr key={period} className="even:bg-gray-50">
              <td className="p-2 border font-semibold border-gray-300 bg-blue-50 text-blue-800">{`الحصة ${period}`}</td>
              {DAYS.map(day =>
                labs.map(lab => (
                  <td key={`${day}-${period}-${lab}`} className="p-1 border border-gray-300">
                    <select
                      value={schedule[day]?.[period]?.[lab] || ''}
                      onChange={(e) => onScheduleChange(day, period, lab, e.target.value)}
                      className="w-full p-2 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm bg-sky-50 hover:bg-sky-100 text-gray-900"
                    >
                      <option value="">-- شاغر --</option>
                      {teachers.map(teacher => (
                        <option key={teacher} value={teacher}>{teacher}</option>
                      ))}
                    </select>
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;