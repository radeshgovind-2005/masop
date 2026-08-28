import { Link } from 'react-router-dom';

import { Button, type ButtonProps } from '@/components/ui/button';

export interface CtaProps {
  ctaEnabled?: boolean;
  text: string;
  link: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
}

export function Cta({ cta }: Readonly<{ cta: CtaProps }>) {
  return (
    <Button asChild variant={cta.variant} size={cta.size}>
      <Link to={cta.link}>{cta.text}</Link>
    </Button>
  );
}
