"use client";

import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import SlidingMenu from "./SlidingMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <button
            onClick={openMenu}
            className="-m-1.5 p-1.5 text-gray-900 font-semibold"
          >
            <span>Log in</span>
          </button>
        </div>
        <div>
          <h1>Car Rental System</h1>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Contact US <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>

      {/* Sliding Menu */}
      <SlidingMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
}
