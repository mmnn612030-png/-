import React, { useState, useMemo } from 'react';

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeWeek = (amount: number) => {
    setSelectedDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + (7 * amount));
      return newDate;
    });
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const weekDays = useMemo(() => {
    const startOfWeek = new Date(selectedDate);
    // JS getDay(): Sun=0, Mon=1, ..., Sat=6. We want Saturday to be the start.
    // Offset to get to Saturday: if today is Sunday (0), we need to go back 1 day. If today is Sat (6), go back 0 days.
    const dayOfWeek = startOfWeek.getDay(); // 0-6
    const offset = (dayOfWeek + 1) % 7;
    startOfWeek.setDate(startOfWeek.getDate() - offset);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  }, [selectedDate]);

  const today = new Date();
  const isSameDay = (d1: Date, d2: Date) => 
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const dayShortNames = ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج']; // Saturday to Friday

  const gregorianDate = useMemo(() => {
    return new Intl.DateTimeFormat('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(selectedDate);
  }, [selectedDate]);

  const hijriDate = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(selectedDate);
    } catch (e) {
      console.error("Hijri calendar not supported in this browser.", e);
      return "التقويم الهجري غير مدعوم";
    }
  }, [selectedDate]);
  
  const currentMonthYear = new Intl.DateTimeFormat('ar-SA', {
    month: 'long',
    year: 'numeric'
  }).format(selectedDate);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
      <h2 className="text-xl font-bold text-gray-700 mb-4">التقويم</h2>
      
      {/* Week Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeWeek(-1)} aria-label="الأسبوع السابق" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">&rarr;</button>
        <div className="font-bold text-lg text-gray-800">{currentMonthYear}</div>
        <button onClick={() => changeWeek(1)} aria-label="الأسبوع التالي" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">&larr;</button>
      </div>

      {/* Week Days View */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {dayShortNames.map(name => (
          <div key={name} className="font-semibold text-gray-500 text-sm">{name}</div>
        ))}
        {weekDays.map(day => {
          const isSelected = isSameDay(day, selectedDate);
          const isToday = isSameDay(day, today);
          
          let dayClasses = "w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ";
          if (isSelected) {
            dayClasses += "bg-blue-600 text-white font-bold shadow-md";
          } else if (isToday) {
            dayClasses += "bg-blue-100 text-blue-700 font-bold";
          } else {
            dayClasses += "hover:bg-gray-200";
          }

          return (
            <button key={day.toISOString()} onClick={() => setSelectedDate(day)} className={dayClasses}>
              {day.getDate()}
            </button>
          );
        })}
      </div>
      
      <button onClick={goToToday} className="w-full mb-4 px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 text-blue-700 font-semibold transition">
        الانتقال إلى اليوم
      </button>

      {/* Selected Date Display */}
      <div className="space-y-3 pt-3 border-t">
        <div>
          <p className="text-md font-semibold text-blue-600">التاريخ الميلادي المحدد</p>
          <p className="text-xl font-bold text-gray-800">{gregorianDate}</p>
        </div>
        <div>
          <p className="text-md font-semibold text-green-600">التاريخ الهجري المحدد</p>
          <p className="text-xl font-bold text-gray-800">{hijriDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
