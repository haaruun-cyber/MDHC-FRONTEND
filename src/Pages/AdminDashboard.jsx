import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSignOutAlt,
  FaUsers,
  FaSearch,
  FaChartBar,
  FaUserCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { api, imageUrl } from "../api";
import { StatCardSkeleton, TableRowSkeleton, Skeleton } from "../Components/Skeleton";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  bloodGroup: "",
  maritalStatus: "",
  gender: "",
  qaraan: "",
  educationLevel: "",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/costomer/");
      if (data.status === false) {
        toast.error(data.message || "Helitaanka liiska wuu fashilmay.");
        if (
          data.message?.toLowerCase?.().includes("token") ||
          data.message?.toLowerCase?.().includes("access")
        ) {
          localStorage.removeItem("token");
          navigate("/admin");
        }
        setRegistrations([]);
        return;
      }
      setRegistrations(Array.isArray(data.data) ? data.data : []);
    } catch (e) {
      console.error(e);
      toast.error("Server la xiriiri kari waayay. Hubi API-ga.");
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchRegistrations();
  }, [navigate, fetchRegistrations]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Ma hubtaa inaad tirtirto • Confirm delete?")) return;
    try {
      const { data } = await api.delete(`/api/costomer/${id}`);
      if (data.status === false) {
        toast.error(data.message || "Tirtiridda way fashilantay.");
        return;
      }
      toast.success(data.message || "Waa la tirtiray.");
      setRegistrations((prev) => prev.filter((r) => r._id !== id));
    } catch (e) {
      console.error(e);
      toast.error("Tirtiridda way fashilantay.");
    }
  };

  const handleEdit = (registration) => {
    setEditingId(registration._id);
    setFormData({
      fullName: registration.fullName || "",
      email: registration.email || "",
      phone: registration.phone || "",
      bloodGroup: registration.bloodGroup || "",
      maritalStatus: registration.maritalStatus || "",
      gender: registration.gender || "",
      qaraan: registration.qaraan ?? "",
      educationLevel: registration.educationLevel || "",
    });
    setShowAddModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingId) {
        const payload = {
          ...formData,
          qaraan: Number(formData.qaraan),
        };
        const { data } = await api.put(`/api/costomer/${editingId}`, payload);
        if (data.status === false) {
          toast.error(data.message || "Kaydinta way fashilantay.");
          return;
        }
        toast.success(data.message || "Waa la cusboonaysiiyay.");
        setRegistrations((prev) =>
          prev.map((r) => (r._id === editingId ? data.data : r))
        );
      } else {
        const payload = {
          ...formData,
          qaraan: Number(formData.qaraan),
        };
        const { data } = await api.post("/api/costomer/", payload);
        if (data.status === false) {
          toast.error(data.message || "Kudarista way fashilantay.");
          return;
        }
        toast.success(data.message || "Waa la kudaray.");
        if (data.data) {
          setRegistrations((prev) => [...prev, data.data]);
        } else {
          fetchRegistrations();
        }
      }
      setShowAddModal(false);
      setEditingId(null);
      setFormData(emptyForm);
    } catch (e) {
      console.error(e);
      toast.error("Wax qalad ah ayaa dhacay.");
    } finally {
      setSaving(false);
    }
  };

  const filteredRegistrations = registrations.filter(
    (reg) =>
      (reg.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reg.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const maleCount = registrations.filter((r) => r.gender === "male").length;
  const femaleCount = registrations.filter((r) => r.gender === "female").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 animate-fade-in">
      <div className="bg-white shadow-md border-b-4 border-emerald-500 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Dashboard Maamulka
                <span className="block text-sm font-normal text-gray-500 mt-1">
                  Admin Dashboard
                </span>
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center space-x-2 shadow-md"
            >
              <FaSignOutAlt />
              <span>Ka Bax • Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transition hover:shadow-lg animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Wadarta Diiwaangelinta</p>
                    <p className="text-3xl font-bold text-gray-800">{registrations.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FaUsers className="text-emerald-600 text-xl" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transition hover:shadow-lg animate-fade-in-up animation-delay-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Lab • Male</p>
                    <p className="text-3xl font-bold text-gray-800">{maleCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaUsers className="text-blue-600 text-xl" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-500 transition hover:shadow-lg animate-fade-in-up animation-delay-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Dhedig • Female</p>
                    <p className="text-3xl font-bold text-gray-800">{femaleCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <FaChartBar className="text-pink-600 text-xl" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-fade-in-up animation-delay-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md w-full">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Raadi magac ama email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            <button
              onClick={() => {
                setEditingId(null);
                setFormData(emptyForm);
                setShowAddModal(true);
              }}
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg hover:from-emerald-700 hover:to-blue-700 transition flex items-center space-x-2 shadow-md disabled:opacity-50"
            >
              <FaPlus />
              <span>Kudar Cusub • Add New</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in-up animation-delay-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b-2 border-emerald-200">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Sawir
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Magac
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Telefoon
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Dhiig
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Waxbarasho
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Falcelin
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading &&
                  Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} cols={7} />)}
                {!loading &&
                  filteredRegistrations.map((reg, idx) => (
                    <tr
                      key={reg._id}
                      className="hover:bg-gray-50 transition animate-fade-in-up"
                      style={{ animationDelay: `${Math.min(idx * 40, 400)}ms` }}
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <RowAvatar src={reg.personImage ? imageUrl(reg.personImage) : ""} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                        {reg.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{reg.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{reg.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                          {reg.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {reg.educationLevel}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(reg)}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(reg._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {!loading && filteredRegistrations.length === 0 && (
            <div className="p-12 text-center text-gray-500 animate-fade-in">
              <p className="text-lg">Ma jiro diiwaan • No records found.</p>
              <p className="text-sm mt-2">Isku day raadinta ama kudar cusub.</p>
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-cyan-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white">
                {editingId ? "Tafatir Diiwaangelinta • Edit" : "Kudar Diiwaan Cusub • Add New"}
              </h3>
            </div>

            <div className="p-6 relative">
              {saving && (
                <div
                  className="absolute inset-0 z-10 bg-white/70 backdrop-blur-[1px] flex flex-col items-center justify-center gap-3 rounded-b-xl"
                  aria-busy="true"
                >
                  <Skeleton className="h-10 w-40 rounded-lg" />
                  <Skeleton className="h-4 w-56" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Magaca Buuxa</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefoon</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nooca Dhiiga</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Dooro</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Xaaladda Guur</label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Dooro</option>
                    <option value="single">Keli ah</option>
                    <option value="married">Guursan</option>
                    <option value="divorced">Fure</option>
                    <option value="widowed">Laga Tegay</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jinsi</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Dooro</option>
                    <option value="male">Lab</option>
                    <option value="female">Dhedig</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qaraan (tiro)</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.qaraan}
                    onChange={(e) => setFormData({ ...formData, qaraan: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Waxbarasho</label>
                  <select
                    value={formData.educationLevel}
                    onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Dooro</option>
                    {["Dugsiga Sare", "Bachelor's", "Master's", "PhD", "Diploma", "Kale"].map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingId(null);
                    setFormData(emptyForm);
                  }}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Ka Noqo • Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg hover:from-emerald-700 hover:to-blue-700 transition disabled:opacity-50"
                >
                  {editingId ? "Cusboonaysii" : "Kudar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function RowAvatar({ src }) {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);

  if (!src || err) {
    return (
      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
        <FaUserCircle className="text-2xl" />
      </div>
    );
  }

  return (
    <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
      {!loaded && (
        <div className="absolute inset-0">
          <Skeleton className="h-full w-full rounded-full" />
        </div>
      )}
      <img
        src={src}
        alt=""
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setErr(true)}
      />
    </div>
  );
}

export default AdminDashboard;
