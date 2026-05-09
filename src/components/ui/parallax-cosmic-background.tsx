import React, { useEffect, useState } from 'react';

interface CosmicParallaxBgProps {
  /**
   * Main heading text (displayed large in the center)
   */
  head?: string;
  
  /**
   * Subtitle text (displayed below the heading)
   * Comma-separated string that will be split into animated parts
   */
  text?: string;
  
  /**
   * Whether the text animations should loop
   * @default true
   */
  loop?: boolean;
  
  /**
   * Custom class name for additional styling
   */
  className?: string;
}

/**
 * A cosmic parallax background component with animated stars and text
 */
const CosmicParallaxBg: React.FC<CosmicParallaxBgProps> = ({
  head = "",
  text = "",
  loop = true,
  className = '',
}) => {
  const [smallStars, setSmallStars] = useState<string>('');
  const [mediumStars, setMediumStars] = useState<string>('');
  const [bigStars, setBigStars] = useState<string>('');
  
  // Split the text by commas and trim whitespace
  const textParts = text.split(',').map(part => part.trim());
  
  // Generate random star positions
  const generateStarBoxShadow = (count: number): string => {
    let shadows = [];
    
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      shadows.push(`${x}px ${y}px #FFF`);
    }
    
    return shadows.join(', ');
  };
  
  useEffect(() => {
    // Generate star shadows when component mounts
    setSmallStars(generateStarBoxShadow(700));
    setMediumStars(generateStarBoxShadow(200));
    setBigStars(generateStarBoxShadow(100));
    
    // Set animation iteration based on loop prop
    document.documentElement.style.setProperty(
      '--animation-iteration', 
      loop ? 'infinite' : '1'
    );
  }, [loop]);
  
  return (
    <div className={`cosmic-parallax-container absolute inset-0 -z-10 w-full h-full overflow-hidden bg-black ${className}`}>
      {/* Stars layers */}
      <div 
        id="stars" 
        style={{ boxShadow: smallStars }}
        className="w-[1px] h-[1px] bg-transparent animate-[animStar_50s_linear_infinite]"
      ></div>
      <div 
        id="stars2" 
        style={{ boxShadow: mediumStars }}
        className="w-[2px] h-[2px] bg-transparent animate-[animStar_100s_linear_infinite]"
      ></div>
      <div 
        id="stars3" 
        style={{ boxShadow: bigStars }}
        className="w-[3px] h-[3px] bg-transparent animate-[animStar_150s_linear_infinite]"
      ></div>
      
      {/* Horizon and Earth */}
      <div id="horizon" className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#111] to-transparent">
        <div className="glow absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_bottom,rgba(192,132,252,0.15)_0%,transparent_50%)]"></div>
      </div>
      <div id="earth" className="absolute -bottom-[50%] left-1/2 -translate-x-1/2 w-[200%] h-[100%] rounded-[100%] bg-gradient-to-b from-[#111] to-[#000]"></div>
      
      {/* Title and subtitle */}
      {head && <div id="title" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[150%] text-6xl font-bold tracking-[20px] text-white opacity-80 z-10">{head.toUpperCase()}</div>}
      {text && (
        <div id="subtitle" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl tracking-[10px] text-white opacity-70 z-10 flex gap-4">
          {textParts.map((part, index) => (
            <React.Fragment key={index}>
              <span className={`subtitle-part-${index + 1}`}>{part.toUpperCase()}</span>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export {CosmicParallaxBg}
