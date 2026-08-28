import { Hero10 } from '@/components/ui/hero-10';

export function LandingPage() {
  return (
    <Hero10
      title="Security scans,"
      titleLine2Prefix="orchestrated by"
      titleHighlight="AI agents"
      description="Multi-agent security scans — SAST, secrets, and dependency findings, orchestrated and surfaced in one place."
      images={[
        'https://images.unsplash.com/photo-1685013640715-8701bbaa2207?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1746467364902-ab40952e33fe?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ]}
      imageAlts={['Security dashboard', 'Scan findings', 'Agent orchestration']}
      animation="subtle"
      primaryCTA={{
        ctaEnabled: true,
        text: 'Get started',
        link: '/sign-up',
        variant: 'default',
        size: 'default',
      }}
      secondaryCTA={{
        ctaEnabled: true,
        text: 'Sign in',
        link: '/sign-in',
        variant: 'outline',
        size: 'default',
      }}
    />
  );
}
