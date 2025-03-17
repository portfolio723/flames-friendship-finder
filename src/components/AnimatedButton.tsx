
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const AnimatedButton = ({ 
  children, 
  className, 
  variant = 'default',
  size = 'md',
  disabled,
  ...props 
}: AnimatedButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none overflow-hidden";
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
    outline: "border border-primary bg-transparent text-primary hover:bg-primary/10 active:scale-[0.98]",
    ghost: "bg-transparent text-primary hover:bg-primary/10 active:scale-[0.98]"
  };
  
  const sizes = {
    sm: "text-sm py-1 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-2.5 px-5"
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 z-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pulse-animation" />
      
      {/* Interactive ripple effect */}
      <span className="absolute z-0 w-full h-full pointer-events-none ripple-animation" />
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .pulse-animation {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 0;
            }
            50% {
              opacity: 0.3;
            }
          }
          
          .ripple-animation {
            background-position: center;
            transition: background 0.5s;
          }
          
          button:hover .ripple-animation {
            background: radial-gradient(circle, transparent 1%, rgba(255, 255, 255, 0.1) 1%) center/15000%;
          }
          
          button:active .ripple-animation {
            background-color: rgba(255, 255, 255, 0.2);
            background-size: 100%;
            transition: background 0s;
          }
        `
      }} />
    </button>
  );
};

export default AnimatedButton;
