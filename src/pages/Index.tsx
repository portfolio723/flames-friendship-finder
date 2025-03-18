
import React from 'react';
import FlamesCalculator from '@/components/FlamesCalculator';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-accent p-4">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[30vw] h-[30vw] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-[15%] right-[15%] w-[25vw] h-[25vw] rounded-full bg-primary/5 blur-[100px]" />
      </div>
      
      <div className="max-w-4xl w-full relative z-10">
        <header className="text-center mb-8">
          <h1 className="inline-block text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 py-2">
            FLAMES Compatibility
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto mt-2">
            Discover the relationship between two people using the classic FLAMES technique
          </p>
        </header>
        
        <FlamesCalculator />
        
        <footer className="text-center mt-12 text-sm text-muted-foreground">
          <p>FLAMES: Friendship, Love, Affection, Marriage, Enemy, Siblings</p>
          <p className="mt-2 text-[#ea384c] font-medium">Designed by Sandy</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
