
import React, { useState } from 'react';
import { Flame } from 'lucide-react';
import NameInput from './NameInput';
import AnimatedButton from './AnimatedButton';
import FlamesResult from './FlamesResult';
import { calculateFlames, getFlamesDetails, type FlamesResult as FlamesResultType } from '@/utils/flamesUtils';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const FlamesCalculator = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<FlamesResultType | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  const isMobile = useIsMobile();

  const handleCalculate = () => {
    setError('');
    
    if (!name1.trim() || !name2.trim()) {
      setError('Please enter both names');
      return;
    }
    
    setIsCalculating(true);
    
    // Simulate calculation with a slight delay for better UX
    setTimeout(() => {
      const flamesResult = calculateFlames(name1, name2);
      setResult(flamesResult);
      setIsCalculating(false);
    }, 1000);
  };
  
  const handleReset = () => {
    setResult(null);
    setName1('');
    setName2('');
    setError('');
  };
  
  if (result) {
    return (
      <FlamesResult 
        result={getFlamesDetails(result)} 
        name1={name1}
        name2={name2}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in px-3 sm:px-0">
      <div className={cn(
        "p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg glass",
        "border border-white/20 backdrop-blur-md"
      )}>
        <div className="flex flex-col items-center mb-4 md:mb-6">
          <Flame className="w-8 h-8 md:w-12 md:h-12 text-primary mb-2" />
          <h1 className="text-xl md:text-2xl font-semibold">FLAMES</h1>
          <p className="text-xs md:text-sm text-muted-foreground text-center mt-2">
            Find your relationship compatibility
          </p>
        </div>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          handleCalculate();
        }}>
          <div className="space-y-4 md:space-y-6">
            <NameInput
              label=""
              value={name1}
              onChange={setName1}
              placeholder="Enter your name"
            />
            
            <NameInput
              label=""
              value={name2}
              onChange={setName2}
              placeholder="Enter their name"
            />
            
            {error && (
              <p className="text-destructive text-sm animate-slide-up">{error}</p>
            )}
            
            <AnimatedButton
              type="submit"
              className="w-full mt-4"
              disabled={isCalculating}
            >
              {isCalculating ? "Calculating..." : "Calculate Relationship"}
            </AnimatedButton>
          </div>
        </form>
      </div>
      
      <div className="mt-6 md:mt-8 text-center">
        <p className="text-xs md:text-sm text-muted-foreground">
          FLAMES: Friendship, Love, Affection, Marriage, Enemy, Siblings
        </p>
      </div>
    </div>
  );
};

export default FlamesCalculator;
