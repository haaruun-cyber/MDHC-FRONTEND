import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTint,
  FaHeart,
  FaVenusMars,
  FaCamera,
  FaGraduationCap,
  FaBook,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Skeleton } from "../Components/Skeleton";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bloodGroup: "",
    maritalStatus: "",
    gender: "",
    personImage: null,
    qaraan: "",
    educationLevel: "",
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const educationLevels = [
    "Dugsiga Sare",
    "Bachelor's",
    "Master's",
    "PhD",
    "Diploma",
    "Kale",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, personImage: file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = import.meta.env.VITE_API_URL + "/api/costomer/";
      const form = new FormData();

      form.append("fullName", formData.fullName);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("bloodGroup", formData.bloodGroup);
      form.append("maritalStatus", formData.maritalStatus);
      form.append("gender", formData.gender);
      form.append("qaraan", String(formData.qaraan));
      form.append("educationLevel", formData.educationLevel);

      if (formData.personImage) {
        form.append("personImage", formData.personImage);
      }

      const { data } = await axios.post(url, form);

      if (data.status == true) {
        toast.success(data.message);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          bloodGroup: "",
          maritalStatus: "",
          gender: "",
          personImage: null,
          qaraan: "",
          educationLevel: "",
        });
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Waxaa dhacay qalad. Fadlan isku day mar kale.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative animate-fade-in-up">
      {submitting && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm animate-fade-in"
          aria-busy="true"
          aria-label="Submitting registration"
        >
          <div className="flex flex-col items-center gap-4 p-8">
            <FaSpinner className="text-4xl text-emerald-600 animate-spin" />
            <p className="text-gray-700 font-medium">Waa la dirayaa • Sending…</p>
            <div className="w-64 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 max-w-[85%]" />
              <Skeleton className="h-3 max-w-[65%]" />
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-emerald-100 transition-shadow duration-300 hover:shadow-2xl">
        <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-cyan-600 px-8 py-6">
          <h2 className="text-3xl font-bold text-white">Foomka Diiwaangelinta</h2>
          <p className="text-emerald-100 mt-2">Fadlan si taxadar leh u buuxi faahfaahintaada</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                <FaUser className="inline mr-2 text-emerald-600" />
                Magaca Buuxa • Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                placeholder="Gali magacaaga buuxa"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <FaEnvelope className="inline mr-2 text-blue-600" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <FaPhone className="inline mr-2 text-cyan-600" />
                Lambarka Telefoonka
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                placeholder="+252 61 234 5678"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <FaTint className="inline mr-2 text-red-600" />
                Nooca Dhiiga • Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              >
                <option value="">Dooro Nooca Dhiiga</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <FaHeart className="inline mr-2 text-pink-600" />
                Xaaladda Guur • Marital Status
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              >
                <option value="">Dooro Xaaladda</option>
                <option value="single">Keli ah • Single</option>
                <option value="married">Guursan • Married</option>
                <option value="divorced">Fure • Divorced</option>
                <option value="widowed">Laga Tegay • Widowed</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <FaVenusMars className="inline mr-2 text-purple-600" />
                Jinsi • Gender
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleInputChange}
                    className="mr-2 text-emerald-600 focus:ring-emerald-500"
                    required
                  />
                  Lab • Male
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleInputChange}
                    className="mr-2 text-emerald-600 focus:ring-emerald-500"
                  />
                  Dhedig • Female
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <FaBook className="inline mr-2 text-green-600" />
                Qaraan (tiro) • Quran (number)
              </label>
              <input
                type="number"
                name="qaraan"
                value={formData.qaraan}
                onChange={handleInputChange}
                required
                min={0}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <FaGraduationCap className="inline mr-2 text-indigo-600" />
                Heerka Waxbarasho
              </label>
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              >
                <option value="">Dooro Heerka Waxbarasho</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                <FaCamera className="inline mr-2 text-teal-600" />
                Sawirka (JPEG/PNG, ikhtiyaari) • Photo (optional)
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <label className="inline-flex items-center justify-center px-4 py-3 border-2 border-dashed border-emerald-200 rounded-xl cursor-pointer hover:bg-emerald-50/50 transition-colors">
                  <span className="text-sm font-medium text-emerald-700">Dooro sawir • Choose file</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                {previewUrl && (
                  <div className="relative h-24 w-24 rounded-xl overflow-hidden border-2 border-emerald-100 shadow-md animate-scale-in">
                    <img src={previewUrl} alt="" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl enabled:hover:-translate-y-0.5 font-semibold text-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Waa la dirayaa…</span>
                </>
              ) : (
                <span>Dhammaystir Diiwaangelinta • Complete Registration</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
