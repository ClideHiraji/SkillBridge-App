import { Link } from 'react-router';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  className?: string;
}

export function Logo({ size = 'md', href = '/', className = '' }: LogoProps) {
  const sizeMap = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32',
  };

  const img = (
    <img
      src="/images/logo/skillbridge-logo.png"
      alt="SkillBridge Logo"
      className={`${sizeMap[size]} w-auto rounded-lg ${className}`}
    />
  );

  return href ? <Link to={href}>{img}</Link> : img;
}
