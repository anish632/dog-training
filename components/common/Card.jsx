import React from 'react';

const Card = ({ title, description, icon: Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left w-full h-full flex flex-col items-start border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-sky-300"
    >
      <div className="bg-sky-100 p-3 rounded-full mb-4">
        <Icon className="w-8 h-8 text-sky-600" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-base flex-grow">{description}</p>
    </button>
  );
};

export default Card;
