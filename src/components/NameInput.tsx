
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface NameInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const NameInput = ({ 
  label, 
  value, 
  onChange, 
  className, 
  ...props 
}: NameInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative w-full mb-6">
      <label 
        className={cn(
          "absolute transition-all duration-200 pointer-events-none",
          isFocused || value 
            ? "text-xs text-primary font-medium -translate-y-6" 
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
          "w-full py-2 bg-transparent border-0 border-b-2 border-b-border",
          "text-foreground text-lg focus-ring",
          "transition-all duration-200 ease-in-out outline-none",
          "focus:border-b-primary",
          value && "border-b-primary/50",
          className
        )}
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
