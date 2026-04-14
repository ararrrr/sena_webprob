import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaFileAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';

const links = [
  { label: 'Home', to: '/home', icon: <FaHome /> },
  { label: 'About', to: '/about', icon: <FaUser /> },
  { label: 'Articles', to: '/articles', icon: <FaFileAlt /> },
];

const navLinkClassName = ({ isActive }) =>
  [
    'flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-200',
    isActive
      ? 'bg-white text-black'
      : 'text-white hover:bg-white hover:text-black',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center pt-6">
      <div className="flex h-14 w-full max-w-7xl items-center justify-between rounded-full bg-zinc-900/90 backdrop-blur px-6 shadow-xl">

        {/* Logo */}
        <img
  src={logo}
  alt="logo"
  className="h-20 w-20 object-contain"
/>

        {/* Links */}
        <div className="flex items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/home'}
              className={navLinkClassName}
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </div>

      </div>
    </header>
  );
};

export default NavBar;
