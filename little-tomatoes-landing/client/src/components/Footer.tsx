/**
 * Footer Component - Playful Garden Whimsy Design
 * 
 * Design Notes:
 * - Warm background color
 * - Clear navigation and links
 * - Brand consistency
 */

export default function Footer() {
  return (
    <footer className="bg-[#2C3E50] text-white py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-[#D35400]">🍅</span> Little Tomatoes
            </h3>
            <p className="text-gray-300 text-sm">
              Growing big thinkers, one tomato at a time.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4 text-[#D35400]">Product</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition">Features</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition">HiCAP Readiness</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-[#D35400]">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-[#D35400]">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Security</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © 2026 Little Tomatoes. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-6">
            <a href="#" className="text-gray-300 hover:text-[#D35400] transition" title="Facebook">
              <span className="text-xl">f</span>
            </a>
            <a href="#" className="text-gray-300 hover:text-[#D35400] transition" title="Twitter">
              <span className="text-xl">𝕏</span>
            </a>
            <a href="#" className="text-gray-300 hover:text-[#D35400] transition" title="Instagram">
              <span className="text-xl">📷</span>
            </a>
            <a href="#" className="text-gray-300 hover:text-[#D35400] transition" title="LinkedIn">
              <span className="text-xl">in</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
