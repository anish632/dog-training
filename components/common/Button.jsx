import React from 'react';

const Button = ({ text, variant = 'primary', ...props }) => {
  const baseClasses = "px-6 py-3 text-xl font-bold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-400",
    secondary: "bg-slate-200 text-slate-700 hover:bg-slate-300 focus:ring-slate-400"
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {text}
    </button>
  );
};

export default Button;
