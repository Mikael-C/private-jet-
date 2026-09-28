import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-jet-950 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-display font-bold text-gold-gradient mb-4">
          404
        </h1>
        <h2 className="text-3xl font-display font-bold text-jet-950 dark:text-white mb-4">
          Destination Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-body mb-8">
          The page you&apos;re looking for seems to have taken a different flight
          path. Let&apos;s get you back on course.
        </p>
        <Link href="/" className="btn-gold inline-block">
          Return Home
        </Link>
      </div>
    </main>
  );
}
