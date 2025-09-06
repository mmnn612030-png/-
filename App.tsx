
import React, { useCallback, useMemo } from 'react';
import type { Schedule, Teacher, Day, Period, Lab } from './types';
import { DAYS, PERIODS, INITIAL_LABS, INITIAL_TEACHERS } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import ScheduleTable from './components/ScheduleTable';
import OccupancyChart from './components/OccupancyChart';
import Footer from './components/Footer';
import Calendar from './components/Calendar';
import TeacherEditor from './components/TeacherEditor';
import LabEditor from './components/LabEditor';

const generateInitialSchedule = (labs: Lab[]): Schedule => {
  const schedule = {} as Schedule;
  for (const day of DAYS) {
    schedule[day] = {} as Record<Period, Record<Lab, Teacher>>;
    for (const period of PERIODS) {
      schedule[day][period] = {} as Record<Lab, Teacher>;
      for (const lab of labs) {
        schedule[day][period][lab] = '';
      }
    }
  }
  return schedule;
};


const App: React.FC = () => {
  const [logo, setLogo] = useLocalStorage<string | null>('app-logo', null);
  const [teachers, setTeachers] = useLocalStorage<Teacher[]>('app-teachers', INITIAL_TEACHERS);
  const [labs, setLabs] = useLocalStorage<Lab[]>('app-labs', INITIAL_LABS);
  const [schedule, setSchedule] = useLocalStorage<Schedule>('app-schedule', () => generateInitialSchedule(labs));

  const handleLogoChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleScheduleChange = useCallback((day: Day, period: Period, lab: Lab, teacher: Teacher) => {
    setSchedule(prevSchedule => {
      const newSchedule = JSON.parse(JSON.stringify(prevSchedule));
      newSchedule[day][period][lab] = teacher;
      return newSchedule;
    });
  }, [setSchedule]);
  
  const handleTeacherNameChange = (index: number, newName: string) => {
    const oldName = teachers[index];
    const newTeachers = [...teachers];
    newTeachers[index] = newName;
    setTeachers(newTeachers);

    const newSchedule = JSON.parse(JSON.stringify(schedule));
    let scheduleChanged = false;
    for (const day of DAYS) {
      for (const period of PERIODS) {
        for (const lab in newSchedule[day][period]) {
          if (newSchedule[day][period][lab] === oldName) {
            newSchedule[day][period][lab] = newName;
            scheduleChanged = true;
          }
        }
      }
    }
    if(scheduleChanged) {
        setSchedule(newSchedule);
    }
  };

  const handleLabNameChange = (index: number, newName: string) => {
    if (!newName.trim()) return;

    const oldName = labs[index];
    if (oldName === newName) return;

    const newLabs = [...labs];
    newLabs[index] = newName;
    setLabs(newLabs);

    const newSchedule = JSON.parse(JSON.stringify(schedule));
    let scheduleChanged = false;

    for (const day of DAYS) {
      for (const period of PERIODS) {
        if (newSchedule[day][period][oldName] !== undefined) {
          newSchedule[day][period][newName] = newSchedule[day][period][oldName];
          delete newSchedule[day][period][oldName];
          scheduleChanged = true;
        }
      }
    }

    if (scheduleChanged) {
      setSchedule(newSchedule);
    }
  };

  const occupancyData = useMemo(() => {
    const counts = labs.reduce((acc, lab) => {
      acc[lab] = 0;
      return acc;
    }, {} as Record<string, number>);

    for (const day of DAYS) {
      for (const period of PERIODS) {
        for (const lab in schedule[day]?.[period]) {
          if (schedule[day][period][lab] && counts.hasOwnProperty(lab)) {
            counts[lab]++;
          }
        }
      }
    }

    const totalSlots = DAYS.length * PERIODS.length;
    return labs.map(lab => ({
      name: lab,
      'حصص مشغولة': counts[lab] || 0,
      'النسبة المئوية': parseFloat((((counts[lab] || 0) / totalSlots) * 100).toFixed(1)),
    }));
  }, [schedule, labs]);


  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <Header logo={logo} onLogoChange={handleLogoChange} />
      <main className="container mx-auto p-4 md:p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
             <Calendar />
             <TeacherEditor teachers={teachers} onTeacherNameChange={handleTeacherNameChange} />
             <LabEditor labs={labs} onLabNameChange={handleLabNameChange} />
          </div>
          <div className="lg:col-span-2">
            <OccupancyChart data={occupancyData} />
          </div>
        </div>
        
        <ScheduleTable 
          schedule={schedule}
          teachers={teachers}
          labs={labs}
          onScheduleChange={handleScheduleChange} 
        />
        
      </main>
      <Footer />
    </div>
  );
};

export default App;
