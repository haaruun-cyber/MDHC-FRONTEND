// pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaArrowRight, FaUsers, FaCheckCircle, FaGlobe, FaStar, FaHandsHelping } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden animate-fade-in-up">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-blue-600 to-cyan-500 opacity-10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in-up animation-delay-100">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full mb-6">
                <FaStar className="text-yellow-500 mr-2" />
                <span className="text-sm font-semibold text-gray-700">Ku Soo Dhawow • Welcome</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-gray-800">Midowga</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Dhalinyarada Calas
                </span>
                {/* <h1 style={{color: 'red'}}>TEST CHANGE</h1> */}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Iska diwaan geli si aad uga qayb qaadato barnaamijyada iyo hawlaha 
                ururka. Join us to participate in our programs and activities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-3"
                >
                  <span className="text-lg font-semibold">Is Diiwaan Geli</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="px-8 py-4 border-2 border-emerald-600 text-emerald-600 rounded-xl hover:bg-emerald-50 transition-all duration-300 font-semibold">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center p-4 bg-white rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-emerald-600">500+</div>
                  <div className="text-gray-600 text-sm">Xubno • Members</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-blue-600">25+</div>
                  <div className="text-gray-600 text-sm">Mashruuc • Projects</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-cyan-600">10+</div>
                  <div className="text-gray-600 text-sm">Sano • Years</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block animate-fade-in-up animation-delay-200">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-2xl blur-3xl opacity-20"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-2xl border-2 border-emerald-100">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Maxaan Qabanaa?
                    <span className="block text-sm font-normal text-gray-500 mt-1">Our Services</span>
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: FaUsers, title: "Iskaashi & Midnimo", desc: "Unity and Cooperation", color: "emerald" },
                      { icon: FaHandsHelping, title: "Horumarinta Dhalinyarada", desc: "Youth Development", color: "blue" },
                      { icon: FaGlobe, title: "Wacyigelinta Bulshada", desc: "Community Awareness", color: "cyan" },
                      { icon: FaCheckCircle, title: "Tababarka Xirfadaha", desc: "Skills Training", color: "green" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition">
                        <div className={`p-3 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg text-white`}>
                          <item.icon size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{item.title}</h3>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white animate-fade-in-up animation-delay-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nala Soo Xiriir</h2>
            <p className="text-gray-600 text-lg">Waan ku faraxsanahay inaan kaa caawino su'aalahaaga</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition border border-emerald-100">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FaPhone className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Telefoon • Phone</h3>
              <p className="text-gray-600">+252 61 234 5678</p>
              <p className="text-gray-600">+252 62 876 5432</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition border border-blue-100">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <FaEnvelope className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600">info@midowgacalas.so</p>
              <p className="text-gray-600">contact@midowgacalas.so</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition border border-emerald-100">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Cinwaanka • Location</h3>
              <p className="text-gray-600">Wadada Warshadaha</p>
              <p className="text-gray-600">Mogadishu, Somalia</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition border border-cyan-100">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FaClock className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Saacadaha • Hours</h3>
              <p className="text-gray-600">Sabti - Khamiis: 8:00 - 16:00</p>
              <p className="text-gray-600">Jimce: 8:00 - 11:30</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;