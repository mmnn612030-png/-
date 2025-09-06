
export type Teacher = string;
export type Lab = string;
export type Day = 'الأحد' | 'الإثنين' | 'الثلاثاء' | 'الأربعاء' | 'الخميس';
export type Period = 'الأولى' | 'الثانية' | 'الثالثة' | 'الرابعة' | 'الخامسة' | 'السادسة' | 'السابعة';

export type Schedule = Record<Day, Record<Period, Record<Lab, Teacher>>>;
