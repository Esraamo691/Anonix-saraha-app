import React from "react";
import { Link } from "react-router-dom";
import LogoImg from "../Navbar/LogoImg";

export default function Footer() {
  return (
    <>
      <footer className=" bg-[#00013d] footer text-gray-200 py-16 ">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-3">
            <LogoImg />
            <h1 className=" tracking-wide logo-gradient">Anonix</h1>
          </div>

          <nav className="flex space-x-6">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
            <Link to="/profile" className="hover:text-white transition">
              Profile
            </Link>
            <Link to="/login" className="hover:text-white transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-white transition">
              Sign up
            </Link>
          </nav>

          <div className="text-sm text-gray-400 text-center md:text-right">
            &copy; {new Date().getFullYear()} Kudo. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
