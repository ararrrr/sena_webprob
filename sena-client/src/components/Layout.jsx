import { Outlet } from 'react-router-dom';
import NavBar from './NavBar.jsx';

const Layout = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavBar />
      <main className="pb-16 pt-24">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;