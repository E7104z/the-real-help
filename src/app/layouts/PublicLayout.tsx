import { Outlet } from 'react-router-dom';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-black">
      <Outlet />
    </div>
  );
}
