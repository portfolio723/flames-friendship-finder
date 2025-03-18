
import React from 'react';
import { Flame, Heart, HeartCrack, MessageCircleHeart, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type FlamesResult as FlamesResultType, FlamesResultDetails } from '@/utils/flamesUtils';
import AnimatedButton from './AnimatedButton';
import { useIsMobile } from '@/hooks/use-mobile';

interface FlamesResultProps {
  result: FlamesResultDetails;
  name1: string;
  name2: string;
  onReset: () => void;
}

const FlamesResult = ({ result, name1, name2, onReset }: FlamesResultProps) => {
  const isMobile = useIsMobile();
  
  const getIcon = () => {
    const iconSize = isMobile ? "w-12 h-12" : "w-16 h-16";
    
    switch (result.type) {
      case 'Friendship':
        return <MessageCircleHeart className={`${iconSize} text-flames-friendship animate-pulse-slow`} />;
      case 'Love':
        return <Heart className={`${iconSize} text-flames-love animate-pulse-slow`} />;
      case 'Affection':
        return <Heart className={`${iconSize} text-flames-affection animate-pulse-slow`} />;
      case 'Marriage':
        return <Flame className={`${iconSize} text-flames-marriage animate-pulse-slow`} />;
      case 'Enemy':
        return <HeartCrack className={`${iconSize} text-flames-enemy animate-pulse-slow`} />;
      case 'Siblings':
        return <Check className={`${iconSize} text-flames-siblings animate-pulse-slow`} />;
      default:
        return <Flame className={`${iconSize} text-primary animate-pulse-slow`} />;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-scale-in px-3 sm:px-0">
      <div className={cn(
        "p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg glass",
        "border border-white/20 backdrop-blur-md"
      )}>
        <div className="flex flex-col items-center">
          <div className="mb-4 md:mb-6 flex flex-col items-center">
            {getIcon()}
            <h2 className={cn(
              "text-xl md:text-2xl font-semibold mt-4",
              `text-${result.color}`
            )}>
              {result.type}
            </h2>
          </div>
          
          <div className="w-full mb-4 md:mb-6 text-center">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
              <span className="text-base md:text-lg font-medium">{name1}</span>
              <span className="text-muted-foreground">&</span>
              <span className="text-base md:text-lg font-medium">{name2}</span>
            </div>
            
            <p className="text-xs md:text-sm text-muted-foreground mt-2">
              {result.description}
            </p>
          </div>
          
          <div className="flex justify-center w-full mt-2">
            <AnimatedButton 
              onClick={onReset} 
              className="w-full"
            >
              Try Another
            </AnimatedButton>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6 md:mt-8 text-xs md:text-sm text-muted-foreground">
        <p>FLAMES: Friendship, Love, Affection, Marriage, Enemy, Siblings</p>
      </div>
    </div>
  );
};

export default FlamesResult;
