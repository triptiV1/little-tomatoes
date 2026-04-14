/**
 * Header/Navigation Component - Playful Garden Whimsy Design
 * 
 * Design Notes:
 * - Sticky navigation with brand logo
 * - Clean, minimalist design that doesn't distract from content
 * - Quick links to key sections
 * - CTA button for sign-up
 */

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Characters", href: "#characters" },
    { label: "How It Works", href: "#growth" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-3xl">🍅</span>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-[#2C3E50]">
                Little <span className="text-[#C0392B]">Tomatoes</span>
              </h1>
              <p className="text-xs text-[#7F8C8D]">Growing Big Thinkers</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#7F8C8D] hover:text-[#C0392B] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="px-6 py-2 bg-gradient-to-r from-[#C0392B] to-[#D35400] text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm">
              Start Free Trial
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#2C3E50]" />
            ) : (
              <Menu className="w-6 h-6 text-[#2C3E50]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 animate-fade-in-up">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium text-[#7F8C8D] hover:text-[#C0392B] hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-[#C0392B] to-[#D35400] text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 text-sm">
              Start Free Trial
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
