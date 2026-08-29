import { useState } from 'react';
import { LayoutDashboard, ScanSearch, Settings, ShieldAlert } from 'lucide-react';
import { AccountControl } from '@/components/account-control';
import { NotchNav } from '@/components/ui/adaptive-notch-navigation-bar';
import type { NotchItemData } from '@/components/ui/adaptive-notch-navigation-bar';

const NAV_ITEMS: NotchItemData[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'scans', label: 'Scans', icon: ScanSearch },
  { id: 'findings', label: 'Findings', icon: ShieldAlert },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const PANEL_COPY: Record<string, { title: string; description: string }> = {
  dashboard: {
    title: 'Dashboard',
    description: 'Scan results and findings will show up here.',
  },
  scans: {
    title: 'Scans',
    description: 'Agent-run scans will be listed here once orchestration is wired up.',
  },
  findings: {
    title: 'Findings',
    description: 'Security findings surfaced by agents will show up here.',
  },
  settings: {
    title: 'Settings',
    description: 'Project and agent configuration will live here.',
  },
};

const LogoSlot = (
  <div className="flex items-center gap-1.5 sm:gap-2 h-8.5">
    <div className="flex size-7 items-center justify-center rounded-lg bg-zinc-800 dark:bg-zinc-300">
      <ShieldAlert className="size-4 text-zinc-50 dark:text-zinc-950" />
    </div>
    <span className="hidden sm:inline text-xs sm:text-sm font-bold tracking-tight">MASOP</span>
  </div>
);

export function DashboardPage() {
  const [activeId, setActiveId] = useState('dashboard');
  const panel = PANEL_COPY[activeId] ?? PANEL_COPY.dashboard;

  return (
    <NotchNav
      items={NAV_ITEMS}
      activeId={activeId}
      onActiveChange={setActiveId}
      logo={LogoSlot}
      rightContent={<AccountControl />}
    >
      <div className="flex w-full max-w-md flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center shadow-xs">
        <h1 className="text-2xl font-medium text-foreground">{panel.title}</h1>
        <p className="text-muted-foreground">{panel.description}</p>
      </div>
    </NotchNav>
  );
}
