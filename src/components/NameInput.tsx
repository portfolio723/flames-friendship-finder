
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface NameInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const NameInput = ({ 
  label, 
  value, 
  onChange, 
  className, 
  placeholder,
  ...props 
}: NameInputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative w-full mb-6">
      <label 
        className={cn(
          "absolute transition-all duration-200 pointer-events-none",
          isFocused || value 
            ? "text-xs text-primary font-medium -translate-y-8" // Increased vertical spacing from -6 to -8
            : "text-sm text-muted-foreground translate-y-1"
        )}
      >
        {label}
      </label>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "w-full py-3 px-3", // Added horizontal padding (px-3) and increased vertical padding (py-3)
          "bg-transparent border-0 border-b-2 border-b-border",
          "text-foreground text-lg focus-ring",
          "transition-all duration-200 ease-in-out outline-none",
          "focus:border-b-primary",
          "mt-2", // Added top margin to create more space above the input
          value && "border-b-primary/50",
          className
        )}
        placeholder={placeholder}
        autoComplete="off"
        {...props}
      />
      
      <div 
        className={cn(
          "absolute bottom-0 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out",
          isFocused ? "w-full" : "w-0"
        )}
      />
    </div>
  );
};

export default NameInput;
