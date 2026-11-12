import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-black text-white">
      <h1 className="mb-4 text-4xl font-bold">403 — Unauthorized</h1>
      <p className="mb-8 text-gray-400">You do not have permission to view this page.</p>
      <Link
        to="/"
        className="rounded-lg bg-[#c0a36b] px-6 py-3 font-semibold text-black hover:bg-[#a68b4b] transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
