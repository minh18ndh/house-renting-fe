import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false, size = 'md' }) => {
  const baseStyles = "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5",
    lg: "px-8 py-3 text-lg"
  };
  
  const variants = {
    primary: "bg-primary text-white hover:bg-opacity-90 focus:ring-primary",
    secondary: "bg-accent text-white hover:bg-opacity-90 focus:ring-accent",
    outline: "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
    ghost: "bg-transparent text-text-main hover:bg-gray-100 focus:ring-primary",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${disabled ? disabledStyles : ''} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;