const Input = ({ type = 'text', placeholder, value, onChange, name, className = '', required = false, label, disabled = false }) => {
  return (
    <div className="w-full">
      {label && <label htmlFor={name} className="block text-sm font-medium text-text-muted mb-1">{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-2.5 border border-border rounded-md focus:ring-primary focus:border-primary transition-colors placeholder-text-muted disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
      />
    </div>
  );
};

export default Input;