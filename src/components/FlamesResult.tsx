
import React from 'react';
import { Flame, Heart, HeartCrack, MessageCircleHeart, Check, X, Download, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type FlamesResult as FlamesResultType, FlamesResultDetails } from '@/utils/flamesUtils';
import AnimatedButton from './AnimatedButton';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

interface FlamesResultProps {
  result: FlamesResultDetails;
  name1: string;
  name2: string;
  onReset: () => void;
}

const FlamesResult = ({ result, name1, name2, onReset }: FlamesResultProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
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

  const downloadResult = () => {
    const content = `
FLAMES Compatibility Result
---------------------------
${name1} & ${name2}
Result: ${result.type}
Description: ${result.description}
---------------------------
Generated with FLAMES Compatibility App
`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flames-result-${name1.toLowerCase()}-${name2.toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "Your FLAMES result has been downloaded as a text file.",
      duration: 3000,
    });
  };

  const shareResult = async () => {
    const shareData = {
      title: "FLAMES Compatibility Result",
      text: `${name1} & ${name2} - ${result.type}: ${result.description}`,
      url: window.location.href
    };

    try {
      if (navigator.share && isMobile) {
        await navigator.share(shareData);
        toast({
          title: "Shared!",
          description: "Your FLAMES result has been shared successfully.",
          duration: 3000,
        });
      } else {
        // Fallback for desktop or browsers without Web Share API
        navigator.clipboard.writeText(shareData.text);
        toast({
          title: "Copied to clipboard!",
          description: "Share link copied to clipboard.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        title: "Share failed",
        description: "Could not share the result. Try copying manually.",
        variant: "destructive",
        duration: 3000,
      });
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full mt-2">
            <AnimatedButton 
              onClick={onReset} 
              className="md:col-span-1"
            >
              Try Another
            </AnimatedButton>
            
            <AnimatedButton 
              onClick={downloadResult} 
              variant="outline"
              className="md:col-span-1 flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </AnimatedButton>
            
            <AnimatedButton 
              onClick={shareResult} 
              variant="outline"
              className="md:col-span-1 flex items-center justify-center"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlamesResult;
