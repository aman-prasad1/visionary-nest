import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Animations
const floatRotate = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotateY(0deg);
  }
  25% { 
    transform: translateY(-3px) rotateY(15deg);
  }
  50% { 
    transform: translateY(0px) rotateY(30deg);
  }
  75% { 
    transform: translateY(-2px) rotateY(15deg);
  }
`;

const cardSlide = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  100% {
    transform: translateY(0px) scale(1);
    opacity: 1;
  }
`;

const brandGradient = keyframes`
  0%, 100% { background-position: 0% 50%; }
  25% { background-position: 100% 50%; }
  50% { background-position: 50% 100%; }
  75% { background-position: 100% 0%; }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;


const featuredGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
  }
  50% { 
    box-shadow: 0 0 30px rgba(102, 126, 234, 0.8);
  }
`;

// Styled Components

const LogoContainer = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
  position: relative;
  z-index: 10;
  transform: ${props => {
    switch(props.size) {
      case 'small': return 'scale(0.7)';
      case 'large': return 'scale(1.2)';
      default: return 'scale(1)';
    }
  }};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const HeaderLogo = styled.div<{ $isHovered: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 15px;
  padding: 15px 25px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 15px;
  backdrop-filter: blur(20px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 0 0 1px rgba(102, 126, 234, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(102, 126, 234, 0.1),
      transparent
    );
    transition: left 0.8s ease;
    ${props => props.$isHovered && css`
      left: 100%;
    `}
  }

  ${props => props.$isHovered && css`
    transform: translateY(-2px);
    border-color: rgba(102, 126, 234, 0.6);
    box-shadow:
      0 12px 40px rgba(102, 126, 234, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 0 0 1px rgba(102, 126, 234, 0.3);
  `}

  @media (max-width: 768px) {
    padding: 12px 20px;
    gap: 12px;
  }
`;

const LogoIcon = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;
 

const CardsContainer = styled.div<{ $animationPaused: boolean }>`
  width: 40px;
  height: 36px;
  position: relative;
  transform-style: preserve-3d;
  animation: ${floatRotate} 6s ease-in-out infinite;
  animation-play-state: ${props => props.$animationPaused ? 'paused' : 'running'};
`;

const PortfolioCard = styled.div<{
  $delay: number;
  $isFeatured?: boolean;
  $isHovered: boolean;
  $animationPaused: boolean;
}>`
  position: absolute;
  width: 11px;
  height: 15px;
  border-radius: 3px;
  background: ${props => props.$isFeatured
    ? 'linear-gradient(135deg, #f093fb, #f5576c)'
    : 'linear-gradient(135deg, #667eea, #764ba2)'};
  box-shadow: 
    0 3px 10px rgba(102, 126, 234, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation: ${cardSlide} 0.6s ease-out ${props => props.$delay}s forwards;
  animation-play-state: ${props => props.$animationPaused ? 'paused' : 'running'};
  
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 1px;
    right: 1px;
    height: 2px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 1px;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 1px;
    right: 1px;
    height: 1px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 0.5px;
  }

  ${props => props.$isFeatured && css`
    animation: ${cardSlide} 0.6s ease-out ${props.$delay}s forwards,
                ${featuredGlow} 2s ease-in-out infinite;
    animation-play-state: ${props.$animationPaused ? 'paused' : 'running'};
  `}

  ${props => props.$isHovered && css`
    transform: scale(1.1) rotate(5deg);
    box-shadow:
      0 6px 20px rgba(102, 126, 234, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);

    &:nth-child(odd) {
      background: linear-gradient(135deg, #48bb78, #38a169);
    }

    &:nth-child(even) {
      background: linear-gradient(135deg, #ed8936, #dd6b20);
    }
  `}
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

const BrandName = styled.div<{ $isHovered: boolean }>`
  font-family: 'Orbitron', monospace;
  font-size: 1.8rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 2px;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #667eea 25%,
    #764ba2 50%,
    #f093fb 75%,
    #ffffff 100%
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${brandGradient} 4s ease-in-out infinite;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${props => props.$isHovered ? '100%' : '0'};
    height: 2px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Tagline = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0;
  animation: ${slideIn} 0.8s ease-out 1.5s forwards;
  position: relative;
`;

const GlowEffect = styled.div<{ $isHovered: boolean }>`
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: radial-gradient(
    circle,
    rgba(102, 126, 234, 0.1) 0%,
    transparent 70%
  );
  border-radius: 25px;
  opacity: ${props => props.$isHovered ? 1 : 0};
  transition: opacity 0.4s ease;
  z-index: -1;
`;

// Card positions for 3x3 grid
const cardPositions = [
  { top: '2px', left: '2px' },    // Top row
  { top: '2px', left: '15px' },
  { top: '2px', left: '28px' },
  { top: '12px', left: '2px' },   // Middle row
  { top: '12px', left: '15px' },
  { top: '12px', left: '28px' },
  { top: '22px', left: '2px' },   // Bottom row
  { top: '22px', left: '15px' },
  { top: '22px', left: '28px' },
];

// Props interface
interface VisionaryNestLogoProps {
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
  animationPaused?: boolean;
}

const VisionaryNestLogo: React.FC<VisionaryNestLogoProps> = ({ 
  size = 'medium', 
  onClick, 
  className,
  animationPaused = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [featuredCards, setFeaturedCards] = useState<number[]>([1, 4, 8]);

  // Auto-rotate featured cards
  useEffect(() => {
    if (!animationPaused) {
      const interval = setInterval(() => {
        const newFeatured: number[] = [];
        while (newFeatured.length < 3) {
          const rand = Math.floor(Math.random() * 9);
          if (!newFeatured.includes(rand)) {
            newFeatured.push(rand);
          }
        }
        setFeaturedCards(newFeatured);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [animationPaused]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    
    // Add click animation effect
    const cards = document.querySelectorAll('[data-portfolio-card]');
    cards.forEach((card, index) => {
      setTimeout(() => {
        (card as HTMLElement).style.transform = 'scale(1.3) rotate(15deg)';
        setTimeout(() => {
          (card as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
        }, 200);
      }, index * 30);
    });
  };

  return (
    <>
      {/* Load Google Fonts */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;800&display=swap" 
        rel="stylesheet" 
      />
      
      <LogoContainer size={size} className={className}>
        <HeaderLogo
          $isHovered={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          <GlowEffect $isHovered={isHovered} />
          
          <LogoIcon>
            <CardsContainer $animationPaused={animationPaused}>
              {cardPositions.map((position, index) => (
                <PortfolioCard
                  key={index}
                  data-portfolio-card
                  $delay={0.1 + index * 0.1}
                  $isFeatured={featuredCards.includes(index)}
                  $isHovered={isHovered}
                  $animationPaused={animationPaused}
                  style={{
                    top: position.top,
                    left: position.left,
                  }}
                />
              ))}
            </CardsContainer>
          </LogoIcon>
          
          <LogoText>
            <BrandName $isHovered={isHovered}>
              VisionaryNest
            </BrandName>
            <Tagline>Portfolio Platform</Tagline>
          </LogoText>
        </HeaderLogo>
      </LogoContainer>
    </>
  );
};

export default VisionaryNestLogo;
