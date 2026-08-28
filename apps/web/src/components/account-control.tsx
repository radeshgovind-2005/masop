import { UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSidebar } from '@/components/ui/sidebar';
import { useAuth } from '@/ports/auth-context';

export function AccountControl() {
  const { open, animate } = useSidebar();
  const auth = useAuth();

  return (
    <button
      type="button"
      onClick={() => void auth.signOut()}
      className="flex items-center justify-start gap-2 group/sidebar py-2 w-full text-left"
    >
      <UserCircle className="h-7 w-7 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      <motion.span
        animate={{
          display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {auth.user?.displayName ?? 'Account'}
      </motion.span>
    </button>
  );
}
