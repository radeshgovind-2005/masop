import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 bg-white dark:bg-neutral-900 px-4 text-center">
      <h1 className="text-4xl font-medium text-neutral-800 dark:text-neutral-100">MASOP</h1>
      <p className="max-w-md text-neutral-500 dark:text-neutral-400">
        Multi-agent security scans — SAST, secrets, and dependency findings, orchestrated and
        surfaced in one place.
      </p>
      <div className="flex gap-3">
        <Link
          to="/sign-in"
          className="rounded-md border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          Sign in
        </Link>
        <Link
          to="/sign-up"
          className="rounded-md bg-neutral-900 dark:bg-neutral-100 px-4 py-2 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90"
        >
          Get started
        </Link>
      </div>
    </div>
  );
}
