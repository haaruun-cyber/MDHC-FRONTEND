// components/Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white">Midowga</span>
                <span className="block text-sm text-emerald-400">Dhalinyarada Calas</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Midowga Dhalinyarada Calas waa urur ka shaqeeya horumarinta 
              dhalinyarada iyo bulshada.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Xiriiriyeyaasha</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Bogga Hore</a></li>
              <li><a href="/register" className="hover:text-white transition">Diiwaan Geli</a></li>
              <li><a href="/admin" className="hover:text-white transition">Maamulka</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Nala Soo Xiriir</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@midowgacalas.so</li>
              <li>Tel: +252 61 234 5678</li>
              <li>Cinwaan: Muqdisho, Soomaaliya</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Nala Soco</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition">
                <FaFacebook />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-sky-500 transition">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center space-x-2">
            <span>Waxaa sameeyay</span>
            <FaHeart className="text-red-500" />
            <span>© 2024 Midowga Dhalinyarada Calas. Xuquuqda Way Baxsan Tahay.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;