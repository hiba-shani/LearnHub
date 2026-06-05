import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-gray-900 text-white mt-10">

      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">

        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">
            LearnHub
          </h2>
          <p className="mt-2 text-gray-400">
            LearnHub helps you learn and grow your skills easily.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>

          <p className="text-gray-400">Email: support@learnhub.com</p>
          <p className="text-gray-400 mb-3">Phone: +91 7594806139</p>

          {/* Social Icons */}
          <div className="flex gap-4 text-2xl text-gray-400">

            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="hover:text-blue-500 cursor-pointer" />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin className="hover:text-blue-400 cursor-pointer" />
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="hover:text-sky-400 cursor-pointer" />
            </a>

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 border-t border-gray-700 py-4">
        ©️ {new Date().getFullYear()} LearnHub. All rights reserved.
      </div>

    </div>
  );
}

export default Footer;