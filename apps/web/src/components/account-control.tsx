import { LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '@/ports/auth-context';

export function AccountControl() {
  const auth = useAuth();

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 h-8.5">
      <div className="hidden sm:flex size-7 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 dark:bg-zinc-300 dark:text-zinc-800">
        <UserCircle className="size-4" />
      </div>

      <button
        type="button"
        onClick={() => void auth.signOut()}
        aria-label="Sign out"
        className="cursor-pointer items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 flex dark:text-zinc-600 dark:hover:text-zinc-900 outline-none"
      >
        <span className="hidden sm:inline">{auth.user?.displayName ?? 'Sign out'}</span>
        <LogOut className="size-4 sm:size-3.5" />
      </button>
    </div>
  );
}
