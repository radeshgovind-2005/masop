import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { LayoutDashboard, ScanSearch, ShieldAlert, Settings, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const links = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <LayoutDashboard className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: 'Scans',
    href: '#',
    icon: <ScanSearch className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: 'Findings',
    href: '#',
    icon: <ShieldAlert className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
  {
    label: 'Settings',
    href: '#',
    icon: <Settings className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
  },
];

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden',
        'h-screen',
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link) => (
                <SidebarLink key={link.label} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: 'Account',
                href: '#',
                icon: (
                  <UserCircle className="h-7 w-7 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex flex-1 overflow-auto">{children}</main>
    </div>
  );
}

const Logo = () => {
  return (
    <a href="#" className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        MASOP
      </motion.span>
    </a>
  );
};

const LogoIcon = () => {
  return (
    <a href="#" className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </a>
  );
};
