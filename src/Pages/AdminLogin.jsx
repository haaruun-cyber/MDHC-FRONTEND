import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaLock, FaUser, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { Skeleton } from "../Components/Skeleton";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [booting, setBooting] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/dashboard");
    }
    const t = setTimeout(() => setBooting(false), 400);
    return () => clearTimeout(t);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = import.meta.env.VITE_API_URL + "/api/user/login";
      const { data } = await axios.post(url, credentials);

      if (data.status === true) {
        toast.success(data.message);
        const token = data.Token || data.token;
        if (token) {
          localStorage.setItem("token", token);
        }
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 800);
      } else {
        toast.error(data.message);
        setError("Magac ama furaha khalad • Invalid credentials");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      const message =
        err.response?.data?.message ||
        "Waxaa dhacay qalad. Fadlan isku day mar kale.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (booting) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-12 animate-fade-in">
        <div className="max-w-md w-full space-y-4" aria-busy="true" aria-label="Loading login">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 animate-fade-in-up">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-emerald-100 transition-transform duration-300 hover:shadow-2xl">
          <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-cyan-600 px-8 py-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                <FaUserShield className="text-4xl text-emerald-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white text-center">Gelitaanka Maamulka</h2>
            <p className="text-emerald-100 text-center mt-2">Admin Login</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center border border-red-200 animate-fade-in">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                <FaUser className="inline mr-2 text-emerald-600" />
                Email
              </label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                placeholder="Gali email"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                <FaLock className="inline mr-2 text-blue-600" />
                Furaha • Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Gali furaha"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white rounded-lg transition-all duration-300 shadow-md font-semibold flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 hover:shadow-lg"
              }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Loading…</span>
                </>
              ) : (
                <span>Gal • Login</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
