import SideBar from '@/components/leftbar';
import { Outlet } from 'react-router-dom';

export function Test123() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}
