import React, { useRef } from 'react';

interface HeaderProps {
  logo: string | null;
  onLogoChange: (file: File) => void;
}

const Header: React.FC<HeaderProps> = ({ logo, onLogoChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onLogoChange(event.target.files[0]);
    }
  };

  return (
    <header className="bg-white shadow-md text-center py-4">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800">مدرسة السليل الثانوية - بنين</h1>
        <h2 className="text-xl md:text-3xl font-bold text-blue-700 mt-2">جدول زيارة المعلمين لمعامل العلوم</h2>
        <div className="mt-4 pt-4 border-t flex justify-end items-center">
          <div className="flex items-center space-x-2 space-x-reverse">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <button
              onClick={handleLogoClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
            >
              {logo ? 'تغيير الشعار' : 'إضافة شعار'}
            </button>
            {logo && <img src={logo} alt="School Logo" className="h-24 w-24 object-contain rounded-full border-2 border-blue-200" />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;