
import React from 'react';
import { PawPrintIcon } from './icons/Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 md:px-8 flex items-center gap-4">
        <PawPrintIcon className="w-10 h-10 text-sky-600" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Service Dog Assistant
          </h1>
          <p className="text-slate-600">Your Partner in Training</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
