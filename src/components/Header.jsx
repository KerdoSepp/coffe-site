import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md relative">
      {/* Logo */}
      <a href="/" className="font-bold text-xl tracking-wide">
        <span className="hidden sm:inline">Header</span>
        <span className="sm:hidden">O.B.</span>
      </a>

      {/* Hamburger Button */}
      <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Navigation Links */}
      <ul
        className={`
          absolute md:static top-full left-0 w-full md:w-auto
          bg-white md:bg-transparent
          flex flex-col md:flex-row
          items-center gap-6
          px-6 py-4 md:p-0
          shadow-md md:shadow-none
          transition-all duration-300
          ${open ? 'flex' : 'hidden md:flex'}
        `}
      >
        <li>
          <a
            href="/about"
            className="text-sm font-medium hover:text-pink-500 transition"
          >
            ABOUT
          </a>
        </li>
      </ul>
    </nav>
  );
}
