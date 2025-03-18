
import React, { useState } from 'react';
import { Flame } from 'lucide-react';
import NameInput from './NameInput';
import AnimatedButton from './AnimatedButton';
import FlamesResult from './FlamesResult';
import { calculateFlames, getFlamesDetails, type FlamesResult } from '@/utils/flamesUtils';
import { cn } from '@/lib/utils';

const FlamesCalculator = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<FlamesResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

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
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className={cn(
        "p-8 rounded-2xl shadow-lg glass",
        "border border-white/20 backdrop-blur-md"
      )}>
        <div className="flex flex-col items-center mb-6">
          <Flame className="w-12 h-12 text-primary mb-2" />
          <h1 className="text-2xl font-semibold">FLAMES</h1>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Find your relationship compatibility
          </p>
        </div>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          handleCalculate();
        }}>
          <div className="space-y-6">
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
      
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          FLAMES: Friendship, Love, Affection, Marriage, Enemy, Siblings
        </p>
      </div>
    </div>
  );
};

export default FlamesCalculator;
